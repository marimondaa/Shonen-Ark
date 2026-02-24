type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogEntry {
    level: LogLevel;
    message: string;
    timestamp: string;
    correlationId?: string;
    metadata?: Record<string, any>;
    error?: any;
}

/**
 * Structured Logger for Shonen Ark
 * Provides consistent formatting for production logs and local development.
 */
class Logger {
    private isDev = process.env.NODE_ENV === 'development';
    private baseMetadata: Record<string, any> = {};

    constructor(metadata: Record<string, any> = {}) {
        this.baseMetadata = metadata;
    }

    /**
     * Creates a child logger with additional metadata (e.g., correlationId)
     */
    child(metadata: Record<string, any>) {
        return new Logger({ ...this.baseMetadata, ...metadata });
    }

    private format(level: LogLevel, message: string, metadata?: Record<string, any>, error?: Error | unknown): LogEntry {
        const combinedMetadata = { ...this.baseMetadata, ...metadata };
        const correlationId = combinedMetadata.correlationId;

        // Remove correlationId from metadata to avoid duplication in JSON
        if (correlationId) {
            delete combinedMetadata.correlationId;
        }

        return {
            level,
            message,
            timestamp: new Date().toISOString(),
            correlationId,
            metadata: Object.keys(combinedMetadata).length > 0 ? combinedMetadata : undefined,
            error: error instanceof Error ? {
                name: error.name,
                message: error.message,
                stack: this.isDev ? error.stack : undefined,
                ...(error as any).details
            } : error
        };
    }

    private print(entry: LogEntry) {
        if (this.isDev) {
            const { level, message, timestamp, correlationId, metadata, error } = entry;
            const cidPrefix = correlationId ? `[CID:${correlationId.substring(0, 8)}] ` : '';
            const prefix = `[${timestamp}] ${level.toUpperCase().padEnd(5)} ${cidPrefix}`;

            const parts = [message];
            if (metadata) parts.push(`\nMetadata: ${JSON.stringify(metadata, null, 2)}`);
            if (error) parts.push(`\nError: ${JSON.stringify(error, null, 2)}`);

            const logMsg = parts.join(' ');

            switch (level) {
                case 'error': console.error(prefix, logMsg); break;
                case 'warn': console.warn(prefix, logMsg); break;
                case 'debug': console.debug(prefix, logMsg); break;
                default: console.log(prefix, logMsg); break;
            }
        } else {
            console.log(JSON.stringify(entry));
        }
    }

    info(message: string, metadata?: Record<string, any>) {
        this.print(this.format('info', message, metadata));
    }

    warn(message: string, metadata?: Record<string, any>) {
        this.print(this.format('warn', message, metadata));
    }

    error(message: string, error?: Error | unknown, metadata?: Record<string, any>) {
        this.print(this.format('error', message, metadata, error));
    }

    debug(message: string, metadata?: Record<string, any>) {
        if (this.isDev || process.env.DEBUG === 'true') {
            this.print(this.format('debug', message, metadata));
        }
    }
}

export const logger = new Logger();
export { Logger };
