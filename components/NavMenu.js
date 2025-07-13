import { motion } from 'framer-motion';
import Link from 'next/link';

const NavMenu = () => {
  const menuItems = [
    { name: 'Theories', path: '/theories' },
    { name: 'Fan Animations', path: '/animations' },
    { name: 'Calendar', path: '/calendar' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'My Account', path: '/account' }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.nav
      className="flex flex-col items-center space-y-8 md:space-y-12 generous-spacing"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {menuItems.map((item, index) => (
        <motion.div
          key={item.name}
          variants={itemVariants}
          whileHover={{
            y: -6,
            transition: { duration: 0.3, ease: "easeOut" }
          }}
          className="group mystical-glow"
        >
          <Link href={item.path}>
            <span className="nav-item text-text-light hover:text-accent-pink text-xl md:text-2xl lg:text-3xl font-light tracking-wide cursor-pointer transition-all duration-300 font-mystical">
              {item.name}
            </span>
          </Link>
        </motion.div>
      ))}
    </motion.nav>
  );
};

export default NavMenu;
