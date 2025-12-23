import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Mail, 
  Calendar,
  GraduationCap,
  School,
  Briefcase,
  Heart,
  Quote,
  Linkedin,
  Github,
  ExternalLink,
  Sparkles,
  Code2,
  Target,
  Users,
  TrendingUp,
  Lightbulb,
  Award,
  Trophy,
  Star,
  Globe
} from 'lucide-react';
import PageTransition, { FadeIn } from '../components/PageTransition';
import { PageLoader } from '../components/LoadingSpinner';
import ErrorState from '../components/ErrorState';
import AchievementCard from '../components/AchievementCard';
import { fetchProfile, fetchSocial, fetchAchievements } from '../services/api';

const iconMap = {
  Target,
  Code2,
  TrendingUp,
  Lightbulb,
  Users,
  Briefcase,
  Sparkles,
  GraduationCap,
  School,
  Globe,
  Heart,
  Award,
  Trophy,
  Star,
};

const socialIconMap = {
  Linkedin,
  Github,
  Mail,
};

export default function About() {
  const [profile, setProfile] = useState(null);
  const [socialLinks, setSocialLinks] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [profileData, socialData, achievementsData] = await Promise.all([
          fetchProfile(),
          fetchSocial(),
          fetchAchievements()
        ]);
        setProfile(profileData);
        const linksWithIcons = socialData.social.map(link => ({
          ...link,
          icon: socialIconMap[link.icon],
        }));
        setSocialLinks(linksWithIcons);
        setAchievements(achievementsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Group achievements by category
  const groupedAchievements = achievements.reduce((acc, achievement) => {
    const category = achievement.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(achievement);
    return acc;
  }, {});

  if (loading) return <PageLoader />;
  if (error) return <ErrorState message={error} onRetry={() => window.location.reload()} />;

  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="pt-32 pb-8">
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
                    {socialLinks.map((social) => (
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
                        {social.icon && <social.icon size={20} />}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Right Column - Content */}
            <div className="lg:col-span-8 space-y-8">
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
            </div>
          </div>
        </div>
      </section>

      {/* Education Section - Full Width */}
      <section className="pt-8 pb-8">
        <div className="section-container">
          <FadeIn delay={0.3}>
            <div>
              <h3 className="flex items-center gap-2 text-xl font-display font-semibold text-dark-900 dark:text-white mb-6">
                <GraduationCap size={24} className="text-primary-500" />
                Education & Certifications
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {profile.education.map((edu, index) => {
                  const Icon = iconMap[edu.icon];
                  return (
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
                          {Icon && <Icon size={24} className="text-primary-500" />}
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
                  );
                })}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Expertise Section - Full Width */}
      <section className="pt-8 pb-8">
        <div className="section-container">
          <FadeIn delay={0.4}>
            <div>
              <h3 className="flex items-center gap-2 text-xl font-display font-semibold text-dark-900 dark:text-white mb-6">
                <Briefcase size={24} className="text-primary-500" />
                Expertise
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {profile.expertise.map((skill, index) => {
                  const Icon = iconMap[skill.icon];
                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.05 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="glass-card p-4 text-center group cursor-default"
                    >
                      {Icon && (
                        <Icon 
                          size={24} 
                          className="mx-auto mb-2 text-dark-400 dark:text-dark-500 group-hover:text-primary-500 transition-colors" 
                        />
                      )}
                      <span className="text-sm font-medium text-dark-700 dark:text-dark-200">
                        {skill.name}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Personal Note Section - Full Width */}
      <section className="pt-8 pb-8">
        <div className="section-container">
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
      </section>

      {/* Achievements Section */}
      <section className="pt-8 pb-16">
        <div className="section-container">
          <FadeIn>
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <Award size={24} className="text-primary-600" />
                <h2 className="font-display text-3xl font-bold text-dark-900 dark:text-white">
                  Achievements & Milestones
                </h2>
              </div>
              <p className="text-dark-500 dark:text-dark-400 max-w-2xl">
                A collection of professional milestones, recognitions, and credentials that mark my journey in product and technology leadership.
              </p>
            </div>
          </FadeIn>

          {/* Stats overview */}
          <FadeIn delay={0.2}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { icon: Trophy, label: 'Patents', value: '3', color: '#6366F1' },
                { icon: Star, label: 'Conferences', value: '15+', color: '#EC4899' },
                { icon: Sparkles, label: 'Product Launches', value: '5', color: '#10B981' },
                { icon: Award, label: 'Years Experience', value: '12+', color: '#F59E0B' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="glass-card p-6 text-center group"
                  whileHover={{ y: -5 }}
                >
                  <stat.icon 
                    size={28} 
                    className="mx-auto mb-3 transition-colors"
                    style={{ color: stat.color }}
                  />
                  <span className="block text-3xl font-bold text-dark-900 dark:text-white mb-1">
                    {stat.value}
                  </span>
                  <span className="text-sm text-dark-500 dark:text-dark-400">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </FadeIn>

          {/* Achievement categories */}
          <FadeIn delay={0.4}>
            <div className="grid grid-cols-3 gap-6">
              {achievements.map((achievement, index) => (
                <AchievementCard 
                  key={achievement.id} 
                  achievement={achievement} 
                  index={index} 
                />
              ))}
            </div>
          </FadeIn>

          
        </div>
      </section>
    </PageTransition>
  );
}
