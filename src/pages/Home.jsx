import { Link } from 'react-router-dom';
import { ArrowRight, Rocket, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import PageTransition, { FadeIn } from '../components/PageTransition';
import { useProfile } from '../hooks/useProfile';

export default function Home() {
  const { profile, loading, error } = useProfile();

  if (loading) return <div className="h-screen flex items-center justify-center"><p>Loading...</p></div>;
  if (error) return <div className="h-screen flex items-center justify-center"><p>Error loading profile</p></div>;
  if (!profile) return null;

  return (
    <PageTransition>
      <section className="relative min-h-screen flex items-center pt-20">
        <div className="section-container w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div className="max-w-3xl">
              <FadeIn delay={0.2}>
                <h1 className="heading-1 text-dark-900 dark:text-white mb-2">
                  Hi, I'm{' '}
                  <span className="text-primary-600">{profile.nickname}</span>
                </h1>
              </FadeIn>
              <FadeIn delay={0.3}>
                <p className="text-xl md:text-2xl text-dark-600 dark:text-dark-300 font-medium mb-4">
                  {profile.title}
                </p>
              </FadeIn>
              <FadeIn delay={0.4}>
                <p className="text-lg text-dark-500 dark:text-dark-400 mb-6 max-w-xl">
                  {profile.tagline}
                </p>
              </FadeIn>
              <FadeIn delay={0.5}>
                <div className="flex flex-wrap gap-4">
                  <Link to="/projects" className="btn-primary">
                    <Rocket size={18} />
                    View My Work
                  </Link>
                  <Link to="/blog" className="btn-secondary">
                    Read my blogs
                  </Link>
                  <a 
                    href="/data/Puneet.pdf" 
                    download="Puneet_Singh_Resume.pdf"
                    className="btn-secondary"
                  >
                    <FileText size={18} />
                    Download Resume
                  </a>
                  <Link to="/about" className="btn-ghost">
                    Learn About Me
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </FadeIn>
            </div>

            {/* Right: Profile Picture */}
            <FadeIn delay={0.6}>
              <motion.div
                className="relative flex justify-center lg:justify-end"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <div className="relative w-80 h-80 md:w-96 md:h-96">
                  {/* Gradient background circle */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 blur-2xl" />
                  
                  {/* Image container */}
                  <motion.div
                    className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-primary-500/30 shadow-2xl"
                    whileHover={{ scale: 1.02, borderColor: "rgb(var(--color-primary-500))" }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src="/data/puneet-nb.jpg"
                      alt={profile.name}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                  {/* Floating accent elements */}
                  <motion.div
                    className="absolute -top-4 -right-4 w-20 h-20 bg-accent-500/10 rounded-full"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute -bottom-4 -left-4 w-24 h-24 bg-primary-500/10 rounded-full"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 5, repeat: Infinity }}
                  />
                </div>
              </motion.div>
            </FadeIn>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
