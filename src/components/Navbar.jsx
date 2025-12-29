import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Home, 
  User, 
  Briefcase, 
  BookOpen,
  Sparkles
} from 'lucide-react';
import { fetchSocial } from '../services/api';

const iconMap = {
  Linkedin: 'Linkedin',
  Twitter: 'Twitter',
  Mail: 'Mail',
  BookOpen: 'BookOpen'
};

const navItems = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'About', path: '/about', icon: User },
  { name: 'Projects', path: '/projects', icon: Briefcase },
  { name: 'Blog', path: '/blog', icon: BookOpen },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [socialLinks, setSocialLinks] = useState([]);
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    fetchSocial()
      .then(data => {
        setSocialLinks(data.social);
      })
      .catch(err => console.error('Failed to load social links:', err));
  }, []);  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'py-3 glass shadow-lg' 
          : 'py-5 bg-transparent'
      }`}
    >
      <nav className="section-container">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 group"
          >
            <motion.div 
              className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-primary-500 flex items-center justify-center shadow-lg shadow-primary-500/25"
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-white font-display font-bold text-lg">P</span>
              <motion.div 
                className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-accent-500"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            <div className="hidden sm:block">
              <span className="font-display font-semibold text-dark-900 dark:text-white">
                Puneet
              </span>
              <span className="text-dark-400 dark:text-dark-500 font-medium ml-1">
                Singh
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  relative px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200
                  ${isActive 
                    ? 'text-primary-600 dark:text-primary-400' 
                    : 'text-dark-600 dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400'
                  }
                `}
              >
                {({ isActive }) => (
                  <>
                    {item.name}
                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute inset-0 bg-primary-50 dark:bg-primary-950/50 rounded-lg -z-10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <motion.button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-dark-100 dark:bg-dark-800 text-dark-600 dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                {isDark ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun size={18} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon size={18} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Social Links (Desktop) */}
            <div className="hidden md:flex items-center gap-2">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-dark-100 dark:bg-dark-800 text-dark-600 dark:text-dark-300 hover:bg-primary-50 dark:hover:bg-primary-950/50 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.name}
                  title={social.name}
                >
                  {social.name === 'LinkedIn' && (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
                    </svg>
                  )}
                  {social.name === 'Resume' && (
                    <BookOpen size={16} />
                  )}
                  {social.name === 'Email' && (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  )}
                </motion.a>
              ))}
            </div>

            {/* Mobile menu button */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2.5 rounded-xl bg-dark-100 dark:bg-dark-800 text-dark-600 dark:text-dark-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 overflow-hidden"
            >
              <div className="glass-card p-4 space-y-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => `
                        flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200
                        ${isActive 
                          ? 'bg-primary-50 dark:bg-primary-950/50 text-primary-600 dark:text-primary-400' 
                          : 'text-dark-600 dark:text-dark-300 hover:bg-dark-100 dark:hover:bg-dark-800'
                        }
                      `}
                    >
                      <item.icon size={18} />
                      {item.name}
                    </NavLink>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.05 }}
                  className="pt-2"
                >
                  <Link to="/about" className="btn-primary w-full text-sm">
                    <Sparkles size={16} />
                    Let's Connect
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
