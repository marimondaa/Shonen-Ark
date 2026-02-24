export type ErrorCode =
    | 'BAD_REQUEST'
    | 'UNAUTHORIZED'
    | 'FORBIDDEN'
    | 'NOT_FOUND'
    | 'METHOD_NOT_ALLOWED'
    | 'INTERNAL_ERROR'
    | 'WEBHOOK_VERIFICATION_FAILED'
    | 'DATABASE_ERROR'
    | 'VALIDATION_ERROR';

/**
 * Base Application Error
 */
export class AppError extends Error {
    constructor(
        public message: string,
        public code: ErrorCode = 'INTERNAL_ERROR',
        public statusCode: number = 500,
        public details?: any
    ) {
        super(message);
        this.name = 'AppError';
        Object.setPrototypeOf(this, AppError.prototype);
    }
}

export class BadRequestError extends AppError {
    constructor(message: string = 'Bad Request', details?: any) {
        super(message, 'BAD_REQUEST', 400, details);
    }
}

export class UnauthorizedError extends AppError {
    constructor(message: string = 'Unauthorized') {
        super(message, 'UNAUTHORIZED', 401);
    }
}

export class ForbiddenError extends AppError {
    constructor(message: string = 'Forbidden') {
        super(message, 'FORBIDDEN', 403);
    }
}

export class NotFoundError extends AppError {
    constructor(message: string = 'Not Found') {
        super(message, 'NOT_FOUND', 404);
    }
}

export class ValidationError extends AppError {
    constructor(message: string = 'Validation Failed', details?: any) {
        super(message, 'VALIDATION_ERROR', 422, details);
    }
}

export class WebhookError extends AppError {
    constructor(message: string = 'Webhook verification failed', details?: any) {
        super(message, 'WEBHOOK_VERIFICATION_FAILED', 401, details);
    }
}

/**
 * Utility to structure unexpected errors
 */
export function handleApiError(error: unknown) {
    if (error instanceof AppError) {
        return {
            success: false,
            error: {
                code: error.code,
                message: error.message,
                details: error.details,
            },
            statusCode: error.statusCode
        };
    }

    // Handle generic errors
    const message = error instanceof Error ? error.message : 'An unexpected error occurred';
    return {
        success: false,
        error: {
            code: 'INTERNAL_ERROR',
            message
        },
        statusCode: 500
    };
}
