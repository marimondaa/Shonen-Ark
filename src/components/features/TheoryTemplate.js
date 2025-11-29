import { motion } from 'framer-motion';
import Image from 'next/image';

const TheoryTemplate = ({ theory }) => {
    const {
        title,
        category,
        summary,
        content,
        author,
        date,
        source,
        thumbnail,
        votes
    } = theory;

    return (
        <article className="max-w-4xl mx-auto bg-shadow-dark border border-electric-purple/20 rounded-xl overflow-hidden shadow-lg shadow-electric-purple/5">
            {/* Header Image */}
            {thumbnail && (
                <div className="relative h-64 md:h-96 w-full">
                    <Image
                        src={thumbnail}
                        alt={title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-shadow-dark via-transparent to-transparent" />
                </div>
            )}

            <div className="p-8 md:p-12 relative">
                {/* Meta Header */}
                <div className="flex flex-wrap gap-4 items-center mb-6">
                    <span className="px-4 py-1 bg-electric-purple/20 text-electric-purple border border-electric-purple/30 rounded-full text-sm font-bold uppercase tracking-wider">
                        {category}
                    </span>
                    {source && (
                        <span className="px-4 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                            <span>Source:</span> {source}
                        </span>
                    )}
                    <span className="text-steel-gray text-sm ml-auto">
                        {new Date(date).toLocaleDateString()}
                    </span>
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-display font-bold mb-8 text-white leading-tight">
                    {title}
                </h1>

                {/* Author Info */}
                <div className="flex items-center gap-4 mb-10 pb-10 border-b border-white/10">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-electric-purple to-neon-violet flex items-center justify-center text-white font-bold text-xl">
                        {author?.charAt(0) || '?'}
                    </div>
                    <div>
                        <div className="text-white font-bold">{author || 'Anonymous'}</div>
                        <div className="text-steel-gray text-sm">Theory Crafter</div>
                    </div>
                </div>

                {/* Summary Box */}
                <div className="bg-void-black/50 border-l-4 border-electric-purple p-6 mb-10 rounded-r-lg">
                    <h3 className="text-electric-purple font-bold mb-2 uppercase tracking-wide text-sm">Summary</h3>
                    <p className="text-lg text-ash-white italic leading-relaxed">
                        {summary}
                    </p>
                </div>

                {/* Main Content */}
                <div className="prose prose-invert prose-lg max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                </div>

                {/* Footer / Voting */}
                <div className="mt-16 pt-8 border-t border-white/10 flex justify-between items-center">
                    <div className="flex gap-4">
                        <button className="flex items-center gap-2 px-6 py-3 bg-electric-purple/10 hover:bg-electric-purple/20 text-electric-purple rounded-lg transition-colors font-bold">
                            <span>🔥</span>
                            <span>Agree ({votes?.up || 0})</span>
                        </button>
                        <button className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-steel-gray rounded-lg transition-colors font-bold">
                            <span>🤔</span>
                            <span>Debate ({votes?.down || 0})</span>
                        </button>
                    </div>

                    <button className="text-steel-gray hover:text-white transition-colors font-bold flex items-center gap-2">
                        <span>Share Theory</span>
                        <span>↗</span>
                    </button>
                </div>
            </div>
        </article>
    );
};

export default TheoryTemplate;
