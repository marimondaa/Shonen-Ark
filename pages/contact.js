import Head from 'next/head'
import { useState } from 'react'
import Navbar from '../components/Navbar'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: '',
    animeSuggestion: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      alert('Thank you for your message! We\'ll get back to you soon.')
      setFormData({
        name: '',
        email: '',
        subject: 'general',
        message: '',
        animeSuggestion: ''
      })
    }, 1500)
  }

  const contactMethods = [
    {
      icon: '📧',
      title: 'Email Support',
      description: 'Get help with your account or technical issues',
      contact: 'support@shonenark.com',
      responseTime: '24-48 hours'
    },
    {
      icon: '🔵',
      title: 'Discord Community',
      description: 'Join our community for real-time discussions',
      contact: 'discord.gg/shonenark',
      responseTime: 'Instant'
    },
    {
      icon: '🐦',
      title: 'Twitter',
      description: 'Follow us for updates and quick responses',
      contact: '@ShonenArk',
      responseTime: '2-4 hours'
    }
  ]

  const faqItems = [
    {
      question: 'How do I become a verified creator?',
      answer: 'Creators can apply for verification after publishing 5+ high-quality theories or creations and gaining 100+ followers.'
    },
    {
      question: 'Can I monetize my content on Shonen Ark?',
      answer: 'Yes! Creator accounts have access to our revenue-sharing program and can receive tips from fans.'
    },
    {
      question: 'What anime/manga series do you support?',
      answer: 'We currently focus on popular shonen series like Jujutsu Kaisen, One Piece, Solo Leveling, and Chainsaw Man, with plans to expand.'
    },
    {
      question: 'Is Shonen Ark free to use?',
      answer: 'Yes! Basic features are free. We offer premium Creator Pro accounts with advanced features for $9.99/month.'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">
      <Head>
        <title>Contact Us - Shonen Ark</title>
        <meta name="description" content="Get in touch with the Shonen Ark team. We're here to help with questions, feedback, and anime suggestions." />
      </Head>

      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-purple-900 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Get in Touch</h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Have questions, feedback, or anime suggestions? We'd love to hear from you! 
            Our team is here to help make Shonen Ark the best platform for anime fans.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">📞 How to Reach Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {contactMethods.map((method, idx) => (
              <div key={idx} className="bg-gray-900 rounded-2xl p-8 text-center hover:bg-gray-800 transition-colors">
                <span className="text-4xl mb-4 block">{method.icon}</span>
                <h3 className="text-xl font-bold mb-2">{method.title}</h3>
                <p className="text-gray-400 mb-4">{method.description}</p>
                <div className="bg-gray-800 rounded-lg p-3 mb-4">
                  <p className="font-mono text-blue-400">{method.contact}</p>
                </div>
                <p className="text-sm text-gray-500">Response time: {method.responseTime}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="bg-gray-900 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">💌 Send Us a Message</h2>
          
          <form onSubmit={handleSubmit} className="bg-gray-800 rounded-2xl p-8">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="subject" className="block text-sm font-medium mb-2">
                Subject *
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                required
              >
                <option value="general">General Inquiry</option>
                <option value="support">Technical Support</option>
                <option value="creator">Creator Program</option>
                <option value="partnership">Partnership</option>
                <option value="feedback">Feedback</option>
                <option value="bug">Bug Report</option>
              </select>
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us what's on your mind..."
                rows="6"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 resize-vertical"
                required
              ></textarea>
            </div>

            <div className="mb-8">
              <label htmlFor="animeSuggestion" className="block text-sm font-medium mb-2">
                🎌 Anime/Manga Suggestion (Optional)
              </label>
              <input
                type="text"
                id="animeSuggestion"
                name="animeSuggestion"
                value={formData.animeSuggestion}
                onChange={handleChange}
                placeholder="Suggest a series you'd like to see more content about..."
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
              <p className="text-sm text-gray-500 mt-2">
                Help us prioritize which anime/manga series to focus on next!
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 py-4 rounded-lg font-bold text-lg transition-colors"
            >
              {isSubmitting ? 'Sending Message...' : 'Send Message'}
            </button>
          </form>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">❓ Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqItems.map((faq, idx) => (
              <div key={idx} className="bg-gray-900 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3">{faq.question}</h3>
                <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-400 mb-6">
              Don't see your question here? Check out our full help center or reach out directly.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors">
                📚 Help Center
              </button>
              <button className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold transition-colors">
                🔵 Join Discord
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="bg-red-900 bg-opacity-20 py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">🚨 Report Content Issues</h3>
          <p className="text-gray-300 mb-6">
            Found inappropriate content, spam, or copyright violations? 
            We take these issues seriously and respond quickly.
          </p>
          <button className="bg-red-600 hover:bg-red-700 px-8 py-3 rounded-lg font-bold transition-colors">
            Report Issue
          </button>
        </div>
      </section>
    </div>
  )
}
