import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { supabase, type GalleryImage } from '../lib/supabase';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.4 } }),
};

const categories = ['All', 'collections', 'new arrivals', 'featured', 'general'];

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<GalleryImage | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    supabase
      .from('gallery_images')
      .select('*')
      .order('sort_order')
      .then(({ data }) => {
        setImages(data ?? []);
        setLoading(false);
      });
  }, []);

  const filtered =
    activeCategory === 'All'
      ? images
      : images.filter((img) => img.category === activeCategory);

  const availableCategories = ['All', ...Array.from(new Set(images.map((img) => img.category)))];

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="bg-gradient-to-br from-rose-50 via-white to-cream-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <span className="inline-block px-4 py-1.5 bg-rose-100 text-rose-600 text-xs font-semibold tracking-widest uppercase rounded-full mb-4">
              Gallery
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-800 mb-3">
              Our Gallery
            </h1>
            <div className="gold-divider" />
            <p className="text-gray-500 mt-4 max-w-lg mx-auto text-sm">
              Browse through our beautiful collection of handcrafted plastic wire baskets.
            </p>
          </motion.div>

          {/* Category filter */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {availableCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium capitalize transition-all ${
                  activeCategory === cat
                    ? 'bg-rose-500 text-white shadow-md'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-rose-300 hover:text-rose-500'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="rounded-2xl bg-gray-100 animate-pulse aspect-square" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p>No images in this category yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map((img, i) => (
                <motion.div
                  key={img.id}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className={`relative group cursor-pointer overflow-hidden rounded-2xl bg-gray-50 shadow-sm hover:shadow-xl transition-all duration-300 ${
                    img.featured ? 'md:col-span-2 md:row-span-2' : ''
                  }`}
                  onClick={() => setSelected(img)}
                >
                  <div className={`${img.featured ? 'aspect-square' : 'aspect-square'} overflow-hidden`}>
                    <img
                      src={img.image_url}
                      alt={img.title}
                      className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div>
                      <p className="text-white text-sm font-medium">{img.title}</p>
                      {img.featured && (
                        <span className="text-xs text-amber-300">Featured</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-3xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selected.image_url}
                alt={selected.title}
                className="w-full rounded-2xl object-contain max-h-[80vh] bg-gray-900"
              />
              <div className="mt-3 text-center">
                <p className="text-white font-medium">{selected.title}</p>
                <p className="text-gray-400 text-sm capitalize">{selected.category}</p>
              </div>
              <button
                className="absolute -top-10 right-0 text-white/80 hover:text-white transition-colors"
                onClick={() => setSelected(null)}
              >
                <X className="w-6 h-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
