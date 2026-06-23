import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Instagram, CheckCircle, Tag, Maximize } from 'lucide-react';
import { supabase, type Product } from '../lib/supabase';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState(false);

  useEffect(() => {
    if (!id) return;
    supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .maybeSingle()
      .then(({ data }) => {
        setProduct(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-serif text-2xl text-gray-600 mb-4">Product not found</h2>
          <Link to="/products" className="btn-primary">Back to Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back */}
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-rose-500 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="relative bg-gray-50 rounded-3xl overflow-hidden aspect-square shadow-lg cursor-pointer group"
              onClick={() => setLightbox(true)}
            >
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-500"
              />
              <button className="absolute top-4 right-4 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow">
                <Maximize className="w-4 h-4 text-gray-600" />
              </button>
              {product.available ? (
                <span className="absolute top-4 left-4 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                  In Stock
                </span>
              ) : (
                <span className="absolute top-4 left-4 bg-gray-100 text-gray-500 text-xs font-semibold px-3 py-1 rounded-full">
                  Out of Stock
                </span>
              )}
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center"
          >
            <span className="text-xs text-amber-600 font-semibold tracking-widest uppercase mb-3 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5" /> Handcrafted Collection
            </span>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-800 mb-2">{product.name}</h1>
            <p className="text-gray-400 text-sm mb-4">{product.size}</p>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-serif text-4xl font-bold text-rose-600">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              <span className="text-sm text-gray-400">per set</span>
            </div>

            <p className="text-gray-600 leading-relaxed mb-8">{product.description}</p>

            <ul className="space-y-2 mb-8">
              {[
                'Premium quality plastic wire',
                'Durable and long-lasting',
                'Lightweight and easy to maintain',
                'Custom designs available on request',
              ].map((feature) => (
                <li key={feature} className="flex items-center gap-2.5 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://www.instagram.com/malarmanickam_plastic_basket"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center justify-center gap-2"
              >
                <Instagram className="w-4 h-4" />
                Contact on Instagram
              </a>
              <a
                href="mailto:malarmanickam25@gmail.com"
                className="btn-outline flex items-center justify-center gap-2"
              >
                Send Inquiry
              </a>
            </div>

            <p className="text-xs text-gray-400 mt-4 text-center sm:text-left">
              Contact us via Instagram or email for pricing, custom orders, and bulk purchases.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(false)}
        >
          <img
            src={product.image_url}
            alt={product.name}
            className="max-w-full max-h-full object-contain rounded-2xl"
          />
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white text-2xl font-light"
            onClick={() => setLightbox(false)}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
