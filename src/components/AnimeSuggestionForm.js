import { useState } from 'react';
import { motion } from 'framer-motion';

const AnimeSuggestionForm = ({ onSubmit, className = '' }) => {
  const [formData, setFormData] = useState({
    animeTitle: '',
    description: '',
    category: '',
    reason: '',
    submitterName: '',
    submitterEmail: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle');

  const categories = [
    'Theory Request',
    'Cover Recommendation',
    'Character Analysis',
    'AMV Request',
    'Fan Art Inspiration',
    'General Discussion',
    'Other'
  ];

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
      const response = await fetch('/api/suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          animeTitle: '',
          description: '',
          category: '',
          reason: '',
          submitterName: '',
          submitterEmail: ''
        });
        if (onSubmit) onSubmit(formData);
      } else {
        throw new Error('Failed to submit suggestion');
      }
    } catch (error) {
      console.error('Suggestion form error:', error);
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
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <h3 className="text-2xl font-bold mystical-title text-purple mb-6 text-center">
        Suggest an Anime
      </h3>

      <p className="text-grey text-center mb-6">
        Help us discover what anime and manga series you&apos;d like to see covered on Shonen Ark!
      </p>

      {submitStatus === 'success' && (
        <motion.div
          className="bg-green-600/20 border border-green-500/30 p-4 rounded-lg mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="text-green-400 text-center">
            <div className="text-2xl mb-2">🎉</div>
            <p>Thank you for your suggestion! We'll consider it for future content.</p>
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
            <p>Sorry, there was an error submitting your suggestion. Please try again.</p>
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
        <div>
          <label htmlFor="animeTitle" className="block text-sm font-medium text-purple-200 mb-2">
            Anime/Manga Title *
          </label>
          <input
            type="text"
            id="animeTitle"
            name="animeTitle"
            required
            value={formData.animeTitle}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-black/50 border border-purple/30 rounded-lg text-white placeholder-grey focus:outline-none focus:border-purple focus:ring-1 focus:ring-purple"
            placeholder="e.g., Demon Slayer, One Piece, Attack on Titan"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-purple-200 mb-2">
            Content Category *
          </label>
          <select
            id="category"
            name="category"
            required
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-black/50 border border-purple/30 rounded-lg text-white focus:outline-none focus:border-purple focus:ring-1 focus:ring-purple"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-purple-200 mb-2">
            Brief Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-black/50 border border-purple/30 rounded-lg text-white placeholder-grey focus:outline-none focus:border-purple focus:ring-1 focus:ring-purple resize-vertical"
            placeholder="Brief description of the anime/manga and why it interests you..."
          />
        </div>

        <div>
          <label htmlFor="reason" className="block text-sm font-medium text-purple-200 mb-2">
            Why should we cover this? *
          </label>
          <textarea
            id="reason"
            name="reason"
            required
            rows={4}
            value={formData.reason}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-black/50 border border-purple/30 rounded-lg text-white placeholder-grey focus:outline-none focus:border-purple focus:ring-1 focus:ring-purple resize-vertical"
            placeholder="What makes this anime special? What theories or content possibilities do you see?"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="submitterName" className="block text-sm font-medium text-purple-200 mb-2">
              Your Name (Optional)
            </label>
            <input
              type="text"
              id="submitterName"
              name="submitterName"
              value={formData.submitterName}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-black/50 border border-purple/30 rounded-lg text-white placeholder-grey focus:outline-none focus:border-purple focus:ring-1 focus:ring-purple"
              placeholder="How should we credit you?"
            />
          </div>

          <div>
            <label htmlFor="submitterEmail" className="block text-sm font-medium text-purple-200 mb-2">
              Email (Optional)
            </label>
            <input
              type="email"
              id="submitterEmail"
              name="submitterEmail"
              value={formData.submitterEmail}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-black/50 border border-purple/30 rounded-lg text-white placeholder-grey focus:outline-none focus:border-purple focus:ring-1 focus:ring-purple"
              placeholder="For follow-up questions"
            />
          </div>
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
              Submitting...
            </div>
          ) : (
            'Submit Suggestion'
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default AnimeSuggestionForm;
