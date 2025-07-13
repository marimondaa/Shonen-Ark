import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const PaymentsModal = ({ isOpen, onClose }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      id: 'fan',
      name: 'Fan Explorer',
      price: 'Free',
      description: 'Join the community, read theories, and engage with content',
      features: ['Access to all theories', 'Comment and vote', 'Basic profile', 'Community discussions'],
      color: 'forest-accent',
      glow: 'forest-glow-shadow'
    },
    {
      id: 'creator',
      name: 'Creator Tier',
      price: '$2/mo',
      description: 'Post, earn, grow your fandom',
      features: ['Everything in Fan', 'Post theories & content', 'Earn from engagement', 'Creator analytics', 'Priority support'],
      color: 'violet-glow',
      glow: 'violet-glow-shadow',
      popular: true
    },
    {
      id: 'sensei',
      name: 'Sensei Master',
      price: '$5/mo',
      description: 'Lead the community with exclusive tools',
      features: ['Everything in Creator', 'Exclusive badges', 'Early access features', 'Community moderation', 'Monthly creator calls'],
      color: 'accent-pink',
      glow: 'glow-pink'
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-ink-black/80 backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal Content */}
          <motion.div
            className="relative bg-sumi-gray border border-line-highlight rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto ukiyo-overlay"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="text-center mb-8">
              <motion.h2
                className="text-4xl font-mystical text-parchment mb-4 ink-brush-edge"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Choose Your Path
              </motion.h2>
              <p className="text-stone-wash text-lg font-brush">
                Unlock your potential in the Shonen Ark community
              </p>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-stone-wash/20 hover:bg-stone-wash/40 text-parchment transition-colors"
            >
              ✕
            </button>

            {/* Plan Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              {plans.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  className={`relative bg-ink-black border-2 ${
                    selectedPlan === plan.id ? 'border-violet-glow' : 'border-line-highlight/30'
                  } hover:border-${plan.color} text-parchment p-6 rounded-2xl cursor-pointer transition-all duration-300 group`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {/* Popular Badge */}
                  {plan.popular && (
                    <motion.div
                      className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-violet-glow text-ink-black px-4 py-1 rounded-full text-sm font-bold"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Most Popular
                    </motion.div>
                  )}

                  {/* Plan Header */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-mystical mb-2">{plan.name}</h3>
                    <div className="text-3xl font-bold text-violet-glow mb-2">{plan.price}</div>
                    <p className="text-stone-wash text-sm">{plan.description}</p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm">
                        <motion.div
                          className="w-2 h-2 bg-forest-accent rounded-full mr-3 flex-shrink-0"
                          whileHover={{ scale: 1.2 }}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Subscribe Button */}
                  <motion.button
                    className={`w-full bg-${plan.color} hover:bg-violet-glow text-parchment px-4 py-3 rounded-lg font-mystical transition-all duration-300 shrine-glow`}
                    whileHover={{ boxShadow: `var(--${plan.glow})` }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {plan.price === 'Free' ? 'Get Started' : 'Subscribe'}
                  </motion.button>

                  {/* Hover Glow Effect */}
                  <motion.div
                    className={`absolute inset-0 bg-${plan.color} rounded-2xl opacity-0 pointer-events-none`}
                    whileHover={{ opacity: 0.05 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <motion.div
              className="text-center mt-8 pt-6 border-t border-line-highlight/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <p className="text-stone-wash text-sm font-mono">
                All plans include access to the mystical Shonen Ark community
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PaymentsModal;
