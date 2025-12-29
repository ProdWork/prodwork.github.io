import { Link } from 'react-router-dom';
import { ArrowRight, Rocket } from 'lucide-react';
import PageTransition, { FadeIn } from '../components/PageTransition';
import { useProfile } from '../hooks/useProfile';

export default function Home() {
  const { profile, loading, error } = useProfile();

  if (loading) return <div className="h-screen flex items-center justify-center"><p>Loading...</p></div>;
  if (error) return <div className="h-screen flex items-center justify-center"><p>Error loading profile</p></div>;
  if (!profile) return null;

  return (
    <PageTransition>
      <section className="relative min-h-screen flex items-center pt-20">
        <div className="section-container w-full">
          <div className="max-w-3xl">
            {/* Text Content */}
            <FadeIn delay={0.2}>
              <h1 className="heading-1 text-dark-900 dark:text-white mb-2">
                Hi, I'm{' '}
                <span className="text-primary-600">{profile.nickname}</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.3}>
              <p className="text-xl md:text-2xl text-dark-600 dark:text-dark-300 font-medium mb-4">
                {profile.title}
              </p>
            </FadeIn>
            <FadeIn delay={0.4}>
              <p className="text-lg text-dark-500 dark:text-dark-400 mb-6 max-w-xl">
                {profile.tagline}
              </p>
            </FadeIn>
            <FadeIn delay={0.5}>
              <div className="flex flex-wrap gap-4">
                <Link to="/projects" className="btn-primary">
                  <Rocket size={18} />
                  View My Work
                </Link>
                <Link to="/blog" className="btn-secondary">
                  Read my blogs
                </Link>
                <Link to="/about" className="btn-ghost">
                  Learn About Me
                  <ArrowRight size={18} />
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
