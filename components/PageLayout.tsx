import React from 'react';

interface PageLayoutProps {
    children: React.ReactNode;
    isAuthenticated?: boolean;
    username?: string;
    onLogout?: () => void;
}

export function PageLayout({
    children,
    isAuthenticated,
    username,
    onLogout,
}: PageLayoutProps) {
    return (
        <div className="container-safe py-8 md:py-12">{children}</div>
    );
}
