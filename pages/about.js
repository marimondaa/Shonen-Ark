import Head from 'next/head'
import Link from 'next/link'
import Navbar from '../components/Navbar'

export default function About() {
  const teamMembers = [
    {
      name: 'You (Founder)',
      role: 'Founder & CEO',
      bio: 'Passionate anime enthusiast and visionary behind Shonen Ark. Dedicated to creating the ultimate platform for fan theories, creators, and anime community.',
      avatar: '⛩️',
      social: { twitter: '@shonenark', discord: 'Founder#0001' }
    },
    {
      name: 'Community Team',
      role: 'Community Management',
      bio: 'Dedicated team of moderators and community managers who ensure Shonen Ark remains a welcoming space for all fans.',
      avatar: '�',
      social: { twitter: '@shonenark', discord: 'Community#0002' }
    },
    {
      name: 'Development Team',
      role: 'Technical Development',
      bio: 'Full-stack developers and AI specialists working to bring cutting-edge features to the anime fan community.',
      avatar: '⚡',
      social: { twitter: '@shonenark', discord: 'DevTeam#0003' }
    }
  ]

  const milestones = [
    { year: '2024', event: 'Shonen Ark founded with vision to revolutionize anime fandom' },
    { year: '2025', event: 'Beta launch with 1,000+ early adopters and community feedback' },
    { year: 'Future', event: 'Global expansion and creator monetization platform' }
  ]

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">
      <Head>
        <title>About Us - Shonen Ark</title>
        <meta name="description" content="Learn about Shonen Ark's mission to create the ultimate fan theory and media hub for anime and manga enthusiasts." />
      </Head>

      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-900 to-indigo-900 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About Shonen Ark</h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            We're building the ultimate destination for anime and manga fans to explore theories, 
            share creations, and connect over their passion for shonen storytelling.
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-900 rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-6 text-center">🎯 Our Mission</h2>
            <p className="text-lg text-gray-300 leading-relaxed text-center mb-8">
              Shonen Ark is an AI-powered fan platform designed for deep dives, community commentary, 
              and comprehensive analysis across top anime and manga series. We believe that every 
              fan theory deserves a voice, every creative work deserves recognition, and every community 
              deserves a space to thrive. Our platform showcases high-quality AI-assisted theories, 
              fan-created animations, and immersive soundscapes, while allowing creators to build their 
              audience and monetize their passion.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <span className="text-4xl mb-4 block">🧠</span>
                <h3 className="text-xl font-bold mb-2">Theory Crafting</h3>
                <p className="text-gray-400">Analyze storylines, predict plot developments, and debate possibilities with fellow fans.</p>
              </div>
              <div className="text-center">
                <span className="text-4xl mb-4 block">🎨</span>
                <h3 className="text-xl font-bold mb-2">Creative Expression</h3>
                <p className="text-gray-400">Share fan art, animations, audio edits, and other creative works inspired by your favorite series.</p>
              </div>
              <div className="text-center">
                <span className="text-4xl mb-4 block">🌟</span>
                <h3 className="text-xl font-bold mb-2">Community First</h3>
                <p className="text-gray-400">Connect with like-minded fans, discover new creators, and be part of a passionate community.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-gray-900 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">📖 Our Story</h2>
          <div className="space-y-8">
            <p className="text-lg text-gray-300 leading-relaxed">
              Shonen Ark was born from a simple observation: anime and manga fans are incredibly creative, 
              analytical, and passionate, but they lack a dedicated platform that truly understands and 
              celebrates their unique form of fandom.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              We noticed fans scattered across various platforms—Reddit for discussions, YouTube for theories, 
              Twitter for quick takes, Discord for real-time chat. Each platform served a purpose, but none 
              were designed specifically for the depth and creativity that anime fandom deserves.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              That's why we created Shonen Ark: a unified space where fans can craft detailed theories, 
              share amazing creative works, track release schedules, and build meaningful connections 
              around their shared love for anime and manga.
            </p>
          </div>

          {/* Timeline */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-8 text-center">🚀 Our Journey</h3>
            <div className="space-y-6">
              {milestones.map((milestone, idx) => (
                <div key={idx} className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center font-bold text-lg">
                    {milestone.year}
                  </div>
                  <div className="flex-1">
                    <p className="text-lg">{milestone.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">👥 Meet the Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="bg-gray-900 rounded-2xl p-8 text-center hover:bg-gray-800 transition-colors">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
                  {member.avatar}
                </div>
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-blue-400 font-semibold mb-4">{member.role}</p>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">{member.bio}</p>
                <div className="flex justify-center gap-4">
                  <span className="text-blue-400 text-sm">🐦 {member.social.twitter}</span>
                  <span className="text-purple-400 text-sm">🔵 {member.social.discord}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="bg-gray-900 py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-8">🌐 Connect With Us</h3>
          <div className="flex justify-center gap-8 flex-wrap">
            <a href="#" className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors">
              🐦 Twitter
            </a>
            <a href="#" className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold transition-colors">
              🔵 Discord
            </a>
            <a href="#" className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold transition-colors">
              📺 YouTube
            </a>
            <a href="#" className="bg-pink-600 hover:bg-pink-700 px-6 py-3 rounded-lg font-semibold transition-colors">
              📸 Instagram
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl p-12">
            <h3 className="text-3xl font-bold mb-4">Ready to Join the Ark?</h3>
            <p className="text-xl text-gray-200 mb-8">
              Be part of the next generation of anime fandom. Create, share, and discover amazing content.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link href="/register" className="bg-white text-black px-8 py-3 rounded-lg font-bold hover:bg-gray-200 transition-colors">
                Sign Up Free
              </Link>
              <Link href="/contact" className="bg-transparent border-2 border-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-black transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
