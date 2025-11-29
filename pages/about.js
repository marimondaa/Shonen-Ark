import Head from 'next/head';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Zap, Users, Shield, Code, Database, Globe } from 'lucide-react';

export default function AboutPage() {
  const features = [
    {
      icon: <Zap className="w-8 h-8 text-electric-purple" />,
      title: "Theory Crafting",
      description: "A dedicated space for deep analysis and prediction. Our structured debate system ensures the best theories rise to the top."
    },
    {
      icon: <Users className="w-8 h-8 text-blue-400" />,
      title: "Pro Network",
      description: "Connect with serious creators. From AMV editors to manga illustrators, find your team and build your legacy."
    },
    {
      icon: <Shield className="w-8 h-8 text-green-400" />,
      title: "Quality First",
      description: "Curated content and community moderation keep the standard high. No spam, just pure passion."
    }
  ];

  const techStack = [
    { name: "Next.js 13", icon: <Globe className="w-6 h-6" /> },
    { name: "Tailwind CSS", icon: <Code className="w-6 h-6" /> },
    { name: "Supabase", icon: <Database className="w-6 h-6" /> },
    { name: "Framer Motion", icon: <Zap className="w-6 h-6" /> }
  ];

  return (
    <>
      <Head>
        <title>About - Shonen Ark</title>
      </Head>

      <div className="min-h-screen bg-void-black text-ash-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-electric-purple/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-24"
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-8 electric-text">
              FOR THE STRONGEST
            </h1>
            <p className="text-xl md:text-2xl text-steel-gray max-w-3xl mx-auto leading-relaxed">
              Shonen Ark is more than a platform. It's a proving ground for the next generation of anime creators, theorists, and fans.
            </p>
          </motion.div>

          {/* Mission Section */}
          <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-white">
                THE MISSION
              </h2>
              <div className="space-y-6 text-lg text-steel-gray">
                <p>
                  The anime community deserves better than scattered forums and toxic comment sections. We built Shonen Ark to be the ultimate headquarters for fans who take their passion seriously.
                </p>
                <p>
                  Whether you're crafting a complex theory about the One Piece void century, looking for a team to animate a fight scene, or just tracking the latest releases, you belong here.
                </p>
              </div>

              <div className="mt-8">
                <Link href="/register">
                  <button className="flex items-center gap-2 text-electric-purple font-bold hover:text-white transition-colors group">
                    Join the Ark <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-electric-purple to-blue-600 rounded-2xl blur-2xl opacity-20" />
              <div className="bg-shadow-dark border border-white/10 rounded-2xl p-8 relative">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-void-black p-4 rounded-xl border border-white/5">
                    <div className="text-3xl font-bold text-white mb-1">10K+</div>
                    <div className="text-sm text-steel-gray">Active Users</div>
                  </div>
                  <div className="bg-void-black p-4 rounded-xl border border-white/5">
                    <div className="text-3xl font-bold text-white mb-1">5K+</div>
                    <div className="text-sm text-steel-gray">Theories</div>
                  </div>
                  <div className="bg-void-black p-4 rounded-xl border border-white/5">
                    <div className="text-3xl font-bold text-white mb-1">50+</div>
                    <div className="text-sm text-steel-gray">Projects</div>
                  </div>
                  <div className="bg-void-black p-4 rounded-xl border border-white/5">
                    <div className="text-3xl font-bold text-white mb-1">24/7</div>
                    <div className="text-sm text-steel-gray">Activity</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-32">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-shadow-dark p-8 rounded-2xl border border-white/5 hover:border-electric-purple/30 transition-all hover:-translate-y-2"
              >
                <div className="bg-void-black w-16 h-16 rounded-xl flex items-center justify-center mb-6 border border-white/5">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4 font-display tracking-wide">
                  {feature.title}
                </h3>
                <p className="text-steel-gray leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center border-t border-white/5 pt-20"
          >
            <h3 className="text-sm font-bold text-steel-gray uppercase tracking-widest mb-12">
              Powered By Modern Tech
            </h3>
            <div className="flex flex-wrap justify-center gap-12 opacity-70">
              {techStack.map((tech) => (
                <div key={tech.name} className="flex flex-col items-center gap-3 group">
                  <div className="p-4 bg-white/5 rounded-full group-hover:bg-electric-purple/20 group-hover:text-electric-purple transition-colors">
                    {tech.icon}
                  </div>
                  <span className="text-sm font-medium">{tech.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
