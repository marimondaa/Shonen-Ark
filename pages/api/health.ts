import { NextApiRequest, NextApiResponse } from 'next';
import { allowMethods } from '../../src/lib/api-helpers';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV,
      version: process.env.npm_package_version || '1.0.0',
      services: {
        database: 'unknown', // Will be updated when DB connection is implemented
        n8n: 'unknown'
      }
    };

    // Check n8n connectivity
    if (process.env.N8N_URL) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        const response = await fetch(`${process.env.N8N_URL}/healthz`, { 
          signal: controller.signal 
        });
        
        clearTimeout(timeoutId);
        health.services.n8n = response.ok ? 'healthy' : 'unhealthy';
      } catch {
        health.services.n8n = 'unreachable';
      }
    }

    // Overall health status
    const allServicesHealthy = Object.values(health.services).every(
      status => status === 'healthy' || status === 'unknown'
    );

    if (!allServicesHealthy) {
      health.status = 'degraded';
      return res.status(503).json(health);
    }

    res.status(200).json(health);
  } catch (error) {
    console.error('Health check error:', error);
    res.status(500).json({
      status: 'error',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

export default allowMethods(['GET'], handler);
