import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { ghostService } from '../services/ghostApi';
import { motion } from 'motion/react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Blog: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await ghostService.getPosts();
      setPosts(data);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Helmet>
        <title>Blog | GDL.DJ - Tips, Música y Producción</title>
        <meta name="description" content="Artículos sobre producción de eventos, selección musical y las mejores experiencias nocturnas en CDMX." />
      </Helmet>

      <Navbar cartCount={0} setIsCartOpen={() => {}} scrollTo={scrollTo} isMobileMenuOpen={false} setIsMobileMenuOpen={() => {}} />

      <main className="pt-32 pb-24 px-4 max-w-7xl mx-auto">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-display font-black text-white mb-6 uppercase tracking-tighter">
            Contenido <span className="text-primary text-shadow-[0_0_10px_rgba(0,240,255,0.5)]">Nocturno</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">Explora tips de producción, música y anécdotas de la escena DJ en CDMX.</p>
        </header>

        {loading ? (
          <div className="flex justify-center items-center h-64 text-white uppercase tracking-widest text-sm animate-pulse">Cargando artículos...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, idx) => (
              <motion.article 
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-card/30 border border-white/10 rounded-sm overflow-hidden group hover:border-primary/50 transition-colors flex flex-col"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img src={post.feature_image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 bg-primary/80 backdrop-blur-md px-3 py-1 text-[10px] font-display font-bold text-primary-foreground uppercase tracking-widest">
                    {post.primary_tag?.name || 'Evento'}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-[10px] text-gray-500 uppercase tracking-widest mb-4">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(post.published_at).toLocaleDateString()}</span>
                    <span className="flex items-center gap-1"><User className="w-3 h-3" /> {post.primary_author?.name}</span>
                  </div>
                  <h2 className="text-xl font-display font-bold text-white mb-4 group-hover:text-primary transition-colors leading-tight">{post.title}</h2>
                  <p className="text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed">{post.excerpt}</p>
                  <Link 
                    to={`/blog/${post.slug}`}
                    className="mt-auto inline-flex items-center gap-2 text-white hover:text-primary transition-colors font-display uppercase tracking-widest text-xs font-bold"
                  >
                    Leer Más <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </main>

      <Footer scrollTo={scrollTo} />
    </div>
  );
};
