import { useState } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    accountType: 'fan',
    agreeToTerms: false,
    subscribeNewsletter: true
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts fixing it
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.username) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      // Simulate registration
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Registration successful:', formData);
      
      // Redirect based on account type
      if (formData.accountType === 'creator') {
        router.push('/account/onboarding');
      } else {
        router.push('/account/fan');
      }
    } catch (error) {
      setErrors({ general: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const accountTypes = [
    {
      id: 'fan',
      title: 'Fan Account',
      description: 'Follow creators, bookmark content, join discussions',
      icon: '🌟',
      features: ['Follow creators', 'Bookmark theories', 'Comment & discuss', 'Personal library'],
      price: 'Free'
    },
    {
      id: 'creator',
      title: 'Creator Account',
      description: 'Upload content, build audience, earn revenue',
      icon: '🎬',
      features: ['Upload content', 'Analytics dashboard', 'Subscriber management', 'Monetization tools'],
      price: '$4/month'
    }
  ];

  return (
    <>
      <Head>
        <title>Sign Up - Shonen Ark</title>
        <meta name="description" content="Join the Shonen Ark community and start your anime journey today." />
      </Head>

  <div className="min-h-screen transition-colors dark:bg-gradient-to-b dark:from-black dark:to-purple-900 dark:text-white py-12 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-6xl mb-4">⛩️</div>
            <h1 className="text-3xl font-bold mystical-title mb-2">
              Join Shonen Ark
            </h1>
            <p className="text-grey brush-font">
              Begin your mystical anime journey
            </p>
          </motion.div>

          {/* Progress Bar */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="flex items-center justify-center space-x-4">
              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold ${
                step >= 1 ? 'bg-purple border-purple text-white' : 'border-purple/30 text-purple'
              }`}>
                1
              </div>
              <div className={`w-16 h-1 ${step >= 2 ? 'bg-purple' : 'bg-purple/30'}`}></div>
              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold ${
                step >= 2 ? 'bg-purple border-purple text-white' : 'border-purple/30 text-purple'
              }`}>
                2
              </div>
            </div>
            <div className="flex justify-between mt-2 text-sm text-grey">
              <span>Account Details</span>
              <span>Account Type</span>
            </div>
          </motion.div>

          {/* Form Container */}
          <motion.div 
            className="bg-white dark:bg-dark-purple/20 p-8 rounded-xl border border-purple/30 backdrop-blur-sm transition-colors"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {step === 1 ? (
              // Step 1: Account Details
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-2xl font-bold mb-6 text-purple">Create Your Account</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email Field */}
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
                      className={`w-full dark:bg-black/50 dark:text-white border ${errors.email ? 'border-red-500' : 'border-purple/30'} px-4 py-3 rounded-lg focus:outline-none focus:border-purple focus:ring-2 focus:ring-purple/20 transition-all`}
                      placeholder="Enter your email"
                      required
                    />
                    {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                  </div>

                  {/* Username */}
                  <div>
                    <label htmlFor="username" className="block text-sm font-medium text-purple mb-2">
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className={`w-full dark:bg-black/50 dark:text-white border ${errors.username ? 'border-red-500' : 'border-purple/30'} px-4 py-3 rounded-lg focus:outline-none focus:border-purple focus:ring-2 focus:ring-purple/20 transition-all`}
                      placeholder="Choose a username"
                      required
                    />
                    {errors.username && <p className="text-red-400 text-sm mt-1">{errors.username}</p>}
                  </div>

                  {/* Password */}
                  <div className="grid md:grid-cols-2 gap-4">
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
                        className={`w-full dark:bg-black/50 dark:text-white border ${errors.password ? 'border-red-500' : 'border-purple/30'} px-4 py-3 rounded-lg focus:outline-none focus:border-purple focus:ring-2 focus:ring-purple/20 transition-all`}
                        placeholder="Create password"
                        required
                      />
                      {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
                    </div>
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-purple mb-2">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className={`w-full dark:bg-black/50 dark:text-white border ${errors.confirmPassword ? 'border-red-500' : 'border-purple/30'} px-4 py-3 rounded-lg focus:outline-none focus:border-purple focus:ring-2 focus:ring-purple/20 transition-all`}
                        placeholder="Confirm password"
                        required
                      />
                      {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
                    </div>
                  </div>
                </form>
              </motion.div>
            ) : (
              // Step 2: Account Type Selection
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-2xl font-bold mb-6 text-purple">Choose Your Journey</h2>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  {accountTypes.map((type) => (
                    <motion.div
                      key={type.id}
                      className={`border-2 rounded-xl p-6 cursor-pointer transition-all ${
                        formData.accountType === type.id
                          ? 'border-purple bg-purple/10'
                          : 'border-purple/30 hover:border-purple/50'
                      }`}
                      onClick={() => setFormData(prev => ({ ...prev, accountType: type.id }))}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-3xl">{type.icon}</div>
                        <div className={`w-6 h-6 rounded-full border-2 ${
                          formData.accountType === type.id
                            ? 'border-purple bg-purple'
                            : 'border-purple/30'
                        }`}>
                          {formData.accountType === type.id && (
                            <div className="w-full h-full flex items-center justify-center text-white text-xs">
                              ✓
                            </div>
                          )}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{type.title}</h3>
                      <p className="text-grey text-sm mb-4">{type.description}</p>
                      <div className="space-y-2 mb-4">
                        {type.features.map((feature, index) => (
                          <div key={index} className="flex items-center text-sm text-grey">
                            <span className="text-purple mr-2">✓</span>
                            {feature}
                          </div>
                        ))}
                      </div>
                      <div className="text-purple font-bold">{type.price}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Terms and Newsletter */}
                <div className="space-y-4">
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-purple bg-black/50 border-purple/30 rounded focus:ring-purple focus:ring-2 mt-1"
                    />
                    <span className="ml-3 text-sm text-grey">
                      I agree to the{' '}
                      <Link href="/terms" className="text-purple hover:text-white transition-colors">
                        Terms and Conditions
                      </Link>{' '}
                      and{' '}
                      <Link href="/privacy" className="text-purple hover:text-white transition-colors">
                        Privacy Policy
                      </Link>
                    </span>
                  </label>
                  {errors.agreeToTerms && <p className="text-red-400 text-sm">{errors.agreeToTerms}</p>}

                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      name="subscribeNewsletter"
                      checked={formData.subscribeNewsletter}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-purple bg-black/50 border-purple/30 rounded focus:ring-purple focus:ring-2 mt-1"
                    />
                    <span className="ml-3 text-sm text-grey">
                      Subscribe to our newsletter for anime updates and exclusive content
                    </span>
                  </label>
                </div>
              </motion.div>
            )}

            {/* Error Message */}
            {errors.general && (
              <motion.div 
                className="bg-red-500/20 border border-red-500/30 text-red-300 px-4 py-3 rounded-lg text-sm mt-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {errors.general}
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {step > 1 ? (
                <button
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-3 border border-purple/30 text-purple hover:bg-purple/10 rounded-lg transition-colors"
                >
                  Back
                </button>
              ) : (
                <div></div>
              )}

              <button
                onClick={handleNextStep}
                disabled={isLoading}
                className="px-8 py-3 bg-gradient-to-r from-purple to-dark-purple text-white rounded-lg hover:shadow-lg hover:shadow-purple/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {isLoading ? (
                  <motion.div
                    className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                ) : step === 1 ? (
                  'Continue'
                ) : (
                  'Create Account'
                )}
              </button>
            </div>
          </motion.div>

          {/* Login Link */}
          <motion.div 
            className="text-center mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <p className="text-grey">
              Already have an account?{' '}
              <Link href="/login" className="text-purple hover:text-white transition-colors font-medium">
                Sign in here
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
        </div>
      </div>
    </>
  );
}
