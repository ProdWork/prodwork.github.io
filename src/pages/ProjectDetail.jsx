import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  ExternalLink, 
  CheckCircle2, 
  AlertTriangle,
  Rocket,
  Target,
  Users,
  Calendar,
  Building2,
  Layers,
  Zap
} from 'lucide-react';
import PageTransition, { FadeIn } from '../components/PageTransition';
import { PageLoader } from '../components/LoadingSpinner';
import ErrorState from '../components/ErrorState';
import { fetchProject } from '../services/api';

const statusConfig = {
  'Shipped': { icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-500/10' },
  'In Progress': { icon: Rocket, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  'Planning': { icon: Target, color: 'text-amber-500', bg: 'bg-amber-500/10' },
};

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchProject(id);
        setProject(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id]);

  if (loading) return <PageLoader />;
  if (error) return <ErrorState message={error} onRetry={() => window.location.reload()} />;

  const status = statusConfig[project.status] || statusConfig['In Progress'];
  const StatusIcon = status.icon;

  return (
    <PageTransition>
      <article className="pt-32 pb-16">
        <div className="section-container">
          {/* Back link */}
          <FadeIn>
            <Link 
              to="/projects" 
              className="inline-flex items-center gap-2 text-dark-500 dark:text-dark-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors mb-8"
            >
              <ArrowLeft size={18} />
              Back to Projects
            </Link>
          </FadeIn>

          {/* Header */}
          <header className="mb-12">
            <FadeIn delay={0.1}>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${status.bg} ${status.color}`}>
                  <StatusIcon size={14} />
                  {project.status}
                </span>
                <span className="text-dark-400">•</span>
                <span className="text-dark-500 dark:text-dark-400 text-sm flex items-center gap-1.5">
                  <Calendar size={14} />
                  {project.duration}
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h1 className="heading-1 text-dark-900 dark:text-white mb-4">
                {project.title}
              </h1>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="text-xl text-dark-600 dark:text-dark-300 max-w-3xl">
                {project.shortDescription}
              </p>
            </FadeIn>
          </header>

          <div className="grid lg:grid-cols-12 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-8 space-y-12">
              {/* Hero visual */}
              <FadeIn delay={0.4}>
                <div 
                  className="glass-card aspect-video relative overflow-hidden"
                  style={{ backgroundColor: `${project.color}10` }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                      className="w-32 h-32 rounded-full border-4 border-dashed"
                      style={{ borderColor: `${project.color}30` }}
                    />
                    <div 
                      className="absolute w-20 h-20 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: project.color }}
                    >
                      <Layers size={40} className="text-white" />
                    </div>
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute top-8 left-8 w-16 h-16 rounded-lg" style={{ backgroundColor: `${project.color}15` }} />
                  <div className="absolute bottom-8 right-8 w-24 h-24 rounded-full" style={{ backgroundColor: `${project.color}10` }} />
                  <div className="absolute top-1/2 left-8 w-32 h-1 rounded" style={{ backgroundColor: `${project.color}20` }} />
                </div>
              </FadeIn>

              {/* Description */}
              <FadeIn delay={0.5}>
                <section>
                  <h2 className="heading-3 text-dark-900 dark:text-white mb-4">
                    Overview
                  </h2>
                  <p className="text-dark-600 dark:text-dark-300 text-lg leading-relaxed">
                    {project.fullDescription}
                  </p>
                </section>
              </FadeIn>

              {/* Impact */}
              <FadeIn delay={0.6}>
                <section>
                  <h2 className="heading-3 text-dark-900 dark:text-white mb-6">
                    Impact & Results
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {project.impact.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                        className="flex items-start gap-3 p-4 glass-card"
                      >
                        <CheckCircle2 size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-dark-700 dark:text-dark-200">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </section>
              </FadeIn>

              {/* Challenges */}
              <FadeIn delay={0.7}>
                <section>
                  <h2 className="heading-3 text-dark-900 dark:text-white mb-6">
                    Key Challenges
                  </h2>
                  <div className="space-y-4">
                    {project.challenges.map((challenge, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                        className="flex items-start gap-3 p-4 glass-card border-l-4 border-amber-500"
                      >
                        <AlertTriangle size={20} className="text-amber-500 flex-shrink-0 mt-0.5" />
                        <span className="text-dark-700 dark:text-dark-200">{challenge}</span>
                      </motion.div>
                    ))}
                  </div>
                </section>
              </FadeIn>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="sticky top-28 space-y-6">
                {/* Metrics Card */}
                {project.metrics && (
                  <FadeIn delay={0.5}>
                    <div className="glass-card p-6">
                      <h3 className="font-display font-semibold text-dark-900 dark:text-white mb-4 flex items-center gap-2">
                        <Zap size={18} className="text-primary-500" />
                        Key Metrics
                      </h3>
                      <div className="space-y-4">
                        {Object.entries(project.metrics).map(([key, value]) => (
                          <div key={key} className="flex justify-between items-center">
                            <span className="text-dark-500 dark:text-dark-400 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </span>
                            <span className="font-semibold text-dark-900 dark:text-white">
                              {value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </FadeIn>
                )}

                {/* Project Details */}
                <FadeIn delay={0.6}>
                  <div className="glass-card p-6">
                    <h3 className="font-display font-semibold text-dark-900 dark:text-white mb-4">
                      Project Details
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <span className="text-xs font-medium text-dark-400 dark:text-dark-500 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                          <Users size={12} />
                          Role
                        </span>
                        <p className="font-medium text-dark-700 dark:text-dark-200">
                          {project.role}
                        </p>
                      </div>
                      <div>
                        <span className="text-xs font-medium text-dark-400 dark:text-dark-500 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                          <Building2 size={12} />
                          Company
                        </span>
                        <p className="font-medium text-dark-700 dark:text-dark-200">
                          {project.company}
                        </p>
                      </div>
                      <div>
                        <span className="text-xs font-medium text-dark-400 dark:text-dark-500 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                          <Calendar size={12} />
                          Duration
                        </span>
                        <p className="font-medium text-dark-700 dark:text-dark-200">
                          {project.duration}
                        </p>
                      </div>
                    </div>
                  </div>
                </FadeIn>

                {/* Tech Stack */}
                <FadeIn delay={0.7}>
                  <div className="glass-card p-6">
                    <h3 className="font-display font-semibold text-dark-900 dark:text-white mb-4">
                      Tech Stack
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.projectType.map((tech) => (
                        <span 
                          key={tech}
                          className="px-3 py-1.5 text-sm font-medium rounded-lg bg-dark-100 dark:bg-dark-800 text-dark-600 dark:text-dark-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </FadeIn>

                {/* Methodology */}
                <FadeIn delay={0.8}>
                  <div className="glass-card p-6">
                    <h3 className="font-display font-semibold text-dark-900 dark:text-white mb-4">
                      Methodology
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.methodology.map((method) => (
                        <span 
                          key={method}
                          className="px-3 py-1.5 text-sm font-medium rounded-lg bg-primary-50 dark:bg-primary-950/50 text-primary-600 dark:text-primary-400"
                        >
                          {method}
                        </span>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              </div>
            </aside>
          </div>
        </div>
      </article>
    </PageTransition>
  );
}
