import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Tag,
  Share2,
  Twitter,
  Linkedin,
  Link2,
  ChevronRight
} from 'lucide-react';
import PageTransition, { FadeIn } from '../components/PageTransition';
import { PageLoader } from '../components/LoadingSpinner';
import ErrorState from '../components/ErrorState';
import { fetchBlog, fetchBlogs } from '../services/api';

export default function BlogPost() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const [blogData, allBlogs] = await Promise.all([
          fetchBlog(slug),
          fetchBlogs()
        ]);
        setBlog(blogData);
        
        // Get related posts by category or tags
        const related = allBlogs
          .filter(b => 
            b.slug !== slug && 
            (b.category === blogData.category || 
             b.tags.some(t => blogData.tags.includes(t)))
          )
          .slice(0, 3);
        setRelatedPosts(related);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [slug]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnTwitter = () => {
    const text = encodeURIComponent(blog.title);
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  };

  if (loading) return <PageLoader />;
  if (error) return <ErrorState message={error} onRetry={() => window.location.reload()} />;

  const formattedDate = new Date(blog.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <PageTransition>
      <article className="pt-32 pb-16">
        <div className="section-container">
          {/* Back link */}
          <FadeIn>
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 text-dark-500 dark:text-dark-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors mb-8"
            >
              <ArrowLeft size={18} />
              Back to Blog
            </Link>
          </FadeIn>

          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <header className="mb-12">
              <FadeIn delay={0.1}>
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-primary-50 dark:bg-primary-950/50 text-primary-600 dark:text-primary-400">
                    <Tag size={14} />
                    {blog.category}
                  </span>
                  <span className="text-dark-400">•</span>
                  <span className="text-dark-500 dark:text-dark-400 text-sm flex items-center gap-1.5">
                    <Calendar size={14} />
                    {formattedDate}
                  </span>
                  <span className="text-dark-400">•</span>
                  <span className="text-dark-500 dark:text-dark-400 text-sm flex items-center gap-1.5">
                    <Clock size={14} />
                    {blog.readTime}
                  </span>
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <h1 className="heading-1 text-dark-900 dark:text-white mb-6">
                  {blog.title}
                </h1>
              </FadeIn>

              <FadeIn delay={0.3}>
                <p className="text-xl text-dark-500 dark:text-dark-400 mb-6">
                  {blog.excerpt}
                </p>
              </FadeIn>

              {/* Tags */}
              <FadeIn delay={0.4}>
                <div className="flex flex-wrap gap-2 mb-8">
                  {blog.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-3 py-1 text-sm rounded-lg bg-dark-100 dark:bg-dark-800 text-dark-600 dark:text-dark-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </FadeIn>

              {/* Share buttons */}
              <FadeIn delay={0.5}>
                <div className="flex items-center gap-3 pb-8 border-b border-dark-200 dark:border-dark-700">
                  <span className="text-dark-500 dark:text-dark-400 text-sm flex items-center gap-1.5">
                    <Share2 size={14} />
                    Share:
                  </span>
                  <motion.button
                    onClick={shareOnTwitter}
                    className="p-2 rounded-lg bg-dark-100 dark:bg-dark-800 text-dark-600 dark:text-dark-300 hover:bg-[#1DA1F2] hover:text-white transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Twitter size={16} />
                  </motion.button>
                  <motion.button
                    onClick={shareOnLinkedIn}
                    className="p-2 rounded-lg bg-dark-100 dark:bg-dark-800 text-dark-600 dark:text-dark-300 hover:bg-[#0077B5] hover:text-white transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Linkedin size={16} />
                  </motion.button>
                  <motion.button
                    onClick={handleCopyLink}
                    className="p-2 rounded-lg bg-dark-100 dark:bg-dark-800 text-dark-600 dark:text-dark-300 hover:bg-primary-500 hover:text-white transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link2 size={16} />
                  </motion.button>
                  {copied && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-sm text-green-500"
                    >
                      Copied!
                    </motion.span>
                  )}
                </div>
              </FadeIn>
            </header>

            {/* Content */}
            <FadeIn delay={0.6}>
              <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
                {blog.content.split('\n\n').map((paragraph, index) => {
                  if (paragraph.startsWith('## ')) {
                    return (
                      <h2 key={index} className="font-display text-2xl font-semibold text-dark-900 dark:text-white mt-8 mb-4">
                        {paragraph.replace('## ', '')}
                      </h2>
                    );
                  }
                  if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                    return (
                      <h3 key={index} className="font-display text-xl font-semibold text-dark-900 dark:text-white mt-6 mb-3">
                        {paragraph.replace(/\*\*/g, '')}
                      </h3>
                    );
                  }
                  if (paragraph.startsWith('- [ ]') || paragraph.startsWith('- [x]')) {
                    const items = paragraph.split('\n');
                    return (
                      <ul key={index} className="space-y-2 my-4">
                        {items.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-dark-600 dark:text-dark-300">
                            <span className="w-5 h-5 rounded border border-dark-300 dark:border-dark-600 flex-shrink-0 mt-0.5" />
                            {item.replace(/- \[[ x]\] /, '')}
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  if (paragraph.startsWith('- ')) {
                    const items = paragraph.split('\n');
                    return (
                      <ul key={index} className="space-y-2 my-4">
                        {items.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-dark-600 dark:text-dark-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0 mt-2" />
                            {item.replace('- ', '')}
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  return (
                    <p key={index} className="text-dark-600 dark:text-dark-300 leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  );
                })}
              </div>
            </FadeIn>

            {/* Author card */}
            <FadeIn delay={0.7}>
              <div className="glass-card p-6 mb-12">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
                    <span className="text-white font-display font-bold text-2xl">P</span>
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-dark-900 dark:text-white">
                      Puneet Singh
                    </h4>
                    <p className="text-dark-500 dark:text-dark-400 text-sm">
                      Product & Platform Strategy Executive
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <FadeIn delay={0.8}>
              <section className="max-w-5xl mx-auto">
                <h3 className="font-display text-xl font-semibold text-dark-900 dark:text-white mb-6">
                  Related Articles
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedPosts.map((post) => (
                    <Link 
                      key={post.id}
                      to={`/blog/${post.slug}`}
                      className="glass-card p-5 group card-hover"
                    >
                      <span className="text-xs font-medium text-primary-600 dark:text-primary-400 mb-2 block">
                        {post.category}
                      </span>
                      <h4 className="font-display font-semibold text-dark-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                        {post.title}
                      </h4>
                      <p className="text-dark-500 dark:text-dark-400 text-sm line-clamp-2">
                        {post.excerpt}
                      </p>
                      <span className="inline-flex items-center gap-1 text-primary-600 dark:text-primary-400 text-sm font-medium mt-3">
                        Read more
                        <ChevronRight size={14} />
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            </FadeIn>
          )}
        </div>
      </article>
    </PageTransition>
  );
}
