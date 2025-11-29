import { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useAuth } from '../src/lib/hooks/useAuth';

export default function SubmitVideo() {
    const { user } = useAuth();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const [file, setFile] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'amv',
        tags: ''
    });

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return;

        setIsLoading(true);

        try {
            // Simulating upload
            await new Promise(resolve => setTimeout(resolve, 2000));
            console.log('Video submitted:', { ...formData, file });
            router.push('/discovery');
        } catch (error) {
            console.error('Error submitting video:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Head>
                <title>Submit Video - Shonen Ark</title>
            </Head>

            <div className="min-h-screen py-20 px-4 bg-void-black">
                <div className="max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 text-white">
                            UPLOAD VIDEO
                        </h1>
                        <p className="text-steel-gray text-lg">
                            Share your AMVs, edits, and animations with the world.
                        </p>
                    </motion.div>

                    <motion.form
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        onSubmit={handleSubmit}
                        className="bg-shadow-dark border border-white/10 rounded-xl p-8 space-y-8 backdrop-blur-sm"
                    >
                        {/* File Upload Area */}
                        <div
                            className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-colors ${dragActive
                                    ? 'border-electric-purple bg-electric-purple/10'
                                    : file
                                        ? 'border-green-500/50 bg-green-500/5'
                                        : 'border-white/10 hover:border-electric-purple/50 hover:bg-white/5'
                                }`}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                        >
                            <input
                                type="file"
                                accept="video/*"
                                onChange={handleFileChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />

                            {file ? (
                                <div>
                                    <div className="text-4xl mb-4">✅</div>
                                    <p className="text-white font-bold text-lg mb-2">{file.name}</p>
                                    <p className="text-steel-gray text-sm">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                                    <button
                                        type="button"
                                        onClick={(e) => { e.preventDefault(); setFile(null); }}
                                        className="mt-4 text-red-400 hover:text-red-300 text-sm font-bold z-10 relative"
                                    >
                                        Remove File
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <div className="text-5xl mb-4 opacity-50">☁️</div>
                                    <p className="text-white font-bold text-lg mb-2">Drag & Drop Video Here</p>
                                    <p className="text-steel-gray text-sm mb-4">or click to browse</p>
                                    <p className="text-xs text-steel-gray opacity-60">MP4, WEBM, MOV up to 500MB</p>
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-electric-purple font-bold mb-2 uppercase tracking-wide text-sm">
                                Video Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full bg-void-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-electric-purple focus:outline-none transition-colors placeholder-gray-600"
                                placeholder="e.g., Luffy vs Kaido - Epic Edit"
                                required
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-electric-purple font-bold mb-2 uppercase tracking-wide text-sm">
                                    Category
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full bg-void-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-electric-purple focus:outline-none transition-colors"
                                    required
                                >
                                    <option value="amv">AMV</option>
                                    <option value="edit">Edit</option>
                                    <option value="animation">Fan Animation</option>
                                    <option value="review">Review / Analysis</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-electric-purple font-bold mb-2 uppercase tracking-wide text-sm">
                                    Tags (comma separated)
                                </label>
                                <input
                                    type="text"
                                    name="tags"
                                    value={formData.tags}
                                    onChange={handleChange}
                                    className="w-full bg-void-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-electric-purple focus:outline-none transition-colors placeholder-gray-600"
                                    placeholder="e.g., one piece, action, 4k"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-electric-purple font-bold mb-2 uppercase tracking-wide text-sm">
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={4}
                                className="w-full bg-void-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-electric-purple focus:outline-none transition-colors placeholder-gray-600"
                                placeholder="Tell us about your video..."
                                required
                            />
                        </div>

                        <div className="pt-6 border-t border-white/10 flex justify-end">
                            <button
                                type="submit"
                                disabled={isLoading || !file}
                                className="power-button px-10 py-4 text-lg font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'Uploading...' : 'PUBLISH VIDEO'}
                            </button>
                        </div>
                    </motion.form>
                </div>
            </div>
        </>
    );
}
