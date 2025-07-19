import React from 'react';
import { motion } from 'framer-motion';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Calendar Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <motion.div 
            className="text-center max-w-md mx-auto p-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-6xl mb-6">⚠️</div>
            <h2 className="text-2xl font-bold text-purple mb-4 mystical-title">
              Something went wrong
            </h2>
            <p className="text-grey mb-6 font-mystical">
              We're having trouble loading the anime calendar. Please try refreshing the page.
            </p>
            <motion.button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-purple to-dark-purple text-white px-6 py-3 rounded-lg font-mystical hover:shadow-lg hover:shadow-purple/25 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🔄 Refresh Page
            </motion.button>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
