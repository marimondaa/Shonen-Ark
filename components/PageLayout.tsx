import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

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
        <div className="min-h-screen bg-dark-bg text-text-primary flex flex-col">
            {/* Navbar */}
            <Navbar
                isAuthenticated={isAuthenticated}
                username={username}
                onLogout={onLogout}
            />

            {/* Main Content */}
            <main className="flex-1 mt-16 mb-16">
                <div className="container-safe py-8">
                    {children}
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}
