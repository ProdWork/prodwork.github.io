import { motion } from 'framer-motion';

export default function SectionHeader({ 
  badge, 
  title, 
  subtitle, 
  centered = true,
  className = '' 
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`mb-12 ${centered ? 'text-center' : ''} ${className}`}
    >
      {badge && (
        <motion.span 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 dark:bg-primary-950/50 text-primary-600 dark:text-primary-400 text-sm font-medium mb-4"
        >
          {badge}
        </motion.span>
      )}
      
      <h2 className="heading-2 text-dark-900 dark:text-white mb-4">
        {title}
      </h2>
      
      {subtitle && (
        <p className={`text-dark-500 dark:text-dark-400 text-lg ${centered ? 'max-w-2xl mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
