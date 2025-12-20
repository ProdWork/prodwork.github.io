import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Mail, 
  Calendar,
  GraduationCap,
  Briefcase,
  Heart,
  Quote,
  Linkedin,
  Twitter,
  Github,
  ExternalLink,
  Sparkles,
  Code2,
  Target,
  Users,
  TrendingUp,
  Lightbulb
} from 'lucide-react';
import PageTransition, { FadeIn, StaggerContainer, StaggerItem } from '../components/PageTransition';
import { PageLoader } from '../components/LoadingSpinner';
import ErrorState from '../components/ErrorState';
import { fetchProfile } from '../services/api';

const socialIcons = {
  linkedin: Linkedin,
  twitter: Twitter,
  github: Github,
};

const expertiseIcons = [
  Target, TrendingUp, Code2, Lightbulb, Users, Briefcase
];

export default function About() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchProfile();
        setProfile(data);
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
      <section className="pt-32 pb-16">
        <div className="section-container">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Left Column - Profile Card */}
            <div className="lg:col-span-4">
              <FadeIn>
                <div className="glass-card p-6 sticky top-28">
                  {/* Avatar */}
                  <div className="relative mb-6">
                    <motion.div 
                      className="w-32 h-32 mx-auto rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-xl shadow-primary-500/25"
                      whileHover={{ scale: 1.05, rotate: 3 }}
                    >
                      <span className="text-white font-display font-bold text-5xl">P</span>
                    </motion.div>
                    <motion.div 
                      className="absolute -bottom-2 -right-2 w-8 h-8 rounded-lg bg-accent-500 flex items-center justify-center"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Sparkles size={16} className="text-white" />
                    </motion.div>
                  </div>

                  {/* Name & Title */}
                  <div className="text-center mb-6">
                    <h1 className="font-display text-2xl font-bold text-dark-900 dark:text-white mb-1">
                      {profile.name}
                    </h1>
                    <p className="text-primary-600 dark:text-primary-400 font-medium">
                      {profile.title}
                    </p>
                  </div>

                  {/* Quick Info */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-dark-500 dark:text-dark-400">
                      <MapPin size={18} className="text-dark-400" />
                      <span>{profile.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-dark-500 dark:text-dark-400">
                      <Mail size={18} className="text-dark-400" />
                      <a href={`mailto:${profile.email}`} className="hover:text-primary-500 transition-colors">
                        {profile.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-3 text-dark-500 dark:text-dark-400">
                      <Calendar size={18} className="text-dark-400" />
                      <span>{profile.availability}</span>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex justify-center gap-3 mb-6">
                    {Object.entries(profile.social).map(([platform, url]) => {
                      const Icon = socialIcons[platform];
                      return (
                        <motion.a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 rounded-xl bg-dark-100 dark:bg-dark-800 text-dark-600 dark:text-dark-300 hover:bg-primary-50 dark:hover:bg-primary-950/50 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Icon size={20} />
                        </motion.a>
                      );
                    })}
                  </div>

                  {/* CTA */}
                  <a 
                    href={`mailto:${profile.email}`}
                    className="btn-primary w-full"
                  >
                    <Mail size={18} />
                    Get In Touch
                  </a>
                </div>
              </FadeIn>
            </div>

            {/* Right Column - Content */}
            <div className="lg:col-span-8 space-y-12">
              {/* Summary */}
              <FadeIn delay={0.1}>
                <div>
                  <h2 className="heading-3 text-dark-900 dark:text-white mb-6">
                    About Me
                  </h2>
                  <div className="space-y-4 text-dark-600 dark:text-dark-300 text-lg leading-relaxed">
                    {profile.bio.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </FadeIn>

              {/* Fun Fact Card */}
              <FadeIn delay={0.2}>
                <motion.div 
                  className="glass-card p-6 relative overflow-hidden"
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="absolute -top-8 -right-8 w-24 h-24 bg-accent-500/10 rounded-full blur-2xl" />
                  <div className="relative flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-accent-50 dark:bg-accent-950/50 text-accent-500">
                      <Quote size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-dark-900 dark:text-white mb-2">Fun Fact</h4>
                      <p className="text-dark-600 dark:text-dark-300">{profile.funFact}</p>
                    </div>
                  </div>
                </motion.div>
              </FadeIn>

              {/* Education */}
              <FadeIn delay={0.3}>
                <div>
                  <h3 className="flex items-center gap-2 text-xl font-display font-semibold text-dark-900 dark:text-white mb-6">
                    <GraduationCap size={24} className="text-primary-500" />
                    Education
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {profile.education.map((edu, index) => (
                      <motion.div
                        key={edu.institution}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className="glass-card p-5 group"
                        whileHover={{ y: -3 }}
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500/10 to-primary-500/5 flex items-center justify-center">
                            <GraduationCap size={24} className="text-primary-500" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-dark-900 dark:text-white">
                              {edu.institution}
                            </h4>
                            <p className="text-primary-600 dark:text-primary-400 text-sm font-medium">
                              {edu.degree}
                            </p>
                            <p className="text-dark-500 text-sm mt-1">
                              {edu.focus}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              {/* Expertise */}
              <FadeIn delay={0.4}>
                <div>
                  <h3 className="flex items-center gap-2 text-xl font-display font-semibold text-dark-900 dark:text-white mb-6">
                    <Briefcase size={24} className="text-primary-500" />
                    Expertise
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {profile.expertise.map((skill, index) => {
                      const Icon = expertiseIcons[index % expertiseIcons.length];
                      return (
                        <motion.div
                          key={skill}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + index * 0.05 }}
                          whileHover={{ scale: 1.05, y: -2 }}
                          className="glass-card p-4 text-center group cursor-default"
                        >
                          <Icon 
                            size={24} 
                            className="mx-auto mb-2 text-dark-400 dark:text-dark-500 group-hover:text-primary-500 transition-colors" 
                          />
                          <span className="text-sm font-medium text-dark-700 dark:text-dark-200">
                            {skill}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </FadeIn>

              {/* Personal Note */}
              <FadeIn delay={0.5}>
                <div className="glass-card p-6 border-l-4 border-primary-500">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-red-50 dark:bg-red-950/50">
                      <Heart size={20} className="text-red-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-dark-900 dark:text-white mb-2">
                        Beyond Work
                      </h4>
                      <p className="text-dark-600 dark:text-dark-300">
                        {profile.personalNote}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
