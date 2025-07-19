import { NextApiRequest, NextApiResponse } from 'next';
import basicAuth from 'basic-auth';

/**
 * Basic Authentication Middleware for Staging Environment
 * Protects staging environment with username/password authentication
 */

export interface BasicAuthConfig {
  username: string;
  password: string;
  realm?: string;
  message?: string;
}

/**
 * Create basic auth middleware with configuration
 */
export function createBasicAuth(config: BasicAuthConfig) {
  return function basicAuthMiddleware(
    req: NextApiRequest,
    res: NextApiResponse,
    next: () => void
  ) {
    // Skip auth in development
    if (process.env.NODE_ENV === 'development') {
      return next();
    }

    // Skip auth in production (only apply to staging)
    if (process.env.NODE_ENV === 'production' && process.env.ENVIRONMENT !== 'staging') {
      return next();
    }

    const credentials = basicAuth(req);
    
    // Check if credentials are provided
    if (!credentials) {
      return sendAuthChallenge(res, config);
    }

    // Verify credentials
    if (credentials.name !== config.username || credentials.pass !== config.password) {
      return sendAuthChallenge(res, config);
    }

    // Authentication successful
    next();
  };
}

/**
 * Send authentication challenge response
 */
function sendAuthChallenge(res: NextApiResponse, config: BasicAuthConfig) {
  const realm = config.realm || 'Shonen Ark Staging';
  const message = config.message || 'Access to staging environment requires authentication';
  
  res.setHeader('WWW-Authenticate', `Basic realm="${realm}"`);
  res.status(401).json({
    error: 'Authentication required',
    message,
    hint: 'This is the staging environment and requires valid credentials'
  });
}

/**
 * Default staging authentication middleware
 * Uses environment variables for credentials
 */
export function stagingAuth(req: NextApiRequest, res: NextApiResponse, next: () => void) {
  const username = process.env.BASIC_AUTH_USER || process.env.N8N_BASIC_AUTH_USER;
  const password = process.env.BASIC_AUTH_PASSWORD || process.env.N8N_BASIC_AUTH_PASSWORD;
  
  if (!username || !password) {
    console.error('Basic auth credentials not configured');
    return res.status(500).json({
      error: 'Server configuration error',
      message: 'Authentication not properly configured'
    });
  }

  const basicAuthMiddleware = createBasicAuth({
    username,
    password,
    realm: 'Shonen Ark Staging',
    message: 'This staging environment requires authentication. Contact admin for access.'
  });

  return basicAuthMiddleware(req, res, next);
}

/**
 * Protect API route with basic auth
 * Usage: export default withBasicAuth(handler);
 */
export function withBasicAuth(handler: (req: NextApiRequest, res: NextApiResponse) => void) {
  return function protectedHandler(req: NextApiRequest, res: NextApiResponse) {
    stagingAuth(req, res, () => {
      handler(req, res);
    });
  };
}

/**
 * Admin-only authentication middleware
 * Higher security for admin endpoints
 */
export function adminAuth(req: NextApiRequest, res: NextApiResponse, next: () => void) {
  const adminUsername = process.env.ADMIN_AUTH_USER || 'admin';
  const adminPassword = process.env.ADMIN_AUTH_PASSWORD;
  
  if (!adminPassword) {
    return res.status(500).json({
      error: 'Admin authentication not configured'
    });
  }

  const basicAuthMiddleware = createBasicAuth({
    username: adminUsername,
    password: adminPassword,
    realm: 'Shonen Ark Admin',
    message: 'Admin access required. This area is restricted to administrators only.'
  });

  return basicAuthMiddleware(req, res, next);
}

/**
 * IP whitelist middleware (optional additional security)
 */
export function ipWhitelist(allowedIPs: string[]) {
  return function ipWhitelistMiddleware(
    req: NextApiRequest,
    res: NextApiResponse,
    next: () => void
  ) {
    const clientIP = getClientIP(req);
    
    if (!allowedIPs.includes(clientIP)) {
      return res.status(403).json({
        error: 'Access denied',
        message: `IP ${clientIP} is not whitelisted`,
        code: 'IP_NOT_ALLOWED'
      });
    }
    
    next();
  };
}

/**
 * Get client IP address from request
 */
function getClientIP(req: NextApiRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  const realIP = req.headers['x-real-ip'];
  const clientIP = req.connection?.remoteAddress;
  
  if (typeof forwarded === 'string') {
    return forwarded.split(',')[0].trim();
  }
  
  if (typeof realIP === 'string') {
    return realIP;
  }
  
  return clientIP || 'unknown';
}

/**
 * Environment-based security middleware
 * Different security levels for different environments
 */
export function environmentSecurity(req: NextApiRequest, res: NextApiResponse, next: () => void) {
  const environment = process.env.NODE_ENV as 'development' | 'production' | 'test' | 'staging' | undefined;
  const railwayEnv = process.env.RAILWAY_ENVIRONMENT;
  
  switch (environment) {
    case 'development':
      // No authentication in development
      return next();
      
    case 'staging':
    case 'test':
      // Basic auth for staging/test
      return stagingAuth(req, res, next);
      
    case 'production':
      if (railwayEnv === 'staging') {
        // Railway staging environment
        return stagingAuth(req, res, next);
      }
      // Production - no basic auth (use proper authentication)
      return next();
      
    default:
      return stagingAuth(req, res, next);
  }
}

/**
 * Security headers middleware
 * Add security headers to responses
 */
export function securityHeaders(req: NextApiRequest, res: NextApiResponse, next: () => void) {
  // Set security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // HSTS for HTTPS
  if (req.headers['x-forwarded-proto'] === 'https' || (req.connection as any)?.encrypted) {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }
  
  next();
}

/**
 * Combined middleware for comprehensive protection
 */
export function fullProtection(options: {
  basicAuth?: boolean;
  adminAuth?: boolean;
  ipWhitelist?: string[];
  securityHeaders?: boolean;
} = {}) {
  const middlewares: Array<(req: NextApiRequest, res: NextApiResponse, next: () => void) => void> = [];
  
  if (options.securityHeaders !== false) {
    middlewares.push(securityHeaders);
  }
  
  if (options.ipWhitelist) {
    middlewares.push(ipWhitelist(options.ipWhitelist));
  }
  
  if (options.adminAuth) {
    middlewares.push(adminAuth);
  } else if (options.basicAuth !== false) {
    middlewares.push(environmentSecurity);
  }
  
  return function combinedMiddleware(req: NextApiRequest, res: NextApiResponse, next: () => void) {
    let index = 0;
    
    function runNext() {
      if (index >= middlewares.length) {
        return next();
      }
      
      const middleware = middlewares[index++];
      middleware(req, res, runNext);
    }
    
    runNext();
  };
}
