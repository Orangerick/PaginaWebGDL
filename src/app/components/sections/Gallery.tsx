import React from 'react';
import { motion } from 'motion/react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

const galleryMedia = [
  {
    url: '/gallery/55737fab-152e-4ad9-af26-d6ab9bb095da.mp4',
    title: 'Producción de Evento',
    category: 'Evento',
    type: 'video'
  },
  {
    url: '/gallery/160523.jpg',
    title: 'Montaje Profesional',
    category: 'Montaje',
    type: 'image'
  },
  {
    url: '/gallery/2babc03b-758e-4799-902c-e28f1d27d4fd.mp4',
    title: 'Cabina DJ en Acción',
    category: 'Show',
    type: 'video'
  },
  {
    url: '/gallery/Cabina DJ Blanca Diamante Frente.jpeg',
    title: 'Cabina Blanca Diamante',
    category: 'Producto',
    type: 'image'
  },
  {
    url: '/gallery/FE8097BE-2C22-4D19-89BA-407922426329.mp4',
    title: 'Iluminación y Set',
    category: 'Evento',
    type: 'video'
  },
  {
    url: '/gallery/IMG_4921.JPG',
    title: 'Evento Social',
    category: 'Fiesta',
    type: 'image'
  },
  {
    url: '/gallery/IMG_5404.MP4',
    title: 'Highlight del Evento',
    category: 'Video',
    type: 'video'
  },
  {
    url: '/gallery/Cabina DJ Negra Diamante frente.jpeg',
    title: 'Cabina Negra Diamante',
    category: 'Producto',
    type: 'image'
  }
];

export const Gallery: React.FC = () => {
  return (
    <section id="gallery" className="py-24 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold text-white mb-4 tracking-tight"
          >
            GALERÍA DE <span className="text-primary">EVENTOS</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Momentos capturados en las mejores producciones y fiestas.
          </motion.p>
        </div>

        <div className="relative px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {galleryMedia.map((media, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                  <div className="relative group aspect-[9/16] md:aspect-video overflow-hidden rounded-xl bg-gray-900 border border-white/5">
                    {media.type === 'video' ? (
                      <video 
                        src={media.url}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img 
                        src={media.url} 
                        alt={media.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <span className="text-primary text-xs font-bold uppercase tracking-widest mb-2">{media.category}</span>
                      <h3 className="text-white font-display font-bold text-xl">{media.title}</h3>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12 bg-white/10 border-white/10 text-white hover:bg-primary hover:text-white" />
            <CarouselNext className="hidden md:flex -right-12 bg-white/10 border-white/10 text-white hover:bg-primary hover:text-white" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};
