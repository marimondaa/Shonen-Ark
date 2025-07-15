import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.header 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold mystical-title mb-4 text-accent-pink glow-text">
            About Shonen Ark
          </h1>
          <p className="text-xl text-text-muted brush-font max-w-2xl mx-auto">
            A mystical platform where anime fans unite to explore theories, 
            share creations, and celebrate the art of storytelling.
          </p>
        </motion.header>

        {/* Mission Section */}
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-gradient-shrine rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold mystical-title mb-6 text-accent-pink">
              Our Mission
            </h2>
            <p className="text-lg text-text-muted brush-font max-w-3xl mx-auto leading-relaxed">
              Shonen Ark is a sanctuary for anime enthusiasts who believe that every story holds deeper mysteries. 
              We combine traditional Japanese aesthetics with modern technology to create a platform where 
              fan theories flourish, creators showcase their talents, and the community bonds over shared passion.
            </p>
          </div>
        </motion.section>

        {/* Features Grid */}
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold mystical-title text-center mb-12 text-accent-pink">
            Platform Features
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '🔮',
                title: 'Theory Hub',
                description: 'Share and explore deep anime theories with AI-assisted content generation and community discussions.'
              },
              {
                icon: '🎨',
                title: 'Creator Platform',
                description: 'Upload animations, artwork, and audio content. Build your following and grow your creative presence.'
              },
              {
                icon: '📅',
                title: 'Release Calendar',
                description: 'Stay updated with real-time anime and manga release schedules via AniList integration.'
              },
              {
                icon: '🏮',
                title: 'Mystical Design',
                description: 'Experience fusion UI design combining Design Yokocho and Phantom 980 aesthetics.'
              },
              {
                icon: '💫',
                title: 'Community Features',
                description: 'Follow creators, bookmark content, engage in discussions, and build meaningful connections.'
              },
              {
                icon: '⚡',
                title: 'Creator Tools',
                description: 'Professional dashboard with analytics, subscriber management, and monetization options.'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-anime-blue/30 backdrop-blur-sm rounded-lg p-6 border border-accent-pink/20 shrine-glow hover:scale-105 transition-all duration-300"
              >
                <div className="text-4xl mb-4 text-center">{feature.icon}</div>
                <h3 className="text-xl font-bold mystical-title text-accent-pink mb-3 text-center">
                  {feature.title}
                </h3>
                <p className="text-text-muted brush-font text-center">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Founder Section */}
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="bg-bg-dark-secondary/50 rounded-lg p-8">
            <h2 className="text-3xl font-bold mystical-title text-center mb-8 text-accent-pink">
              Meet the Founder
            </h2>
            
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-32 h-32 bg-gradient-shrine rounded-full mx-auto mb-6 flex items-center justify-center text-4xl">
                🏯
              </div>
              
              <h3 className="text-2xl font-bold mystical-title text-accent-pink mb-4">
                marimondaa
              </h3>
              
              <p className="text-lg text-text-muted brush-font mb-6 leading-relaxed">
                A passionate anime enthusiast and developer who envisioned a platform where the mystical world 
                of anime theories could flourish. With a deep appreciation for Japanese aesthetics and modern 
                design principles, the goal is to create a space that honors both tradition and innovation.
              </p>
              
              <div className="flex justify-center space-x-4">
                <a 
                  href="https://github.com/marimondaa" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-accent-pink/20 hover:bg-accent-pink/30 text-accent-pink px-4 py-2 rounded transition-colors"
                >
                  GitHub
                </a>
                <Link
                  href="/contact"
                  className="bg-accent-pink hover:bg-accent-rose text-bg-dark px-4 py-2 rounded transition-colors"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Technology Stack */}
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h2 className="text-3xl font-bold mystical-title text-center mb-8 text-accent-pink">
            Built With Modern Technology
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Next.js', icon: '⚛️', description: 'React framework for production' },
              { name: 'Tailwind CSS', icon: '🎨', description: 'Utility-first CSS framework' },
              { name: 'Framer Motion', icon: '✨', description: 'Animation library for React' },
              { name: 'Supabase', icon: '🗄️', description: 'Backend as a service' }
            ].map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-anime-blue/20 backdrop-blur-sm rounded-lg p-6 text-center border border-accent-pink/20"
              >
                <div className="text-3xl mb-3">{tech.icon}</div>
                <h3 className="font-bold text-accent-pink mb-2">{tech.name}</h3>
                <p className="text-sm text-text-muted">{tech.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <div className="bg-gradient-shrine rounded-lg p-8">
            <h2 className="text-3xl font-bold mystical-title mb-6 text-accent-pink glow-text">
              Join Our Mystical Community
            </h2>
            <p className="text-lg text-text-muted brush-font mb-8 max-w-2xl mx-auto">
              Whether you're a theorist, creator, or just someone who loves anime, 
              there's a place for you in the Shonen Ark community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/theories"
                className="bg-accent-pink hover:bg-accent-rose text-bg-dark font-bold py-3 px-8 rounded-lg transition-all duration-300 shrine-glow"
              >
                Explore Theories
              </Link>
              <Link
                href="/discover"
                className="border-2 border-accent-pink text-accent-pink hover:bg-accent-pink hover:text-bg-dark font-bold py-3 px-8 rounded-lg transition-all duration-300"
              >
                Start Creating
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
