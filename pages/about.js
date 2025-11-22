import { motion } from 'framer-motion';
import Link from 'next/link';
import { Scroll, Palette, Briefcase, Cpu, Code, Layers, Database } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen py-20 bg-void-black text-ash-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.header
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold font-heading mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-electric-purple to-white animate-gradient-x">
            About Shonen Ark
          </h1>
          <p className="text-xl text-steel-gray font-body max-w-2xl mx-auto leading-relaxed">
            A professional platform where anime fans unite to explore theories,
            share creations, and celebrate the art of storytelling.
          </p>
        </motion.header>

        {/* Mission Section */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-shadow-dark border border-white/5 rounded-2xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-electric-purple/5 rounded-full blur-3xl -mr-32 -mt-32" />

            <h2 className="text-3xl font-bold mb-6 text-white font-heading">Our Mission</h2>
            <p className="text-lg text-steel-gray leading-relaxed mb-6 font-body">
              Shonen Ark is built for the dedicated anime community. We provide a professional platform for fans to connect, create, and collaborate.
            </p>
            <p className="text-lg text-steel-gray leading-relaxed font-body">
              Beyond consumption, we empower creators. Whether you&apos;re a theorist, artist, or editor, Shonen Ark is your stage to showcase talent and build a career in the industry.
            </p>
          </div>
        </motion.section>

        {/* Features Grid */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-10 text-center text-white font-heading">Platform Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Theory Crafting",
                desc: "Advanced tools for deep analysis and prediction tracking.",
                icon: <Scroll className="w-12 h-12 text-electric-purple" />
              },
              {
                title: "Creative Studio",
                desc: "Share AMVs, fan art, and original manga with a global audience.",
                icon: <Palette className="w-12 h-12 text-electric-purple" />
              },
              {
                title: "Pro Network",
                desc: "Find paid gigs and collaborate on massive community projects.",
                icon: <Briefcase className="w-12 h-12 text-electric-purple" />
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-void-black/50 border border-white/10 p-8 rounded-xl hover:border-electric-purple/50 transition-colors group"
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 bg-electric-purple/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-electric-purple/20 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-white group-hover:text-electric-purple transition-colors">{feature.title}</h3>
                <p className="text-steel-gray">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Founder Section */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-shadow-dark border border-white/5 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-8 text-white font-heading">Meet the Founder</h2>

            <div className="max-w-4xl mx-auto">
              <div className="w-24 h-24 bg-gradient-to-br from-electric-purple to-neon-blue rounded-full mx-auto mb-6 flex items-center justify-center text-3xl text-white font-bold shadow-glow">
                M
              </div>

              <h3 className="text-2xl font-bold text-white mb-4 font-heading">
                marimondaa
              </h3>

              <p className="text-lg text-steel-gray mb-8 leading-relaxed font-body max-w-2xl mx-auto">
                A passionate developer and anime enthusiast dedicated to building the ultimate platform for the community.
              </p>

              <div className="flex justify-center gap-4">
                <a
                  href="https://github.com/marimondaa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors border border-white/10 font-bold"
                >
                  GitHub
                </a>
                <Link
                  href="/contact"
                  className="px-6 py-2 bg-electric-purple hover:bg-neon-violet text-white rounded-lg transition-colors shadow-lg shadow-electric-purple/20 font-bold"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Technology Stack */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-10 text-center text-white font-heading">Built With Modern Tech</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Next.js', desc: 'React Framework' },
              { name: 'Tailwind CSS', desc: 'Utility-first CSS' },
              { name: 'Framer Motion', desc: 'Animation Library' },
              { name: 'Supabase', desc: 'Backend Infrastructure' }
            ].map((tech, index) => (
              <motion.div
                key={index}
                className="bg-void-black/30 border border-white/5 p-6 rounded-xl text-center hover:border-electric-purple/30 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="font-bold text-white mb-1">{tech.name}</h3>
                <p className="text-sm text-steel-gray">{tech.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-gradient-to-br from-electric-purple/20 to-void-black border border-electric-purple/30 rounded-2xl p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/[0.02]" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white font-heading relative z-10">
              Join the Community
            </h2>
            <p className="text-lg text-steel-gray mb-8 max-w-2xl mx-auto relative z-10">
              Whether you&apos;re a theorist, creator, or fan, there&apos;s a place for you in Shonen Ark.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <Link
                href="/theories"
                className="px-8 py-3 bg-electric-purple hover:bg-neon-violet text-white font-bold rounded-lg shadow-lg shadow-electric-purple/20 transition-all hover:-translate-y-1"
              >
                Explore Theories
              </Link>
              <Link
                href="/discovery"
                className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 font-bold rounded-lg transition-all hover:-translate-y-1"
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
