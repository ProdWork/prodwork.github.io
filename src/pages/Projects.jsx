import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code2, Filter, Search, X } from 'lucide-react';
import PageTransition, { FadeIn } from '../components/PageTransition';
import SectionHeader from '../components/SectionHeader';
import ProjectCard from '../components/ProjectCard';
import { PageLoader } from '../components/LoadingSpinner';
import ErrorState from '../components/ErrorState';
import { fetchProjects } from '../services/api';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Get unique project types for filtering
  const allTech = [...new Set(projects.flatMap(p => p.projectType))];
  const statuses = [...new Set(projects.map(p => p.status))];

  // Filter projects
  const filteredProjects = projects.filter(project => {
    const matchesFilter = filter === 'all' || 
      project.status === filter || 
      project.projectType.includes(filter);
    const matchesSearch = searchQuery === '' ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.projectType.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  if (loading) return <PageLoader />;
  if (error) return <ErrorState message={error} onRetry={() => window.location.reload()} />;

  return (
    <PageTransition>
      <section className="pt-32 pb-16">
        <div className="section-container">
          {/* Search and Filter Bar */}
          <FadeIn delay={0.2}>
            <div className="glass-card p-4 mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400" />
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input-field pl-10"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-400 hover:text-dark-600"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>

                {/* Filter */}
                <div className="flex items-center gap-2">
                  <Filter size={18} className="text-dark-400" />
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="input-field py-2"
                  >
                    <option value="all">All Projects</option>
                    <optgroup label="Project Type">
                      {allTech.slice(0, 10).map(tech => (
                        <option key={tech} value={tech}>{tech}</option>
                      ))}
                    </optgroup>
                  </select>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Results count */}
          <FadeIn delay={0.3}>
            <p className="text-dark-500 dark:text-dark-400 text-sm mb-6">
              Showing {filteredProjects.length} of {projects.length} projects
              {filter !== 'all' && (
                <button
                  onClick={() => setFilter('all')}
                  className="ml-2 text-primary-600 dark:text-primary-400 hover:underline"
                >
                  Clear filter
                </button>
              )}
            </p>
          </FadeIn>

          {/* Projects Grid */}
          {filteredProjects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          ) : (
            <FadeIn>
              <div className="text-center py-16">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-dark-100 dark:bg-dark-800 flex items-center justify-center">
                  <Search size={32} className="text-dark-400" />
                </div>
                <h3 className="font-display text-xl font-semibold text-dark-900 dark:text-white mb-2">
                  No projects found
                </h3>
                <p className="text-dark-500 dark:text-dark-400 mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <button
                  onClick={() => { setFilter('all'); setSearchQuery(''); }}
                  className="btn-secondary"
                >
                  Reset Filters
                </button>
              </div>
            </FadeIn>
          )}
        </div>
      </section>
    </PageTransition>
  );
}
