import { motion } from 'framer-motion';
import { 
  Lightbulb, 
  Mic2, 
  Rocket, 
  GraduationCap, 
  BarChart3,
  Award,
  Trophy,
  Star
} from 'lucide-react';

const iconMap = {
  lightbulb: Lightbulb,
  microphone: Mic2,
  rocket: Rocket,
  academic: GraduationCap,
  chart: BarChart3,
  award: Award,
  trophy: Trophy,
  star: Star,
};

export default function AchievementCard({ achievement, index }) {
  const Icon = iconMap[achievement.icon] || Award;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94] 
      }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <div className="glass-card p-6 h-full relative overflow-hidden">
        {/* Background glow */}
        <div 
          className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-10 blur-2xl transition-opacity group-hover:opacity-20"
          style={{ backgroundColor: achievement.color }}
        />
        
        {/* Icon */}
        <motion.div 
          className="relative w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
          style={{ backgroundColor: `${achievement.color}15` }}
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          <Icon 
            size={28} 
            style={{ color: achievement.color }}
          />
          <motion.div
            className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ 
              background: `radial-gradient(circle, ${achievement.color}20 0%, transparent 70%)` 
            }}
          />
        </motion.div>

        {/* Category badge */}
        <span 
          className="inline-block px-2.5 py-1 rounded-full text-xs font-medium mb-3"
          style={{ 
            backgroundColor: `${achievement.color}15`,
            color: achievement.color 
          }}
        >
          {achievement.category}
        </span>

        {/* Content */}
        <h3 className="font-display text-lg font-semibold text-dark-900 dark:text-white mb-2">
          {achievement.title}
        </h3>
        
        <p className="text-dark-500 dark:text-dark-400 text-sm mb-4">
          {achievement.description}
        </p>

        {/* Details */}
        {achievement.details && (
          <ul className="space-y-2">
            {achievement.details.map((detail, i) => (
              <li 
                key={i}
                className="flex items-start gap-2 text-sm text-dark-600 dark:text-dark-300"
              >
                <span 
                  className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                  style={{ backgroundColor: achievement.color }}
                />
                {detail}
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
}
