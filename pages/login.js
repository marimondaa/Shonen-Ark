'use client';

import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardContent, CardFooter } from '../components/Card';
import { Button } from '../components/Button';
import { Mail, Lock, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Login failed');
        return;
      }

      // Success: redirect to dashboard
      router.push('/account/fan');
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Login - Shonen Ark</title>
        <meta name="description" content="Sign in to your Shonen Ark account." />
      </Head>

      <div className="min-h-screen bg-dark-bg flex items-center justify-center py-12 px-4 mt-16">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <h1 className="text-3xl font-display font-bold">Welcome Back</h1>
              <p className="text-text-secondary mt-2">Sign in to your account to continue</p>
            </CardHeader>

            <CardContent>
              {error && (
                <motion.div
                  className="mb-6 p-4 bg-error/10 border border-error rounded-lg flex gap-3"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AlertCircle className="text-error flex-shrink-0" size={20} />
                  <p className="text-error text-sm">{error}</p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 text-text-muted" size={18} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="pl-10 w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all duration-200"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 text-text-muted" size={18} />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="pl-10 w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all duration-200"
                      required
                    />
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="w-4 h-4 accent-brand-primary"
                  />
                  <label htmlFor="remember" className="ml-2 text-sm text-text-secondary">
                    Remember me
                  </label>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="md"
                  isLoading={isLoading}
                  className="w-full"
                >
                  Sign In
                </Button>
              </form>
            </CardContent>

            <CardFooter className="flex flex-col gap-4">
              <p className="text-sm text-text-secondary text-center">
                Don&apos;t have an account?{' '}
                <Link href="/register" className="text-brand-primary hover:text-brand-secondary font-medium">
                  Sign up
                </Link>
              </p>
              <Link href="/forgot-password" className="text-sm text-text-secondary hover:text-brand-primary text-center">
                Forgot password?
              </Link>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </>
  );
}
