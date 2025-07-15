import { useState } from 'react';
import { motion } from 'framer-motion';

const ContactForm = ({ onSubmit, className = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle'); // idle, success, error

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        if (onSubmit) onSubmit(formData);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetStatus = () => {
    setSubmitStatus('idle');
  };

  return (
    <motion.div 
      className={`bg-gradient-to-br from-purple-900/30 to-black/50 p-8 rounded-lg border border-purple/20 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="text-2xl font-bold mystical-title text-purple mb-6 text-center">
        Contact Us
      </h3>

      {submitStatus === 'success' && (
        <motion.div 
          className="bg-green-600/20 border border-green-500/30 p-4 rounded-lg mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="text-green-400 text-center">
            <div className="text-2xl mb-2">✅</div>
            <p>Thank you! Your message has been sent successfully.</p>
          </div>
        </motion.div>
      )}

      {submitStatus === 'error' && (
        <motion.div 
          className="bg-red-600/20 border border-red-500/30 p-4 rounded-lg mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="text-red-400 text-center">
            <div className="text-2xl mb-2">❌</div>
            <p>Sorry, there was an error sending your message. Please try again.</p>
            <button 
              onClick={resetStatus}
              className="mt-2 text-sm underline hover:no-underline"
            >
              Try again
            </button>
          </div>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-purple-200 mb-2">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-black/50 border border-purple/30 rounded-lg text-white placeholder-grey focus:outline-none focus:border-purple focus:ring-1 focus:ring-purple"
              placeholder="Your name"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-purple-200 mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-black/50 border border-purple/30 rounded-lg text-white placeholder-grey focus:outline-none focus:border-purple focus:ring-1 focus:ring-purple"
              placeholder="your.email@example.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-purple-200 mb-2">
            Subject *
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            required
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-black/50 border border-purple/30 rounded-lg text-white placeholder-grey focus:outline-none focus:border-purple focus:ring-1 focus:ring-purple"
            placeholder="What's this about?"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-purple-200 mb-2">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-black/50 border border-purple/30 rounded-lg text-white placeholder-grey focus:outline-none focus:border-purple focus:ring-1 focus:ring-purple resize-vertical"
            placeholder="Tell us what's on your mind..."
          />
        </div>

        <motion.button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-purple hover:bg-dark-purple disabled:bg-grey text-white py-3 px-6 rounded-lg transition-colors font-medium"
          whileHover={!isSubmitting ? { scale: 1.02 } : {}}
          whileTap={!isSubmitting ? { scale: 0.98 } : {}}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <motion.div 
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              Sending...
            </div>
          ) : (
            'Send Message'
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default ContactForm;
