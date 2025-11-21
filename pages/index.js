import Head from 'next/head';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '../src/lib/hooks/useAuth';

export default function Home() {
  const { user } = useAuth();

  return (
    <>
      <Head>
        <title>Shonen Ark - Where Legends Rise</title>
        <meta name="description" content="The ultimate platform for shonen anime theories, analysis, and community. Join the strongest fans." />
      </Head>

      <div className="relative min-h-screen">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* Animated Background Lines */}
          <div className="absolute inset-0 opacity-20">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-px bg-gradient-electric"
                style={{
                  top: `${20 + i * 20}%`,
                  left: '-100%',
                  right: '-100%',
                }}
                animate={{
                  left: ['100%', '-100%'],
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            ))}
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="font-display text-7xl md:text-9xl mb-6 electric-text">
                SHONEN ARK
              </h1>
              <p className="text-2xl md:text-4xl mb-4 text-electric-purple font-bold">
                WHERE LEGENDS RISE
              </p>
              <p className="text-lg md:text-xl text-steel-gray max-w-2xl mx-auto mb-12">
                Unleash your power. Craft theories that shake the community.
                Analyze anime like never before. This is your arena.
              </p>

              <div className="flex gap-4 justify-center flex-wrap">
                <Link href="/theories">
                  <button className="power-button">
                    EXPLORE THEORIES
                  </button>
                </Link>
                {!user && (
                  <Link href="/register">
                    <button className="power-button" style={{
                      background: 'linear-gradient(135deg, #1f1535 0%, #2d1b4e 100%)',
                      border: '1px solid #8b5cf6',
                    }}>
                      JOIN THE ARK
                    </button>
                  </Link>
                )}
              </div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-6 h-10 border-2 border-electric-purple flex items-start justify-center p-2">
              <div className="w-1 h-2 bg-electric-purple" />
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              className="font-display text-5xl md:text-6xl text-center mb-16 electric-text"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              DOMINATE THE ARENA
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'THEORY CRAFTING',
                  description: 'Create and debate theories that challenge the narrative. Vote, analyze, dominate.',
                  link: '/theories',
                  icon: '⚔️',
                },
                {
                  title: 'COMMUNITY POWER',
                  description: 'Connect with the strongest minds. Share insights. Build your legacy.',
                  link: '/discovery',
                  icon: '⚡',
                },
                {
                  title: 'NEVER MISS A RELEASE',
                  description: 'Track every anime and manga release. Stay ahead of the game.',
                  link: '/calendar',
                  icon: '📅',
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  <Link href={feature.link}>
                    <div className="power-card p-8 h-full cursor-pointer group">
                      <div className="text-5xl mb-4">{feature.icon}</div>
                      <h3 className="font-display text-2xl mb-4 text-ash-white group-hover:text-electric-purple transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-steel-gray leading-relaxed">
                        {feature.description}
                      </p>
                      <div className="mt-6 text-electric-purple font-bold">
                        ENTER →
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 px-4 bg-gradient-to-b from-transparent via-midnight-purple to-transparent">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { label: 'ACTIVE USERS', value: '10K+' },
                { label: 'THEORIES', value: '5K+' },
                { label: 'ANIME TRACKED', value: '500+' },
                { label: 'DAILY DEBATES', value: '1K+' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glow-border p-6"
                >
                  <div className="font-display text-4xl md:text-5xl text-electric-purple mb-2">
                    {stat.value}
                  </div>
                  <div className="text-steel-gray text-sm tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-5xl md:text-7xl mb-6 electric-text">
                YOUR LEGEND STARTS NOW
              </h2>
              <p className="text-xl text-steel-gray mb-12">
                Join thousands of anime fans who refuse to be ordinary.
              </p>
              <Link href={user ? '/theories' : '/register'}>
                <button className="power-button text-xl px-12 py-4">
                  {user ? 'ENTER THE ARK' : 'CREATE ACCOUNT'}
                </button>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
