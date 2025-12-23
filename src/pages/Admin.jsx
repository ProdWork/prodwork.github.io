import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Briefcase, 
  BookOpen, 
  Save, 
  RefreshCw, 
  Check, 
  AlertCircle,
  ChevronDown,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';
import PageTransition from '../components/PageTransition';
import SectionHeader from '../components/SectionHeader';
import { FadeIn } from '../components/PageTransition';

const API_BASE = 'http://localhost:5000/api';

// Simple password protection (in production, use proper auth)
const ADMIN_PASSWORD = 'puneet123';

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'projects', label: 'Projects', icon: Briefcase },
  { id: 'blogs', label: 'Blogs', icon: BookOpen },
];

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  
  const [activeTab, setActiveTab] = useState('profile');
  const [data, setData] = useState({
    profile: null,
    projects: null,
    blogs: null,
  });
  const [editedData, setEditedData] = useState({
    profile: '',
    projects: '',
    blogs: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setAuthError('');
      localStorage.setItem('adminAuth', 'true');
    } else {
      setAuthError('Incorrect password');
    }
  };

  useEffect(() => {
    // Check if already authenticated
    if (localStorage.getItem('adminAuth') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchAllData();
    }
  }, [isAuthenticated]);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [profile, projects, blogs] = await Promise.all([
        fetch(`${API_BASE}/profile`).then(r => r.json()),
        fetch(`${API_BASE}/projects`).then(r => r.json()),
        fetch(`${API_BASE}/blogs`).then(r => r.json()),
      ]);
      
      const newData = { profile, projects, blogs };
      setData(newData);
      setEditedData({
        profile: JSON.stringify(profile, null, 2),
        projects: JSON.stringify(projects, null, 2),
        blogs: JSON.stringify(blogs, null, 2),
      });
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to load data' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setStatus({ type: '', message: '' });

    try {
      // Validate JSON
      const parsedData = JSON.parse(editedData[activeTab]);
      
      const response = await fetch(`${API_BASE}/admin/${activeTab}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedData),
      });

      if (response.ok) {
        setStatus({ type: 'success', message: `${activeTab} saved successfully!` });
        setData(prev => ({ ...prev, [activeTab]: parsedData }));
      } else {
        const error = await response.json();
        setStatus({ type: 'error', message: error.message || 'Failed to save' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Invalid JSON format' });
    } finally {
      setSaving(false);
      setTimeout(() => setStatus({ type: '', message: '' }), 3000);
    }
  };

  const handleReset = () => {
    setEditedData(prev => ({
      ...prev,
      [activeTab]: JSON.stringify(data[activeTab], null, 2)
    }));
    setStatus({ type: '', message: '' });
  };

  const formatJSON = () => {
    try {
      const parsed = JSON.parse(editedData[activeTab]);
      setEditedData(prev => ({
        ...prev,
        [activeTab]: JSON.stringify(parsed, null, 2)
      }));
    } catch (error) {
      setStatus({ type: 'error', message: 'Cannot format: Invalid JSON' });
    }
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <PageTransition>
        <section className="min-h-screen flex items-center justify-center pt-20 pb-16">
          <FadeIn>
            <motion.div 
              className="w-full max-w-md p-8 rounded-2xl bg-white dark:bg-dark-800 shadow-xl border border-dark-200 dark:border-dark-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary-600 to-primary-500 flex items-center justify-center">
                  <Lock className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-2xl font-display font-bold text-dark-900 dark:text-white">
                  Admin Access
                </h1>
                <p className="text-dark-500 dark:text-dark-400 mt-2">
                  Enter password to manage your content
                </p>
              </div>

              <form onSubmit={handleLogin}>
                <div className="relative mb-4">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full px-4 py-3 pr-12 rounded-xl border border-dark-200 dark:border-dark-600 bg-dark-50 dark:bg-dark-700 text-dark-900 dark:text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-400 hover:text-dark-600 dark:hover:text-dark-300"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                {authError && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mb-4 flex items-center gap-2"
                  >
                    <AlertCircle size={16} />
                    {authError}
                  </motion.p>
                )}

                <motion.button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 text-white font-semibold shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Access Dashboard
                </motion.button>
              </form>

              <p className="text-center text-dark-400 text-sm mt-6">
                Default password: <code className="px-2 py-1 rounded bg-dark-100 dark:bg-dark-700">puneet123</code>
              </p>
            </motion.div>
          </FadeIn>
        </section>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <section className="pt-32 pb-16">
        <div className="section-container">
          <SectionHeader
            badge="Admin Panel"
            title="Content Editor"
            subtitle="Edit your website content directly. Changes are saved to the server."
          />

          {/* Tabs */}
          <FadeIn delay={0.1}>
            <div className="flex flex-wrap gap-2 mb-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all ${
                      activeTab === tab.id
                        ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/25'
                        : 'bg-dark-100 dark:bg-dark-800 text-dark-600 dark:text-dark-300 hover:bg-dark-200 dark:hover:bg-dark-700'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon size={18} />
                    {tab.label}
                  </motion.button>
                );
              })}
            </div>
          </FadeIn>

          {/* Editor */}
          <FadeIn delay={0.2}>
            <div className="bg-white dark:bg-dark-800 rounded-2xl border border-dark-200 dark:border-dark-700 overflow-hidden shadow-xl">
              {/* Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 border-b border-dark-200 dark:border-dark-700 bg-dark-50 dark:bg-dark-900/50">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-dark-600 dark:text-dark-300">
                    Editing: <span className="text-primary-600 dark:text-primary-400 capitalize">{activeTab}.json</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <motion.button
                    onClick={formatJSON}
                    className="px-3 py-1.5 rounded-lg text-sm font-medium bg-dark-100 dark:bg-dark-700 text-dark-600 dark:text-dark-300 hover:bg-dark-200 dark:hover:bg-dark-600 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Format JSON
                  </motion.button>
                  <motion.button
                    onClick={handleReset}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-dark-100 dark:bg-dark-700 text-dark-600 dark:text-dark-300 hover:bg-dark-200 dark:hover:bg-dark-600 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <RefreshCw size={16} />
                    Reset
                  </motion.button>
                  <motion.button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium bg-primary-600 text-white hover:bg-primary-700 transition-colors disabled:opacity-50"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {saving ? (
                      <RefreshCw size={16} className="animate-spin" />
                    ) : (
                      <Save size={16} />
                    )}
                    {saving ? 'Saving...' : 'Save Changes'}
                  </motion.button>
                </div>
              </div>

              {/* Status Message */}
              <AnimatePresence>
                {status.message && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`px-4 py-3 flex items-center gap-2 text-sm font-medium ${
                      status.type === 'success' 
                        ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                        : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                    }`}
                  >
                    {status.type === 'success' ? <Check size={18} /> : <AlertCircle size={18} />}
                    {status.message}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* JSON Editor */}
              {loading ? (
                <div className="p-8 text-center">
                  <RefreshCw className="w-8 h-8 mx-auto animate-spin text-primary-500" />
                  <p className="mt-4 text-dark-500">Loading data...</p>
                </div>
              ) : (
                <textarea
                  value={editedData[activeTab]}
                  onChange={(e) => setEditedData(prev => ({ ...prev, [activeTab]: e.target.value }))}
                  className="w-full h-[600px] p-4 font-mono text-sm bg-dark-900 text-green-400 focus:outline-none resize-none"
                  spellCheck={false}
                />
              )}
            </div>
          </FadeIn>

          {/* Help Section */}
          <FadeIn delay={0.3}>
            <div className="mt-8 p-6 rounded-2xl bg-dark-50 dark:bg-dark-800/50 border border-dark-200 dark:border-dark-700">
              <h3 className="text-lg font-semibold text-dark-900 dark:text-white mb-4">
                Quick Tips
              </h3>
              <ul className="space-y-2 text-sm text-dark-600 dark:text-dark-400">
                <li>• Make sure your JSON is valid before saving. Use the "Format JSON" button to auto-format.</li>
                <li>• Changes are saved directly to the server. Refresh the main site to see updates.</li>
                <li>• For images, use URLs from image hosting services or place files in the public folder.</li>
                <li>• Each blog post needs a unique "slug" for its URL (e.g., "my-first-post").</li>
                <li>• Each project needs a unique "id" (e.g., "project-1", "my-awesome-app").</li>
              </ul>
            </div>
          </FadeIn>

          {/* Logout Button */}
          <FadeIn delay={0.4}>
            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  localStorage.removeItem('adminAuth');
                  setIsAuthenticated(false);
                  setPassword('');
                }}
                className="text-sm text-dark-500 hover:text-red-500 transition-colors"
              >
                Logout from Admin Panel
              </button>
            </div>
          </FadeIn>
        </div>
      </section>
    </PageTransition>
  );
}
