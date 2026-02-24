import Link from 'next/link';
import { Mail, Github, Twitter } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-dark-surface border-t border-dark-border mt-16">
            <div className="container-safe py-12">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    {/* Brand */}
                    <div>
                        <h3 className="font-display font-bold text-lg mb-4">Shonen Ark</h3>
                        <p className="text-text-secondary text-sm">
                            A fan theory and media hub for anime enthusiasts.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-semibold text-sm mb-4">Platform</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/theories" className="text-text-secondary hover:text-brand-primary transition-colors">Theories</Link></li>
                            <li><Link href="/calendar" className="text-text-secondary hover:text-brand-primary transition-colors">Calendar</Link></li>
                            <li><Link href="/discovery" className="text-text-secondary hover:text-brand-primary transition-colors">Discovery</Link></li>
                            <li><Link href="/gigs" className="text-text-secondary hover:text-brand-primary transition-colors">Gigs</Link></li>
                        </ul>
                    </div>

                    {/* Creators */}
                    <div>
                        <h4 className="font-semibold text-sm mb-4">For Creators</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/register" className="text-text-secondary hover:text-brand-primary transition-colors">Sign Up</Link></li>
                            <li><Link href="/about" className="text-text-secondary hover:text-brand-primary transition-colors">How it Works</Link></li>
                            <li><Link href="/terms" className="text-text-secondary hover:text-brand-primary transition-colors">Terms</Link></li>
                        </ul>
                    </div>

                    {/* Socials */}
                    <div>
                        <h4 className="font-semibold text-sm mb-4">Connect</h4>
                        <div className="flex gap-3">
                            <a href="mailto:hello@shonenark.com" className="p-2 bg-dark-bg hover:bg-brand-primary/20 rounded-lg transition-colors duration-200">
                                <Mail size={18} />
                            </a>
                            <a href="https://github.com" className="p-2 bg-dark-bg hover:bg-brand-primary/20 rounded-lg transition-colors duration-200">
                                <Github size={18} />
                            </a>
                            <a href="https://twitter.com" className="p-2 bg-dark-bg hover:bg-brand-primary/20 rounded-lg transition-colors duration-200">
                                <Twitter size={18} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-dark-border to-transparent my-8" />

                {/* Copyright */}
                <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-text-muted">
                    <p>&copy; 2026 Shonen Ark. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 sm:mt-0">
                        <Link href="/privacy" className="hover:text-brand-primary transition-colors">Privacy</Link>
                        <Link href="/terms" className="hover:text-brand-primary transition-colors">Terms</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
