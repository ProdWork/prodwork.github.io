import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export default function LoadingSpinner({ size = 'default', text = 'Loading...' }) {
  const sizeClasses = {
    small: 'w-4 h-4',
    default: 'w-8 h-8',
    large: 'w-12 h-12',
  };

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <Loader2 className={`${sizeClasses[size]} text-primary-500`} />
      </motion.div>
      {text && (
        <p className="mt-4 text-sm text-dark-500 dark:text-dark-400">{text}</p>
      )}
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <motion.div
          className="relative w-16 h-16 mx-auto mb-4"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute inset-0 rounded-full border-4 border-primary-100 dark:border-primary-900" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary-500" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-dark-500 dark:text-dark-400"
        >
          Loading amazing content...
        </motion.p>
      </div>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="glass-card p-6 animate-pulse">
      <div className="w-12 h-12 bg-dark-200 dark:bg-dark-700 rounded-xl mb-4" />
      <div className="h-4 bg-dark-200 dark:bg-dark-700 rounded w-3/4 mb-3" />
      <div className="h-3 bg-dark-200 dark:bg-dark-700 rounded w-full mb-2" />
      <div className="h-3 bg-dark-200 dark:bg-dark-700 rounded w-5/6 mb-4" />
      <div className="flex gap-2">
        <div className="h-6 w-16 bg-dark-200 dark:bg-dark-700 rounded" />
        <div className="h-6 w-16 bg-dark-200 dark:bg-dark-700 rounded" />
        <div className="h-6 w-16 bg-dark-200 dark:bg-dark-700 rounded" />
      </div>
    </div>
  );
}

export function SkeletonBlogCard() {
  return (
    <div className="glass-card p-6 animate-pulse">
      <div className="flex gap-3 mb-3">
        <div className="h-4 w-24 bg-dark-200 dark:bg-dark-700 rounded" />
        <div className="h-4 w-16 bg-dark-200 dark:bg-dark-700 rounded" />
      </div>
      <div className="h-5 bg-dark-200 dark:bg-dark-700 rounded w-full mb-2" />
      <div className="h-5 bg-dark-200 dark:bg-dark-700 rounded w-4/5 mb-4" />
      <div className="h-3 bg-dark-200 dark:bg-dark-700 rounded w-full mb-2" />
      <div className="h-3 bg-dark-200 dark:bg-dark-700 rounded w-full mb-2" />
      <div className="h-3 bg-dark-200 dark:bg-dark-700 rounded w-3/4" />
    </div>
  );
}
