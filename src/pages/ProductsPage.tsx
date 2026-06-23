import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Instagram, Search } from 'lucide-react';
import { supabase, type Product } from '../lib/supabase';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    supabase
      .from('products')
      .select('*')
      .order('sort_order')
      .then(({ data }) => {
        setProducts(data ?? []);
        setLoading(false);
      });
  }, []);

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="bg-gradient-to-br from-rose-50 via-white to-cream-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <span className="inline-block px-4 py-1.5 bg-rose-100 text-rose-600 text-xs font-semibold tracking-widest uppercase rounded-full mb-4">
              Collections
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-800 mb-3">
              Our Products
            </h1>
            <div className="gold-divider" />
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">
              Discover our handcrafted plastic wire basket collections — each piece made with care and attention to detail.
            </p>
          </motion.div>

          {/* Search */}
          <div className="mt-8 max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 outline-none bg-white text-sm"
            />
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="rounded-2xl bg-gray-100 animate-pulse aspect-[4/5]" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <ShoppingBagIcon />
              <p className="mt-4 text-lg">No products found.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {filtered.map((product, i) => (
                <motion.div
                  key={product.id}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="card-hover bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm group"
                >
                  <Link to={`/products/${product.id}`}>
                    <div className="relative overflow-hidden aspect-[4/3] bg-gray-50">
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3 flex flex-col gap-2">
                        {product.available ? (
                          <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                            Available
                          </span>
                        ) : (
                          <span className="bg-gray-100 text-gray-500 text-xs font-semibold px-3 py-1 rounded-full">
                            Out of Stock
                          </span>
                        )}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-6">
                      <h2 className="font-serif text-xl font-semibold text-gray-800 mb-1">{product.name}</h2>
                      <p className="text-xs text-amber-600 font-medium mb-2">{product.size}</p>
                      <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 mb-4">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-2xl font-bold text-rose-600">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                        <span className="flex items-center gap-1 text-rose-500 text-sm font-medium group-hover:gap-2 transition-all">
                          View Details <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Instagram CTA */}
      <section className="py-14 bg-rose-50">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <Instagram className="w-10 h-10 text-rose-400 mx-auto mb-3" />
          <h3 className="font-serif text-2xl font-bold text-gray-800 mb-3">
            Want to Order or Need Custom Designs?
          </h3>
          <p className="text-gray-500 mb-6 text-sm">
            Contact us directly on Instagram for orders, custom baskets, pricing, and more.
          </p>
          <a
            href="https://www.instagram.com/malarmanickam_plastic_basket"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2"
          >
            <Instagram className="w-4 h-4" />
            Contact on Instagram
          </a>
        </div>
      </section>
    </div>
  );
}

function ShoppingBagIcon() {
  return (
    <svg className="w-16 h-16 mx-auto text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  );
}
