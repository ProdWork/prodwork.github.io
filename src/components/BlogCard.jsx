import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Calendar, Tag } from 'lucide-react';

export default function BlogCard({ post, index, featured = false }) {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const fallbackImage = `https://picsum.photos/seed/${encodeURIComponent(post.slug)}/900/600`;
  const imageUrl = post.heroImage || post.image || fallbackImage;
  const handleImageError = (event) => {
    const target = event.currentTarget;
    target.onerror = null;
    target.src = fallbackImage;
  };

  if (featured) {
    return (
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.5, 
          delay: index * 0.1,
          ease: [0.25, 0.46, 0.45, 0.94] 
        }}
        className="group col-span-full"
      >
        <Link to={`/blog/${post.slug}`}>
          <div className="glass-card overflow-hidden card-hover">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Featured visual */}
              <div className="relative h-48 md:h-full min-h-[250px] overflow-hidden rounded-3xl bg-dark-200/50">
                <img
                  src={imageUrl}
                  alt={`${post.title} cover`}
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={handleImageError}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/30 via-accent-500/10 to-primary-500/10 opacity-80" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="w-20 h-20 mx-auto mb-4 rounded-full border-2 border-dashed border-primary-500/30 flex items-center justify-center"
                    >
                      <span className="text-3xl">✨</span>
                    </motion.div>
                    <span className="px-3 py-1 bg-accent-500 text-white text-xs font-semibold rounded-full">
                      Featured
                    </span>
                  </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute top-4 left-4 w-12 h-12 rounded-lg bg-primary-500/10 dark:bg-primary-500/20" />
                <div className="absolute bottom-8 right-8 w-8 h-8 rounded-full bg-accent-500/20" />
                <div className="absolute top-1/2 right-4 w-16 h-1 bg-primary-500/20 rounded" />
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 flex flex-col justify-center">
                <div className="flex items-center gap-3 text-sm text-dark-500 dark:text-dark-400 mb-3">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} />
                    {formattedDate}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-dark-300 dark:bg-dark-600" />
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} />
                    {post.readTime}
                  </span>
                </div>

                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-primary-50 dark:bg-primary-950/50 text-primary-600 dark:text-primary-400 w-fit mb-3">
                  <Tag size={12} />
                  {post.category}
                </span>

                <h3 className="font-display text-2xl md:text-3xl font-bold text-dark-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-dark-500 dark:text-dark-400 mb-6 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center text-primary-600 dark:text-primary-400 font-medium group/link">
                  <span>Read Article</span>
                  <ArrowRight 
                    size={16} 
                    className="ml-1 group-hover/link:translate-x-1 transition-transform"
                  />
                </div>
              </div>
            </div>
          </div>
        </Link>
      </motion.article>
    );
  }

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
      <Link to={`/blog/${post.slug}`}>
        <div className="glass-card p-6 h-full card-hover flex flex-col">
          <div className="mb-4 h-44 rounded-2xl overflow-hidden">
            <img
              src={imageUrl}
              alt={`${post.title} cover`}
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
          </div>
          {/* Meta */}
          <div className="flex items-center gap-3 text-sm text-dark-500 dark:text-dark-400 mb-3">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {formattedDate}
            </span>
            <span className="w-1 h-1 rounded-full bg-dark-300 dark:bg-dark-600" />
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {post.readTime}
            </span>
          </div>

          {/* Category */}
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-primary-50 dark:bg-primary-950/50 text-primary-600 dark:text-primary-400 w-fit mb-3">
            <Tag size={12} />
            {post.category}
          </span>

          {/* Title */}
          <h3 className="font-display text-lg font-semibold text-dark-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
            {post.title}
          </h3>
          
          {/* Excerpt */}
          <p className="text-dark-500 dark:text-dark-400 text-sm mb-4 line-clamp-3 flex-grow">
            {post.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {post.tags.slice(0, 3).map((tag) => (
              <span 
                key={tag}
                className="px-2 py-0.5 text-xs rounded bg-dark-100 dark:bg-dark-800 text-dark-500 dark:text-dark-400"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center text-primary-600 dark:text-primary-400 font-medium text-sm group/link mt-auto">
            <span>Read More</span>
            <ArrowRight 
              size={14} 
              className="ml-1 group-hover/link:translate-x-1 transition-transform"
            />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
