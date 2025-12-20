import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, CheckCircle2, Rocket, Code2 } from 'lucide-react';

const statusConfig = {
  'Shipped': { icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-500/10' },
  'In Progress': { icon: Rocket, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  'Planning': { icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10' },
};

export default function ProjectCard({ project, index }) {
  const status = statusConfig[project.status] || statusConfig['In Progress'];
  const StatusIcon = status.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94] 
      }}
      className="group"
    >
      <Link to={`/projects/${project.id}`}>
        <div className="glass-card overflow-hidden card-hover">
          {/* Color accent bar */}
          <div 
            className="h-1 w-full"
            style={{ backgroundColor: project.color }}
          />
          
          <div className="p-6 sm:p-8">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <div 
                className="p-3 rounded-xl"
                style={{ backgroundColor: `${project.color}15` }}
              >
                <Code2 
                  size={24} 
                  style={{ color: project.color }}
                />
              </div>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${status.bg} ${status.color}`}>
                <StatusIcon size={12} />
                {project.status}
              </span>
            </div>

            {/* Content */}
            <h3 className="font-display text-xl font-semibold text-dark-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              {project.title}
            </h3>
            
            <p className="text-dark-500 dark:text-dark-400 text-sm mb-4 line-clamp-2">
              {project.shortDescription}
            </p>

            {/* Role */}
            <div className="mb-4">
              <span className="text-xs font-medium text-dark-400 dark:text-dark-500 uppercase tracking-wider">
                Role
              </span>
              <p className="text-sm font-medium text-dark-700 dark:text-dark-200">
                {project.role}
              </p>
            </div>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.techStack.slice(0, 4).map((tech) => (
                <span 
                  key={tech}
                  className="px-2.5 py-1 text-xs font-medium rounded-md bg-dark-100 dark:bg-dark-800 text-dark-600 dark:text-dark-300"
                >
                  {tech}
                </span>
              ))}
              {project.techStack.length > 4 && (
                <span className="px-2.5 py-1 text-xs font-medium rounded-md bg-dark-100 dark:bg-dark-800 text-dark-500">
                  +{project.techStack.length - 4}
                </span>
              )}
            </div>

            {/* Metrics */}
            {project.metrics && (
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-dark-200 dark:border-dark-700">
                {Object.entries(project.metrics).slice(0, 3).map(([key, value]) => (
                  <div key={key}>
                    <span className="block text-lg font-bold text-dark-900 dark:text-white">
                      {value}
                    </span>
                    <span className="text-xs text-dark-500 dark:text-dark-400 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* CTA */}
            <div className="mt-6 flex items-center text-primary-600 dark:text-primary-400 font-medium text-sm group/link">
              <span>View Case Study</span>
              <ArrowRight 
                size={16} 
                className="ml-1 group-hover/link:translate-x-1 transition-transform"
              />
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
