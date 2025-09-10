import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MangaPanel = ({ 
  children, 
  panelNumber = "01", 
  type = "default", 
  sfx, 
  interactive = true,
  className = "" 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showSfx, setShowSfx] = useState(false);

  const panelVariants = {
    default: "manga-panel-transition",
    focus: "manga-panel-transition manga-focus-lines",
    action: "manga-panel-transition manga-action-lines"
  };

  const handleClick = () => {
    if (sfx && interactive) {
      setShowSfx(true);
      setTimeout(() => setShowSfx(false), 1000);
    }
  };

  return (
    <motion.div
      className={`${panelVariants[type]} ${className} manga-interactive relative`}
      data-panel={panelNumber}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      whileHover={{ scale: interactive ? 1.02 : 1 }}
      whileTap={{ scale: interactive ? 0.98 : 1 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
      
      {/* Sound Effect Display */}
      <AnimatePresence>
        {showSfx && sfx && (
          <motion.div
            className="absolute top-4 right-4 manga-sfx text-2xl pointer-events-none"
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: 1, rotate: [-5, 5, -5, 0] }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            {sfx}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hover Effect Lines */}
      {isHovered && interactive && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="manga-action-lines w-full h-full absolute inset-0" />
        </motion.div>
      )}
    </motion.div>
  );
};

export default MangaPanel;
