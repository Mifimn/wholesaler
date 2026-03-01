import { motion } from 'framer-motion';

export default function GlowSkeleton({ className = '' }) {
  return (
    <motion.div
      className={`relative rounded-xl border border-tech-primary/30 bg-tech-base/50 overflow-hidden ${className}`}
      initial={{ opacity: 0.5, boxShadow: '0 0 0px rgba(249, 115, 22, 0)' }}
      animate={{ 
        opacity: [0.5, 1, 0.5],
        boxShadow: [
          'inset 0 0 0px rgba(249, 115, 22, 0)',
          'inset 0 0 15px rgba(249, 115, 22, 0.2)',
          'inset 0 0 0px rgba(249, 115, 22, 0)'
        ]
      }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    >
      <motion.div 
        className="absolute inset-0 w-full h-full bg-gradient-to-b from-transparent via-tech-primary/10 to-transparent"
        animate={{ y: ['-100%', '100%'] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>
  );
}
