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
            className="bg-white dark:bg-dark-purple/20 p-8 rounded-xl border border-purple/30 backdrop-blur-sm transition-colors"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-purple mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-black/70 text-white border border-purple/30 px-4 py-3 rounded-lg focus:outline-none focus:border-purple focus:ring-2 focus:ring-purple/20 transition-all placeholder-gray-500"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-purple mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full bg-black/70 text-white border border-purple/30 px-4 py-3 rounded-lg focus:outline-none focus:border-purple focus:ring-2 focus:ring-purple/20 transition-all placeholder-gray-500"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-purple bg-black/50 border-purple/30 rounded focus:ring-purple focus:ring-2"
                  />
                  <span className="ml-2 text-sm text-grey">Remember me</span>
                </label>
                <Link href="/forgot-password" className="text-sm text-purple hover:text-white transition-colors">
                  Forgot password?
                </Link>
              </div>

              {error && (
                <motion.div
                  className="bg-red-500/20 border border-red-500/30 text-red-300 px-4 py-3 rounded-lg text-sm"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {error}
                </motion.div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-8 py-3 bg-gradient-to-r from-purple to-dark-purple text-white rounded-lg hover:shadow-lg hover:shadow-purple/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-bold"
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

            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-purple/30"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-void-black text-grey">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                {socialLogins.map((provider) => (
                  <button
                    key={provider.name}
                    className="flex justify-center items-center py-2 px-4 border border-purple/30 rounded-lg hover:bg-purple/10 transition-colors"
                  >
                    <span className="text-xl">{provider.icon}</span>
                  </button>
                ))}
              </div>
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
              Don&apos;t have an account?{' '}
              <Link href="/register" className="text-purple hover:text-white transition-colors font-medium">
                Create one now
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
