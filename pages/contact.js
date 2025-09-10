import { useState } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Contact form submitted:', formData);
      setIsSubmitted(true);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        inquiryType: 'general'
      });
    } catch (error) {
      console.error('Failed to submit contact form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'creator', label: 'Creator Support' },
    { value: 'technical', label: 'Technical Issue' },
    { value: 'business', label: 'Business Partnership' },
    { value: 'feedback', label: 'Feedback & Suggestions' }
  ];

  const contactMethods = [
    {
      icon: '📧',
      title: 'Email Support',
      description: 'Get help via email',
      contact: 'support@shonenark.com',
      response: '24-48 hours'
    },
    {
      icon: '💬',
      title: 'Discord Community',
      description: 'Join our active community',
      contact: 'discord.gg/shonenark',
      response: 'Real-time'
    },
    {
      icon: '🐦',
      title: 'Social Media',
      description: 'Follow us for updates',
      contact: '@ShonenArkHQ',
      response: 'Daily updates'
    }
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-purple-900 text-white flex items-center justify-center">
        <motion.div 
          className="text-center max-w-md mx-auto px-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-8xl mb-6">✉️</div>
          <h2 className="text-3xl font-bold mb-4 text-purple">Message Sent!</h2>
          <p className="text-grey mb-8">
            Thank you for contacting us. We'll get back to you within 24-48 hours.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="bg-purple hover:bg-dark-purple text-white px-6 py-3 rounded-lg transition-colors"
          >
            Send Another Message
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Contact Us - Shonen Ark</title>
        <meta name="description" content="Get in touch with the Shonen Ark team. We're here to help with any questions or support you need." />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-black to-purple-900 text-white">
        {/* Hero Section */}
        <motion.div 
          className="bg-gradient-to-b from-purple-900 to-black py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="text-8xl mb-6">📞</div>
              <h1 className="text-5xl font-bold mystical-title mb-4">
                Get In Touch
              </h1>
              <p className="text-xl text-purple-200 brush-font max-w-2xl mx-auto">
                Have a question, suggestion, or need support? We're here to help!
              </p>
            </motion.div>
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className="bg-dark-purple/20 p-8 rounded-xl border border-purple/30">
                <h2 className="text-3xl font-bold mb-6 text-purple">Send us a Message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Inquiry Type */}
                  <div>
                    <label htmlFor="inquiryType" className="block text-sm font-medium text-purple mb-2">
                      Inquiry Type
                    </label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleInputChange}
                      className="w-full bg-black/50 border border-purple/30 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-purple"
                      required
                    >
                      {inquiryTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Name and Email Row */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-purple mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full bg-black/50 border border-purple/30 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-purple"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-purple mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-black/50 border border-purple/30 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-purple"
                        required
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-purple mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full bg-black/50 border border-purple/30 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-purple"
                      required
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-purple mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      className="w-full bg-black/50 border border-purple/30 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-purple resize-none"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-purple to-dark-purple text-white py-3 rounded-lg hover:shadow-lg hover:shadow-purple/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <motion.div
                        className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold mb-6 text-purple">Other Ways to Reach Us</h2>
                <div className="space-y-6">
                  {contactMethods.map((method, index) => (
                    <motion.div
                      key={index}
                      className="bg-dark-purple/20 p-6 rounded-xl border border-purple/30 hover:bg-dark-purple/30 transition-colors"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                    >
                      <div className="flex items-start space-x-4">
                        <div className="text-3xl">{method.icon}</div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white mb-2">{method.title}</h3>
                          <p className="text-grey mb-2">{method.description}</p>
                          <p className="text-purple font-medium">{method.contact}</p>
                          <p className="text-sm text-grey">Response time: {method.response}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* FAQ Section */}
              <div className="bg-dark-purple/20 p-6 rounded-xl border border-purple/30">
                <h3 className="text-2xl font-bold text-purple mb-4">Quick Help</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <h4 className="font-medium text-white mb-1">Account Issues?</h4>
                    <p className="text-grey">Check our help center or reset your password.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">Content Creation?</h4>
                    <p className="text-grey">Visit our creator resources for guides and tips.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">Technical Problems?</h4>
                    <p className="text-grey">Try refreshing or clearing your browser cache.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
