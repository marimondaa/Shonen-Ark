import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { allowMethods, sendError, Logger } from './api-helpers';

export type UserRole = 'fan' | 'creator' | 'admin';

export interface AuthenticatedContext {
    logger: Logger;
    cid: string;
    user: {
        id: string;
        email: string;
        role: UserRole;
    };
}

/**
 * Higher-order function to enforce authentication and RBAC.
 * Combines withCid logic as well.
 */
export function withAuth(
    allowedRoles: UserRole[],
    handler: (req: NextApiRequest, res: NextApiResponse, context: AuthenticatedContext) => Promise<void> | void
) {
    return allowMethods(['GET', 'POST', 'PUT', 'DELETE'], async (req, res, context) => {
        try {
            const session = await getSession({ req });

            if (!session || !session.user) {
                context.logger.warn('Unauthorized access attempt');
                return sendError(res, new Error('Unauthorized'), context.cid);
            }

            // Check role
            const userRole = (session.user as any).role as UserRole || 'fan';
            if (!allowedRoles.includes(userRole)) {
                context.logger.warn(`Forbidden: User ${session.user.email} with role ${userRole} attempted to access restricted resource`, {
                    requiredRoles: allowedRoles
                });
                return res.status(403).json({
                    success: false,
                    error: {
                        code: 'FORBIDDEN',
                        message: 'You do not have permission to perform this action'
                    },
                    cid: context.cid
                });
            }

            // Enrich context with user info
            const authContext: AuthenticatedContext = {
                ...context,
                user: {
                    id: (session.user as any).id || '',
                    email: session.user.email || '',
                    role: userRole,
                }
            };

            return handler(req, res, authContext);
        } catch (error) {
            context.logger.error('Auth guard internal error', error);
            return sendError(res, error, context.cid);
        }
    });
}

/**
 * Specialized guards for common roles
 */
export const withAdmin = (handler: any) => withAuth(['admin'], handler);
export const withCreator = (handler: any) => withAuth(['admin', 'creator'], handler);
export const withUser = (handler: any) => withAuth(['admin', 'creator', 'fan'], handler);
