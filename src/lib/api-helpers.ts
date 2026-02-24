import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { logger, Logger } from './logger';
export { Logger };
import { handleApiError, AppError } from './errors';
import { randomUUID } from 'crypto';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  timestamp: string;
  cid: string;
}

/**
 * Higher-order function to inject a Correlation ID and a contextual logger.
 */
export function withCid(handler: (req: NextApiRequest, res: NextApiResponse, context: { logger: Logger; cid: string }) => Promise<void> | void): NextApiHandler {
  return async (req, res) => {
    const cid = (req.headers['x-correlation-id'] as string) || randomUUID();
    const contextualLogger = logger.child({ correlationId: cid });

    // Attach cid to response for client tracking
    res.setHeader('X-Correlation-ID', cid);

    try {
      await handler(req, res, { logger: contextualLogger, cid });
    } catch (error) {
      sendError(res, error, cid);
    }
  };
}

export function allowMethods(methods: string[], handler: (req: NextApiRequest, res: NextApiResponse, context: { logger: Logger; cid: string }) => Promise<void> | void): NextApiHandler {
  return withCid(async (req, res, context) => {
    const method = req.method || '';
    if (!methods.includes(method)) {
      res.setHeader('Allow', methods.join(', '));
      context.logger.warn(`Method ${method} not allowed on ${req.url}`);
      return res.status(405).json({
        success: false,
        error: {
          code: 'METHOD_NOT_ALLOWED',
          message: `Method ${method} not allowed. Please use: ${methods.join(', ')}`
        },
        timestamp: new Date().toISOString(),
        cid: context.cid
      });
    }
    return handler(req, res, context);
  });
}

/**
 * Standardized error handler for API routes
 */
export function sendError(res: NextApiResponse, error: unknown, cid?: string) {
  const correlationId = cid || (res.getHeader('X-Correlation-ID') as string) || 'unknown';
  const { success, error: errorBody, statusCode } = handleApiError(error);
  const contextualLogger = logger.child({ correlationId });

  if (statusCode >= 500) {
    contextualLogger.error('API Internal Error:', error);
  } else {
    contextualLogger.warn(`API Client Error (${statusCode}): ${errorBody.message}`, errorBody.details);
  }

  return res.status(statusCode).json({
    success,
    error: errorBody,
    timestamp: new Date().toISOString(),
    cid: correlationId
  });
}

/**
 * Standardized success response for API routes
 */
export function sendSuccess<T>(res: NextApiResponse, data: T, statusCode: number = 200, cid?: string) {
  const correlationId = cid || (res.getHeader('X-Correlation-ID') as string) || 'unknown';
  return res.status(statusCode).json({
    success: true,
    data,
    timestamp: new Date().toISOString(),
    cid: correlationId
  });
}

/**
 * Reads the raw body from the request stream.
 * Useful for signature verification.
 */
export async function getRawBody(req: NextApiRequest): Promise<Buffer> {
  try {
    const chunks = [];
    for await (const chunk of req) {
      chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
    }
    return Buffer.concat(chunks);
  } catch (error) {
    logger.error('Failed to read raw body', error);
    throw new AppError('Failed to read request body', 'INTERNAL_ERROR', 500);
  }
}
