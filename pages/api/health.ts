import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../src/lib/supabase';
import { env, validateEnv } from '../../src/lib/env';
import { allowMethods, sendSuccess, sendError, Logger } from '../../src/lib/api-helpers';

async function handler(req: NextApiRequest, res: NextApiResponse, context: { logger: Logger; cid: string }) {
  try {
    const envStatus = validateEnv();
    const healthData: any = {
      app: "ok",
      status: "unknown",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      node_env: process.env.NODE_ENV,
      services: {
        supabase: 'unknown',
        n8n: 'unknown',
        stripe: envStatus.isStripeConfigured ? 'configured' : 'missing'
      },
      features: envStatus
    };

    // 1. Check Supabase Connectivity
    try {
      const { error } = await supabase.from('users').select('id').limit(1);
      healthData.services.supabase = error ? 'error' : 'ok';
    } catch (err) {
      context.logger.error('Supabase health check failed', err);
      healthData.services.supabase = 'unreachable';
    }

    // 2. Check n8n Connectivity
    if (envStatus.isN8NConfigured && env.n8n.url) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);

        const response = await fetch(`${env.n8n.url}/healthz`, {
          signal: controller.signal
        });

        clearTimeout(timeoutId);
        healthData.services.n8n = response.ok ? 'reachable' : 'unhealthy';
      } catch (err) {
        healthData.services.n8n = 'unreachable';
      }
    } else {
      healthData.services.n8n = envStatus.isN8NConfigured ? 'unreachable' : 'missing_config';
    }

    // Overall Status
    const criticalServices = ['supabase'];
    const isHealthy = criticalServices.every(s => healthData.services[s] === 'ok');

    healthData.status = isHealthy ? 'healthy' : 'degraded';

    context.logger.info(`Health check performed: ${healthData.status}`, { services: healthData.services });

    return sendSuccess(res, healthData, isHealthy ? 200 : 503, context.cid);
  } catch (error) {
    return sendError(res, error, context.cid);
  }
}

export default allowMethods(['GET'], handler);
