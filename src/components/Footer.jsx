import { Heart, Sparkles } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-dark-200 dark:border-dark-800">
      <div className="section-container py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-dark-500 dark:text-dark-400 flex items-center gap-1">
            © {currentYear} Puneet Singh. Crafted with 
            <Heart size={14} className="text-accent-500 inline" fill="currentColor" />
            and lots of ☕
          </p>
          <div className="flex items-center gap-2 text-sm text-dark-500 dark:text-dark-400">
            <Sparkles size={14} className="text-primary-500" />
            <span>Building the future, one product at a time</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
