import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Linkedin, 
  Twitter, 
  Github, 
  Mail, 
  MapPin,
  Heart,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';

const footerLinks = {
  navigation: [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Blog', path: '/blog' },
    { name: 'Achievements', path: '/achievements' },
  ],
  social: [
    { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com/in/puneetsingh' },
    { name: 'Twitter', icon: Twitter, url: 'https://twitter.com/puneetsingh' },
    { name: 'GitHub', icon: Github, url: 'https://github.com/puneetsingh' },
    { name: 'Email', icon: Mail, url: 'mailto:puneet@example.com' },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-dark-200 dark:border-dark-800">
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand section */}
          <div className="md:col-span-5">
            <Link to="/" className="inline-flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-primary-500 flex items-center justify-center shadow-lg shadow-primary-500/25">
                <span className="text-white font-display font-bold text-lg">P</span>
              </div>
              <span className="font-display font-semibold text-dark-900 dark:text-white text-lg">
                Puneet Singh
              </span>
            </Link>
            <p className="text-dark-500 dark:text-dark-400 mb-6 max-w-sm">
              Product & Platform Strategy Executive building products that scale, 
              teams that thrive, and strategies that ship.
            </p>
            <div className="flex items-center gap-2 text-sm text-dark-500 dark:text-dark-400">
              <MapPin size={14} />
              <span>India</span>
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3">
            <h4 className="font-display font-semibold text-dark-900 dark:text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-dark-500 dark:text-dark-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight 
                      size={14} 
                      className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="md:col-span-4">
            <h4 className="font-display font-semibold text-dark-900 dark:text-white mb-4">
              Let's Connect
            </h4>
            <p className="text-dark-500 dark:text-dark-400 text-sm mb-4">
              Open to advisory roles, speaking opportunities, and interesting conversations.
            </p>
            <div className="flex gap-2">
              {footerLinks.social.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-dark-100 dark:bg-dark-800 text-dark-600 dark:text-dark-300 hover:bg-primary-50 dark:hover:bg-primary-950/50 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.name}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-dark-200 dark:border-dark-800 flex flex-col sm:flex-row items-center justify-between gap-4">
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
