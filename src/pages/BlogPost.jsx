import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Tag,
  Share2,
  Link2,
  ChevronRight,
  FileText
} from 'lucide-react';
import PageTransition, { FadeIn } from '../components/PageTransition';
import { PageLoader } from '../components/LoadingSpinner';
import ErrorState from '../components/ErrorState';
import { fetchBlog, fetchBlogs, fetchSocial } from '../services/api';

export default function BlogPost() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [socialLinks, setSocialLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const [blogData, allBlogs, socialData] = await Promise.all([
          fetchBlog(slug),
          fetchBlogs(),
          fetchSocial()
        ]);
        setBlog(blogData);
        setSocialLinks(socialData.social);
        
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

  const shareOnSocial = (socialName) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(blog.title);
    
    if (socialName === 'LinkedIn') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
    }
  };

  if (loading) return <PageLoader />;
  if (error) return <ErrorState message={error} onRetry={() => window.location.reload()} />;

  const formattedDate = new Date(blog.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const heroFallback = `https://picsum.photos/seed/${encodeURIComponent(blog.slug)}/1200/600`;
  const heroImage = blog.heroImage || blog.image || heroFallback;
  const handleHeroError = (event) => {
    const target = event.currentTarget;
    target.onerror = null;
    target.src = heroFallback;
  };

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
                  {socialLinks
                    .filter(social => social.name !== 'Email')
                    .map((social) => (
                      <motion.button
                        key={social.name}
                        onClick={() => shareOnSocial(social.name)}
                        className="p-2 rounded-lg bg-dark-100 dark:bg-dark-800 text-dark-600 dark:text-dark-300 hover:bg-primary-500 hover:text-white transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        title={`Share on ${social.name}`}
                      >
                        {social.name === 'LinkedIn' && (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
                          </svg>
                        )}
                        {social.name === 'Resume' && (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                            <polyline points="14 2 14 8 20 8"/>
                            <line x1="16" y1="13" x2="8" y2="13"/>
                            <line x1="16" y1="17" x2="8" y2="17"/>
                            <line x1="10" y1="9" x2="8" y2="9"/>
                          </svg>
                        )}
                      </motion.button>
                    ))}
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
              <FadeIn delay={0.6}>
                <div className="overflow-hidden rounded-3xl shadow-2xl mb-10">
                  <img
                    src={heroImage}
                    alt={`${blog.title} cover`}
                    className="w-full h-64 md:h-80 object-cover"
                    onError={handleHeroError}
                  />
                </div>
              </FadeIn>
            </header>

            {/* Content */}
            <FadeIn delay={0.7}>
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
            <FadeIn delay={0.8}>
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
            <FadeIn delay={0.9}>
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
