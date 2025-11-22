import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuth } from '../../src/lib/hooks/useAuth';
import Layout from '../../src/components/layout/Layout';

export default function AdminDashboard() {
    const router = useRouter();
    const { user, isAuthenticated, isLoading } = useAuth();
    const [activeTab, setActiveTab] = useState('overview');
    const [stats, setStats] = useState({
        totalUsers: 0,
        activeTheories: 0,
        pendingReview: 0,
    });

    useEffect(() => {
        if (!isLoading) {
            if (!isAuthenticated()) {
                router.push('/login');
            } else if (user?.role !== 'admin') {
                router.push('/');
            }
        }
    }, [isLoading, isAuthenticated, user, router]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch('/api/admin/stats');
                const data = await response.json();
                setStats(data);
            } catch (error) {
                console.error('Failed to fetch stats:', error);
            }
        };

        if (user?.role === 'admin') {
            fetchStats();
        }
    }, [user]);

    if (isLoading || !user || user.role !== 'admin') {
        return (
            <div className="min-h-screen bg-void-black flex items-center justify-center">
                <div className="text-electric-purple animate-pulse">Verifying Clearance...</div>
            </div>
        );
    }

    return (
        <Layout>
            <Head>
                <title>Admin Command Center - Shonen Ark</title>
            </Head>

            <div className="min-h-screen bg-void-black text-ash-white p-6">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <h1 className="text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-electric-purple to-neon-violet">
                            COMMAND CENTER
                        </h1>
                        <p className="text-steel-gray mt-2">Welcome back, Administrator {user.username}</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {/* Sidebar */}
                        <div className="bg-shadow-dark border border-white/5 rounded-xl p-4 h-fit">
                            <nav className="space-y-2">
                                {[
                                    { id: 'overview', label: 'Overview', icon: '📊' },
                                    { id: 'theories', label: 'Theory Generator', icon: '⚡' },
                                    { id: 'users', label: 'User Management', icon: '👥' },
                                    { id: 'content', label: 'Content Moderation', icon: '🛡️' }
                                ].map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveTab(item.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === item.id
                                                ? 'bg-electric-purple text-white shadow-lg shadow-electric-purple/20'
                                                : 'text-steel-gray hover:bg-white/5 hover:text-white'
                                            }`}
                                    >
                                        <span>{item.icon}</span>
                                        <span className="font-bold">{item.label}</span>
                                    </button>
                                ))}
                            </nav>
                        </div>

                        {/* Main Content Area */}
                        <div className="md:col-span-3">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                                className="bg-shadow-dark border border-white/5 rounded-xl p-6 min-h-[600px]"
                            >
                                {activeTab === 'overview' && (
                                    <div className="space-y-6">
                                        <h2 className="text-2xl font-bold mb-6">System Status</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="bg-void-black p-4 rounded-lg border border-white/5">
                                                <div className="text-steel-gray text-sm mb-1">Total Users</div>
                                                <div className="text-3xl font-bold text-white">{stats.totalUsers}</div>
                                            </div>
                                            <div className="bg-void-black p-4 rounded-lg border border-white/5">
                                                <div className="text-steel-gray text-sm mb-1">Active Theories</div>
                                                <div className="text-3xl font-bold text-electric-purple">{stats.activeTheories}</div>
                                            </div>
                                            <div className="bg-void-black p-4 rounded-lg border border-white/5">
                                                <div className="text-steel-gray text-sm mb-1">Pending Review</div>
                                                <div className="text-3xl font-bold text-yellow-400">{stats.pendingReview}</div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'theories' && (
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-center">
                                            <h2 className="text-2xl font-bold">Theory Generator</h2>
                                            <button className="bg-electric-purple hover:bg-neon-violet text-white px-4 py-2 rounded-lg font-bold transition-colors">
                                                + New Generation Task
                                            </button>
                                        </div>

                                        <div className="bg-void-black/50 rounded-lg p-8 text-center border border-white/5 border-dashed">
                                            <div className="text-4xl mb-4">🤖</div>
                                            <h3 className="text-xl font-bold mb-2">AI Theory Generation</h3>
                                            <p className="text-steel-gray mb-6">
                                                Connect n8n workflow to start generating theories automatically.
                                            </p>
                                            <div className="flex justify-center gap-4">
                                                <button className="px-6 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                                                    Configure Webhook
                                                </button>
                                                <button className="px-6 py-2 bg-electric-purple/20 text-electric-purple hover:bg-electric-purple/30 rounded-lg transition-colors">
                                                    Run Manual Scrape
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'users' && (
                                    <div className="text-center py-20 text-steel-gray">
                                        User management module coming soon.
                                    </div>
                                )}

                                {activeTab === 'content' && (
                                    <div className="text-center py-20 text-steel-gray">
                                        Content moderation module coming soon.
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
