import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Sparkles, 
  Code2, 
  Lightbulb, 
  Rocket,
  BookOpen,
  Award,
  ChevronRight,
  MousePointerClick,
  Zap,
  Target,
  Users
} from 'lucide-react';
import PageTransition, { FadeIn, StaggerContainer, StaggerItem } from '../components/PageTransition';
import ProjectCard from '../components/ProjectCard';
import BlogCard from '../components/BlogCard';
import AchievementCard from '../components/AchievementCard';
import { PageLoader } from '../components/LoadingSpinner';
import ErrorState from '../components/ErrorState';
import { fetchProfile, fetchProjects, fetchBlogs, fetchAchievements } from '../services/api';

export default function Home() {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [profileData, projectsData, blogsData, achievementsData] = await Promise.all([
          fetchProfile(),
          fetchProjects(),
          fetchBlogs(),
          fetchAchievements()
        ]);
        setProfile(profileData);
        setProjects(projectsData);
        setBlogs(blogsData);
        setAchievements(achievementsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) return <PageLoader />;
  if (error) return <ErrorState message={error} onRetry={() => window.location.reload()} />;

  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div className="order-2 lg:order-1">
              <FadeIn delay={0.1}>
                <motion.span 
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-950/50 text-primary-600 dark:text-primary-400 text-sm font-medium mb-6"
                  whileHover={{ scale: 1.02 }}
                >
                  <Sparkles size={16} />
                  {profile.availability}
                </motion.span>
              </FadeIn>

              <FadeIn delay={0.2}>
                <h1 className="heading-1 text-dark-900 dark:text-white mb-4">
                  Hi, I'm{' '}
                  <span className="gradient-text">{profile.name}</span>
                </h1>
              </FadeIn>

              <FadeIn delay={0.3}>
                <p className="text-xl md:text-2xl text-dark-600 dark:text-dark-300 font-medium mb-6">
                  {profile.title}
                </p>
              </FadeIn>

              <FadeIn delay={0.4}>
                <p className="text-lg text-dark-500 dark:text-dark-400 mb-8 max-w-xl">
                  {profile.tagline}
                </p>
              </FadeIn>

              <FadeIn delay={0.5}>
                <div className="flex flex-wrap gap-4">
                  <Link to="/projects" className="btn-primary">
                    <Rocket size={18} />
                    View My Work
                  </Link>
                  <Link to="/about" className="btn-secondary">
                    Learn More
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </FadeIn>

              {/* Quick stats */}
              <FadeIn delay={0.6}>
                <div className="flex flex-wrap gap-6 mt-12 pt-8 border-t border-dark-200 dark:border-dark-800">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary-50 dark:bg-primary-950/50">
                      <Target size={20} className="text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <span className="block text-2xl font-bold text-dark-900 dark:text-white">10M+</span>
                      <span className="text-sm text-dark-500">Users Impacted</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-accent-50 dark:bg-accent-950/50">
                      <Lightbulb size={20} className="text-accent-600 dark:text-accent-400" />
                    </div>
                    <div>
                      <span className="block text-2xl font-bold text-dark-900 dark:text-white">3</span>
                      <span className="text-sm text-dark-500">Patents</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-50 dark:bg-green-950/50">
                      <Users size={20} className="text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <span className="block text-2xl font-bold text-dark-900 dark:text-white">50+</span>
                      <span className="text-sm text-dark-500">Team Members Led</span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Right visual */}
            <div className="order-1 lg:order-2 relative">
              <FadeIn delay={0.3}>
                <div className="relative">
                  {/* Main visual card */}
                  <motion.div 
                    className="glass-card p-8 relative overflow-hidden"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-accent-500/5" />
                    
                    {/* Profile visualization */}
                    <div className="relative">
                      <div className="w-32 h-32 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-xl shadow-primary-500/25">
                        <span className="text-white font-display font-bold text-5xl">P</span>
                      </div>
                      
                      <div className="text-center mb-6">
                        <h3 className="font-display text-xl font-bold text-dark-900 dark:text-white mb-1">
                          {profile.name}
                        </h3>
                        <p className="text-dark-500 dark:text-dark-400 text-sm">
                          {profile.title}
                        </p>
                      </div>

                      {/* Expertise tags */}
                      <div className="flex flex-wrap gap-2 justify-center">
                        {profile.expertise.slice(0, 6).map((skill, index) => (
                          <motion.span
                            key={skill}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                            className="px-3 py-1 text-xs font-medium rounded-full bg-dark-100 dark:bg-dark-800 text-dark-600 dark:text-dark-300"
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <MousePointerClick size={24} className="text-dark-400" />
        </motion.div>
      </section>

      {/* Featured Projects Section */}
      <section className="section-padding bg-dark-50/50 dark:bg-dark-900/50">
        <div className="section-container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 dark:bg-primary-950/50 text-primary-600 dark:text-primary-400 text-sm font-medium mb-4"
              >
                <Code2 size={16} />
                Featured Work
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="heading-2 text-dark-900 dark:text-white mb-4"
              >
                Products That Scale
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-dark-500 dark:text-dark-400 max-w-xl"
              >
                From blockchain identity to cloud platforms—here's how I turn complex challenges into impactful products.
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Link to="/projects" className="btn-ghost group mt-4 md:mt-0">
                View All Projects
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.slice(0, 3).map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="section-padding">
        <div className="section-container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-50 dark:bg-accent-950/50 text-accent-600 dark:text-accent-400 text-sm font-medium mb-4"
              >
                <BookOpen size={16} />
                Latest Insights
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="heading-2 text-dark-900 dark:text-white mb-4"
              >
                Thoughts & Learnings
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-dark-500 dark:text-dark-400 max-w-xl"
              >
                Writing about product strategy, technology trends, and lessons learned from building at scale.
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Link to="/blog" className="btn-ghost group mt-4 md:mt-0">
                View All Posts
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.filter(b => b.featured).slice(0, 3).map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="section-padding bg-dark-50/50 dark:bg-dark-900/50">
        <div className="section-container">
          <div className="text-center mb-12">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 text-sm font-medium mb-4"
            >
              <Award size={16} />
              Recognition
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="heading-2 text-dark-900 dark:text-white mb-4"
            >
              Milestones & Achievements
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-dark-500 dark:text-dark-400 max-w-2xl mx-auto"
            >
              A few highlights from my journey in product and technology leadership.
            </motion.p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.slice(0, 3).map((achievement, index) => (
              <AchievementCard key={achievement.id} achievement={achievement} index={index} />
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <Link to="/achievements" className="btn-secondary">
              View All Achievements
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="section-container">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 md:p-12 text-center relative overflow-hidden"
          >
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-accent-500/5" />
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary-500/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-accent-500/10 rounded-full blur-3xl" />
            
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 mx-auto mb-6 rounded-full border-2 border-dashed border-primary-500/30 flex items-center justify-center"
              >
                <Zap size={28} className="text-primary-500" />
              </motion.div>
              
              <h3 className="heading-3 text-dark-900 dark:text-white mb-4">
                Let's Build Something Great Together
              </h3>
              <p className="text-dark-500 dark:text-dark-400 max-w-xl mx-auto mb-8">
                Whether you're looking for product leadership, strategic advice, or just want to chat about technology—I'm always open to interesting conversations.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <a 
                  href={`mailto:${profile.email}`} 
                  className="btn-primary"
                >
                  <Sparkles size={18} />
                  Get In Touch
                </a>
                <Link to="/about" className="btn-secondary">
                  More About Me
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
