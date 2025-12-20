import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function ErrorState({ 
  title = 'Something went wrong', 
  message = 'We encountered an error while loading the content.',
  onRetry 
}) {
  return (
    <div className="min-h-[40vh] flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md mx-auto px-4"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-accent-500/10 flex items-center justify-center"
        >
          <AlertCircle className="w-8 h-8 text-accent-500" />
        </motion.div>
        
        <h3 className="font-display text-xl font-semibold text-dark-900 dark:text-white mb-2">
          {title}
        </h3>
        
        <p className="text-dark-500 dark:text-dark-400 mb-6">
          {message}
        </p>
        
        {onRetry && (
          <motion.button
            onClick={onRetry}
            className="btn-secondary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <RefreshCw size={16} />
            Try Again
          </motion.button>
        )}
      </motion.div>
    </div>
  );
}
