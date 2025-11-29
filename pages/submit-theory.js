import { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useAuth } from '../src/lib/hooks/useAuth';

export default function SubmitTheory() {
    const { user } = useAuth();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        summary: '',
        content: '',
        source: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Here we would submit to the API
            // const res = await fetch('/api/theories', { ... });

            // Simulating API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            console.log('Theory submitted:', formData);
            router.push('/theories');
        } catch (error) {
            console.error('Error submitting theory:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Head>
                <title>Submit Theory - Shonen Ark</title>
            </Head>

            <div className="min-h-screen py-20 px-4 bg-void-black">
                <div className="max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 text-white">
                            CRAFT YOUR THEORY
                        </h1>
                        <p className="text-steel-gray text-lg">
                            Share your analysis with the community. Make it legendary.
                        </p>
                    </motion.div>

                    <motion.form
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        onSubmit={handleSubmit}
                        className="bg-shadow-dark border border-electric-purple/20 rounded-xl p-8 space-y-8 backdrop-blur-sm"
                    >
                        <div>
                            <label className="block text-electric-purple font-bold mb-2 uppercase tracking-wide text-sm">
                                Theory Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full bg-void-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-electric-purple focus:outline-none transition-colors placeholder-gray-600"
                                placeholder="e.g., The True Identity of Imu"
                                required
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-electric-purple font-bold mb-2 uppercase tracking-wide text-sm">
                                    Series / Category
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full bg-void-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-electric-purple focus:outline-none transition-colors"
                                    required
                                >
                                    <option value="">Select Series...</option>
                                    <option value="One Piece">One Piece</option>
                                    <option value="Jujutsu Kaisen">Jujutsu Kaisen</option>
                                    <option value="Attack on Titan">Attack on Titan</option>
                                    <option value="Demon Slayer">Demon Slayer</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-electric-purple font-bold mb-2 uppercase tracking-wide text-sm">
                                    Source / Chapter (Optional)
                                </label>
                                <input
                                    type="text"
                                    name="source"
                                    value={formData.source}
                                    onChange={handleChange}
                                    className="w-full bg-void-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-electric-purple focus:outline-none transition-colors placeholder-gray-600"
                                    placeholder="e.g., Chapter 1100"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-electric-purple font-bold mb-2 uppercase tracking-wide text-sm">
                                Executive Summary
                            </label>
                            <textarea
                                name="summary"
                                value={formData.summary}
                                onChange={handleChange}
                                rows={3}
                                className="w-full bg-void-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-electric-purple focus:outline-none transition-colors placeholder-gray-600"
                                placeholder="Briefly explain your theory in 2-3 sentences..."
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-electric-purple font-bold mb-2 uppercase tracking-wide text-sm">
                                Full Theory
                            </label>
                            <textarea
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                rows={12}
                                className="w-full bg-void-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-electric-purple focus:outline-none transition-colors placeholder-gray-600 font-mono text-sm"
                                placeholder="Write your detailed analysis here. Markdown supported."
                                required
                            />
                        </div>

                        <div className="pt-6 border-t border-white/10 flex justify-end">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="power-button px-10 py-4 text-lg font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'Submitting...' : 'PUBLISH THEORY'}
                            </button>
                        </div>
                    </motion.form>
                </div>
            </div>
        </>
    );
}
