import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { ghostService } from '../services/ghostApi';
import { ArrowLeft, Calendar, User } from 'lucide-react';

export const PostDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (slug) {
        const data = await ghostService.getPostBySlug(slug);
        setPost(data);
      }
      setLoading(false);
    };
    fetchPost();
  }, [slug]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center text-white uppercase tracking-widest text-sm animate-pulse">Cargando artículo...</div>;
  if (!post) return <div className="min-h-screen bg-background flex items-center justify-center text-white uppercase tracking-widest text-sm">Artículo no encontrado</div>;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Helmet>
        <title>{post.title} | GDL.DJ Blog</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>

      <Navbar cartCount={0} setIsCartOpen={() => {}} scrollTo={scrollTo} isMobileMenuOpen={false} setIsMobileMenuOpen={() => {}} />

      <article className="pt-32 pb-24 px-4 max-w-4xl mx-auto">
        <Link to="/blog" className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors mb-12 uppercase font-display font-bold text-xs tracking-widest">
          <ArrowLeft className="w-4 h-4" /> Volver al Blog
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-4 text-xs text-gray-500 uppercase tracking-widest mb-6">
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(post.published_at).toLocaleDateString()}</span>
            <span className="flex items-center gap-1"><User className="w-3 h-3" /> {post.primary_author?.name}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-black text-white mb-8 leading-tight">{post.title}</h1>
          <img src={post.feature_image} alt={post.title} className="w-full aspect-video object-cover rounded-sm border border-white/10" />
        </header>

        <div 
          className="prose prose-invert prose-primary max-w-none text-gray-300 leading-relaxed text-lg"
          dangerouslySetInnerHTML={{ __html: post.html }} 
        />
      </article>

      <Footer scrollTo={scrollTo} />
    </div>
  );
};
