import { motion } from 'framer-motion';

const MangaSpeechBubble = ({ 
  children, 
  type = "normal", 
  character = "Unknown",
  position = "bottom-left",
  className = ""
}) => {
  const bubbleTypes = {
    normal: "manga-bubble",
    thought: "manga-thought-bubble", 
    shout: "manga-shout-bubble"
  };

  const positions = {
    "bottom-left": "bottom-4 left-8",
    "bottom-right": "bottom-4 right-8", 
    "top-left": "top-4 left-8",
    "top-right": "top-4 right-8",
    "center": "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
  };

  return (
    <motion.div
      className={`${bubbleTypes[type]} ${positions[position]} absolute ${className} max-w-xs z-10`}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20,
        delay: 0.2 
      }}
    >
      {/* Character Name Label */}
      {character !== "Unknown" && (
        <div className="absolute -top-6 left-4 text-xs font-manga-header text-purple bg-ink-black px-2 py-1 rounded uppercase tracking-wide">
          {character}
        </div>
      )}
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default MangaSpeechBubble;
