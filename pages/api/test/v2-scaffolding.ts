import { withAdmin, AuthenticatedContext } from '../../../src/lib/auth-guards';
import { sendSuccess } from '../../../src/lib/api-helpers';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * Test API route to verify Backend v2 Scaffolding.
 * Requires 'admin' role.
 */
async function handler(req: NextApiRequest, res: NextApiResponse, context: AuthenticatedContext) {
    context.logger.info('Test handler executed', {
        userId: context.user.id,
        userRole: context.user.role
    });

    return sendSuccess(res, {
        message: 'Backend v2 Scaffolding is working!',
        auth: context.user,
        cid: context.cid
    }, 200, context.cid);
}

export default withAdmin(handler);
