const auth = require('basic-auth');
import { NextApiRequest, NextApiResponse } from 'next';

export interface AuthenticatedRequest extends NextApiRequest {
  user?: {
    name: string;
    pass: string;
  };
}

export function withBasicAuth(
  handler: (req: AuthenticatedRequest, res: NextApiResponse) => Promise<void>,
  options: {
    realm?: string;
    users?: { [username: string]: string };
  } = {}
) {
  return async (req: AuthenticatedRequest, res: NextApiResponse) => {
    const { realm = 'Shonen Ark Admin', users = {} } = options;
    
    // Default admin user from environment
    const defaultUsers = {
      [process.env.BASIC_AUTH_USER || 'admin']: process.env.BASIC_AUTH_PASSWORD || 'admin'
    };
    
    const validUsers = { ...defaultUsers, ...users };
    
    const credentials = auth(req);
    
    if (!credentials || !validUsers[credentials.name] || validUsers[credentials.name] !== credentials.pass) {
      res.statusCode = 401;
      res.setHeader('WWW-Authenticate', `Basic realm="${realm}"`);
      res.end('Access denied');
      return;
    }
    
    req.user = {
      name: credentials.name,
      pass: credentials.pass
    };
    
    return handler(req, res);
  };
}

export function requireBasicAuth(realm = 'Shonen Ark') {
  return (req: AuthenticatedRequest, res: NextApiResponse, next: () => void) => {
    const credentials = auth(req);
    
    if (!credentials || 
        credentials.name !== process.env.BASIC_AUTH_USER || 
        credentials.pass !== process.env.BASIC_AUTH_PASSWORD) {
      res.statusCode = 401;
      res.setHeader('WWW-Authenticate', `Basic realm="${realm}"`);
      res.end('Access denied');
      return;
    }
    
    req.user = {
      name: credentials.name,
      pass: credentials.pass
    };
    
    next();
  };
}
