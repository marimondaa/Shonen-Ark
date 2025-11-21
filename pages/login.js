import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../src/lib/hooks/useAuth';

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, isLoading: authLoading } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated()) {
      router.push('/account/fan');
    }
  }, [isAuthenticated, router]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (error) setError(''); // Clear error when user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await login(formData.email, formData.password);

      if (result.success) {
        console.log('Login successful:', result.user);
        router.push('/account/fan'); // Redirect to dashboard
      } else {
        setError(result.error || 'Login failed. Try admin/admin for demo access.');
      }
    } catch (error) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-accent-pink">Loading...</div>
      </div>
    );
  }

  const socialLogins = [
    { name: 'Google', icon: '🌐', color: 'from-red-500 to-red-600' },
    { name: 'Discord', icon: '💬', color: 'from-indigo-500 to-purple-600' },
    { name: 'Twitter', icon: '🐦', color: 'from-blue-400 to-blue-500' }
  ];

  return (
    <>
      <Head>
        <title>Login - Shonen Ark</title>
        <meta name="description" content="Sign in to your Shonen Ark account and access exclusive content." />
      </Head>

      <div className="min-h-screen transition-colors dark:bg-gradient-to-b dark:from-black dark:to-purple-900 dark:text-white flex items-center justify-center py-12 px-4">
        <motion.div
          className="max-w-md w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="text-6xl mb-4">🏯</div>
            <h1 className="text-3xl font-bold mystical-title mb-2">
              Welcome Back
            </h1>
            <p className="text-grey brush-font">
              Sign in to continue your anime journey
            </p>
          </motion.div>

          {/* Login Form */}
          <motion.div
            className="bg-shadow-dark p-8 border border-electric-purple/30 backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {/* Info Note */}
            <div className="bg-electric-purple/10 border border-electric-purple/30 p-4 mb-6">
              <p className="text-sm text-ash-white">
                Use your Supabase account credentials to sign in.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-electric-purple mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-void-black text-ash-white border border-electric-purple/30 px-4 py-3 focus:outline-none focus:border-electric-purple focus:ring-2 focus:ring-electric-purple/20 transition-all"
                  placeholder="your@email.com"
                  required
                />
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-electric-purple mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full bg-void-black text-ash-white border border-electric-purple/30 px-4 py-3 focus:outline-none focus:border-electric-purple focus:ring-2 focus:ring-electric-purple/20 transition-all"
                  placeholder="Your password"
                  required
                />
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-purple bg-white dark:bg-black/50 border-purple/30 rounded focus:ring-purple focus:ring-2"
                  />
                  <span className="ml-2 text-sm text-grey">Remember me</span>
                </label>
                <Link href="/forgot-password" className="text-sm text-purple hover:text-white transition-colors">
                  Forgot password?
                </Link>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  className="bg-red-500/20 border border-red-500/30 text-red-300 px-4 py-3 rounded-lg text-sm"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {error}
                </motion.div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple to-dark-purple text-white py-3 rounded-lg hover:shadow-lg hover:shadow-purple/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <motion.div
                    className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-purple/30"></div>
              <span className="px-4 text-sm text-grey">or continue with</span>
              <div className="flex-1 border-t border-purple/30"></div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-3 gap-3">
              {socialLogins.map((social, index) => (
                <motion.button
                  key={social.name}
                  className={`bg-gradient-to-r ${social.color} p-3 rounded-lg hover:shadow-lg transition-all flex items-center justify-center`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                >
                  <span className="text-xl">{social.icon}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Sign Up Link */}
          <motion.div
            className="text-center mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <p className="text-grey">
              Don't have an account?{' '}
              <Link href="/register" className="text-purple hover:text-white transition-colors font-medium">
                Sign up here
              </Link>
            </p>
          </motion.div>

          {/* Back to Home */}
          <motion.div
            className="text-center mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <Link href="/" className="text-sm text-grey hover:text-purple transition-colors">
              ← Back to Home
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
