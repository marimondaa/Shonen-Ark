import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const ScrollFX = ({ children, className = "", fadeDirection = "up" }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], 
    fadeDirection === "up" ? [50, 0] : 
    fadeDirection === "down" ? [-50, 0] : [0, 0]
  );

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollFX;
