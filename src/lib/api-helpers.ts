import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

export function allowMethods(methods: string[], handler: NextApiHandler): NextApiHandler {
  return (req: NextApiRequest, res: NextApiResponse) => {
    const method = req.method || '';
    if (!methods.includes(method)) {
      res.setHeader('Allow', methods.join(', '));
      return res.status(405).json({ error: 'Method Not Allowed' });
    }
    return handler(req, res);
  };
}
