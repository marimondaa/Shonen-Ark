'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu, X, LogOut, User, Settings } from 'lucide-react';

interface NavbarProps {
    isAuthenticated?: boolean;
    username?: string;
    onLogout?: () => void;
}

export function Navbar({ isAuthenticated, username, onLogout }: NavbarProps) {
    const router = useRouter();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const navItems = [
        { label: 'Home', href: '/' },
        { label: 'Theories', href: '/theories' },
        { label: 'Calendar', href: '/calendar' },
        { label: 'Discovery', href: '/discovery' },
        { label: 'Gigs', href: '/gigs' },
        { label: 'Characters', href: '/characters' },
    ];

    const isActive = (href: string) => router.pathname === href;

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-bg border-b border-dark-border">
            <div className="container-safe h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 flex-shrink-0">
                    <div className="w-8 h-8 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">SA</span>
                    </div>
                    <span className="font-display font-bold text-xl hidden sm:inline">Shonen Ark</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-1">
                    {navItems.map(item => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`px-4 py-2 rounded-lg transition-all duration-200 font-medium text-sm ${isActive(item.href)
                                    ? 'bg-brand-primary text-white shadow-md'
                                    : 'text-text-secondary hover:text-text-primary hover:bg-dark-surface'
                                }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>

                {/* Right Section: Auth */}
                <div className="flex items-center gap-3">
                    {isAuthenticated ? (
                        <div className="relative">
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-dark-surface border border-dark-border hover:bg-dark-border transition-colors duration-200"
                            >
                                <User size={18} className="text-brand-primary" />
                                <span className="text-sm font-medium text-text-primary hidden sm:inline">
                                    {username || 'User'}
                                </span>
                            </button>

                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-dark-surface border border-dark-border rounded-lg shadow-lg">
                                    <Link
                                        href="/account"
                                        className="block px-4 py-2 text-text-primary hover:bg-dark-border transition-colors duration-200 flex items-center gap-2"
                                    >
                                        <User size={16} /> Profile
                                    </Link>
                                    <Link
                                        href="/settings"
                                        className="block px-4 py-2 text-text-primary hover:bg-dark-border transition-colors duration-200 flex items-center gap-2"
                                    >
                                        <Settings size={16} /> Settings
                                    </Link>
                                    <button
                                        onClick={() => {
                                            onLogout?.();
                                            setDropdownOpen(false);
                                        }}
                                        className="w-full text-left px-4 py-2 text-error hover:bg-dark-border transition-colors duration-200 flex items-center gap-2 border-t border-dark-border"
                                    >
                                        <LogOut size={16} /> Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link
                                href="/login"
                                className="px-4 py-2 text-sm font-medium text-text-primary hover:text-brand-primary transition-colors duration-200"
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="px-4 py-2 text-sm font-medium bg-brand-primary text-white rounded-lg hover:bg-indigo-600 transition-all duration-200 shadow-md hover:shadow-lg"
                            >
                                Sign Up
                            </Link>
                        </div>
                    )}

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 hover:bg-dark-surface rounded-lg transition-colors duration-200"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t border-dark-border bg-dark-bg">
                    <div className="container-safe py-4 flex flex-col gap-2">
                        {navItems.map(item => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`px-4 py-2 rounded-lg transition-all duration-200 font-medium ${isActive(item.href)
                                        ? 'bg-brand-primary text-white'
                                        : 'text-text-secondary hover:text-text-primary hover:bg-dark-surface'
                                    }`}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}
