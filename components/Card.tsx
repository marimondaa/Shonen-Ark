import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
}

export function Card({ children, className = '', hover = false }: CardProps) {
    return (
        <div
            className={`ark-content-card ${hover ? 'ink-card-hover' : ''
                } ${className}`}
        >
            {children}
        </div>
    );
}

interface CardHeaderProps {
    children: React.ReactNode;
    className?: string;
}

export function CardHeader({ children, className = '' }: CardHeaderProps) {
    return <div className={`mb-4 pb-4 border-b border-dark-border ${className}`}>{children}</div>;
}

export function CardContent({ children, className = '' }: CardHeaderProps) {
    return <div className={className}>{children}</div>;
}

export function CardFooter({ children, className = '' }: CardHeaderProps) {
    return <div className={`mt-4 pt-4 border-t border-dark-border flex gap-2 ${className}`}>{children}</div>;
}
