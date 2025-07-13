import { motion } from 'framer-motion';
import Link from 'next/link';

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <footer className="relative bg-ink-black border-t border-line-highlight/30 mt-20 ukiyo-overlay">
      {/* Ukiyo-e Texture Background */}
      <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-forest-accent/20 via-transparent to-violet-glow/10" />
      
      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-6 py-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="col-span-2 md:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-forest-accent rounded-lg flex items-center justify-center">
                <span className="text-parchment font-mystical text-lg">⛩️</span>
              </div>
              <h3 className="text-parchment font-mystical text-xl">Shonen Ark</h3>
            </div>
            <p className="text-stone-wash text-sm font-mono leading-relaxed">
              Where ink meets legend, and theories become truth. 
              Join the mystical community of shonen enthusiasts.
            </p>
          </motion.div>

          {/* Community Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-parchment font-mystical text-lg mb-4 ink-brush-edge">Community</h4>
            <ul className="space-y-2">
              {[
                { name: 'Fan Theories', path: '/theories' },
                { name: 'Animations', path: '/animations' },
                { name: 'Calendar', path: '/calendar' },
                { name: 'Creators', path: '/creators' }
              ].map((link) => (
                <li key={link.path}>
                  <Link href={link.path}>
                    <motion.span
                      className="text-stone-wash hover:text-violet-glow font-mono text-sm transition-colors cursor-pointer"
                      whileHover={{ x: 4 }}
                    >
                      {link.name}
                    </motion.span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-parchment font-mystical text-lg mb-4 ink-brush-edge">Support</h4>
            <ul className="space-y-2">
              {[
                { name: 'About', path: '/about' },
                { name: 'Contact', path: '/contact' },
                { name: 'Terms', path: '/terms' },
                { name: 'Account', path: '/account' }
              ].map((link) => (
                <li key={link.path}>
                  <Link href={link.path}>
                    <motion.span
                      className="text-stone-wash hover:text-violet-glow font-mono text-sm transition-colors cursor-pointer"
                      whileHover={{ x: 4 }}
                    >
                      {link.name}
                    </motion.span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={itemVariants}>
            <h4 className="text-parchment font-mystical text-lg mb-4 ink-brush-edge">Stay Connected</h4>
            <p className="text-stone-wash text-sm font-mono mb-4">
              Get mystical updates and exclusive content
            </p>
            <div className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="bg-sumi-gray border border-line-highlight/30 rounded-lg px-3 py-2 text-parchment text-sm font-mono focus:border-violet-glow focus:outline-none transition-colors"
              />
              <motion.button
                className="bg-forest-accent hover:bg-violet-glow text-parchment px-4 py-2 rounded-lg font-mono text-sm transition-colors shrine-glow"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Ink Divider */}
        <motion.div
          className="w-full h-px bg-gradient-to-r from-transparent via-line-highlight to-transparent mb-8"
          variants={itemVariants}
        />

        {/* Bottom Section */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          {/* Copyright */}
          <div className="text-stone-wash text-sm font-mono">
            © 2025 Shonen Ark. All rights reserved.
          </div>

          {/* Social Links */}
          <div className="flex space-x-4">
            {[
              { icon: '🐦', label: 'Twitter' },
              { icon: '📺', label: 'YouTube' },
              { icon: '💬', label: 'Discord' },
              { icon: '📱', label: 'TikTok' }
            ].map((social) => (
              <motion.button
                key={social.label}
                className="w-10 h-10 bg-sumi-gray hover:bg-forest-accent rounded-lg flex items-center justify-center text-stone-wash hover:text-parchment transition-colors"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                title={social.label}
              >
                {social.icon}
              </motion.button>
            ))}
          </div>

          {/* Version Info */}
          <div className="text-stone-wash text-xs font-mono opacity-60">
            Mystical Edition v1.0.0
          </div>
        </motion.div>

        {/* Floating Ink Elements */}
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-forest-accent/30 rounded-full"
            style={{
              left: `${20 + i * 30}%`,
              top: `${20 + i * 10}%`,
            }}
            animate={{
              y: [-5, 5, -5],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.5,
            }}
          />
        ))}
      </motion.div>
    </footer>
  );
};

export default Footer;
