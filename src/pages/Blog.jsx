import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Search, Filter, X, Tag } from 'lucide-react';
import PageTransition, { FadeIn } from '../components/PageTransition';
import SectionHeader from '../components/SectionHeader';
import BlogCard from '../components/BlogCard';
import { PageLoader } from '../components/LoadingSpinner';
import ErrorState from '../components/ErrorState';
import { fetchBlogs } from '../services/api';

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchBlogs();
        setBlogs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Get unique categories and tags
  const categories = [...new Set(blogs.map(b => b.category))];
  const allTags = [...new Set(blogs.flatMap(b => b.tags))];

  // Filter blogs
  const filteredBlogs = blogs.filter(blog => {
    const matchesFilter = filter === 'all' || 
      blog.category === filter || 
      blog.tags.includes(filter);
    const matchesSearch = searchQuery === '' ||
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  }).sort((a, b) => new Date(b.date) - new Date(a.date));

  // Separate featured and regular posts
  const featuredPosts = filteredBlogs.filter(b => b.featured);
  const regularPosts = filteredBlogs.filter(b => !b.featured);

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
                    placeholder="Search articles..."
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
                    <option value="all">All Posts</option>
                    <optgroup label="Categories">
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </optgroup>
                    <optgroup label="Tags">
                      {allTags.slice(0, 10).map(tag => (
                        <option key={tag} value={tag}>{tag}</option>
                      ))}
                    </optgroup>
                  </select>
                </div>
              </div>

              {/* Quick filters */}
              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-dark-200 dark:border-dark-700">
                <span className="text-sm text-dark-500 mr-2 flex items-center gap-1">
                  <Tag size={14} />
                  Quick filters:
                </span>
                {categories.slice(0, 5).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setFilter(filter === cat ? 'all' : cat)}
                    className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                      filter === cat
                        ? 'bg-primary-500 text-white'
                        : 'bg-dark-100 dark:bg-dark-800 text-dark-600 dark:text-dark-300 hover:bg-dark-200 dark:hover:bg-dark-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Results count */}
          <FadeIn delay={0.3}>
            <p className="text-dark-500 dark:text-dark-400 text-sm mb-6">
              Showing {filteredBlogs.length} of {blogs.length} articles
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

          {filteredBlogs.length > 0 ? (
            <div className="space-y-8">
              {/* Featured Posts */}
              {featuredPosts.length > 0 && filter === 'all' && !searchQuery && (
                <div className="grid gap-6">
                  {featuredPosts.slice(0, 1).map((post, index) => (
                    <BlogCard key={post.id} post={post} index={index} featured />
                  ))}
                </div>
              )}

              {/* Regular Posts Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(filter === 'all' && !searchQuery ? regularPosts : filteredBlogs).map((post, index) => (
                  <BlogCard key={post.id} post={post} index={index} />
                ))}
              </div>
            </div>
          ) : (
            <FadeIn>
              <div className="text-center py-16">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-dark-100 dark:bg-dark-800 flex items-center justify-center">
                  <Search size={32} className="text-dark-400" />
                </div>
                <h3 className="font-display text-xl font-semibold text-dark-900 dark:text-white mb-2">
                  No articles found
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
