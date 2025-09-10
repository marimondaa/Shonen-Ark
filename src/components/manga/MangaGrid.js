import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MangaGrid = ({ children, columns = "auto", className = "" }) => {
  const [visiblePanels, setVisiblePanels] = useState([]);

  useEffect(() => {
    // Sequential panel reveal animation
    const panels = React.Children.toArray(children);
    panels.forEach((_, index) => {
      setTimeout(() => {
        setVisiblePanels(prev => [...prev, index]);
      }, index * 200);
    });
  }, [children]);

  const gridColumns = {
    auto: "repeat(auto-fit, minmax(300px, 1fr))",
    1: "1fr",
    2: "repeat(2, 1fr)",
    3: "repeat(3, 1fr)",
    4: "repeat(4, 1fr)"
  };

  return (
    <div 
      className={`manga-grid ${className}`}
      style={{ gridTemplateColumns: gridColumns[columns] }}
    >
      {React.Children.map(children, (child, index) => (
        <AnimatePresence key={index}>
          {visiblePanels.includes(index) && (
            <motion.div
              className="manga-grid-item"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -50 }}
              transition={{ 
                duration: 0.6,
                type: "spring",
                stiffness: 100
              }}
            >
              {child}
            </motion.div>
          )}
        </AnimatePresence>
      ))}
    </div>
  );
};

export default MangaGrid;
