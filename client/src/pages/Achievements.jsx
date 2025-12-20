import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, Trophy, Star, Sparkles } from 'lucide-react';
import PageTransition, { FadeIn } from '../components/PageTransition';
import SectionHeader from '../components/SectionHeader';
import AchievementCard from '../components/AchievementCard';
import { PageLoader } from '../components/LoadingSpinner';
import ErrorState from '../components/ErrorState';
import { fetchAchievements } from '../services/api';

export default function Achievements() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchAchievements();
        setAchievements(data);
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
      <section className="pt-32 pb-16">
        <div className="section-container">
          <SectionHeader
            badge={<><Award size={16} /> Recognition</>}
            title="Achievements & Milestones"
            subtitle="A collection of professional milestones, recognitions, and credentials that mark my journey in product and technology leadership."
          />

          {/* Stats overview */}
          <FadeIn delay={0.2}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
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
          {Object.entries(groupedAchievements).map(([category, items], categoryIndex) => (
            <FadeIn key={category} delay={0.4 + categoryIndex * 0.1}>
              <div className="mb-12">
                <h3 className="font-display text-xl font-semibold text-dark-900 dark:text-white mb-6 flex items-center gap-2">
                  <span 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: items[0]?.color || '#6366F1' }}
                  />
                  {category}
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((achievement, index) => (
                    <AchievementCard 
                      key={achievement.id} 
                      achievement={achievement} 
                      index={index} 
                    />
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}

          {/* Timeline teaser */}
          <FadeIn delay={0.8}>
            <div className="glass-card p-8 text-center relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary-500/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-accent-500/10 rounded-full blur-3xl" />
              
              <div className="relative">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="inline-block mb-4"
                >
                  <span className="text-5xl">🚀</span>
                </motion.div>
                <h3 className="font-display text-2xl font-bold text-dark-900 dark:text-white mb-4">
                  More Milestones Coming
                </h3>
                <p className="text-dark-500 dark:text-dark-400 max-w-xl mx-auto">
                  The journey continues. Every product shipped, every team led, and every challenge overcome 
                  adds to this story of building impactful technology.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </PageTransition>
  );
}
