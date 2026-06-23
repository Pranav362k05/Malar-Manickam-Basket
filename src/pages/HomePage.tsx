import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, CheckCircle, Instagram, ShoppingBag, Award, Truck, HeartHandshake } from 'lucide-react';
import { supabase, type Product } from '../lib/supabase';
import InquiryForm from '../components/InquiryForm';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    supabase
      .from('products')
      .select('*')
      .eq('featured', true)
      .eq('available', true)
      .order('sort_order')
      .limit(4)
      .then(({ data }) => setProducts(data ?? []));
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-cream-50 via-white to-rose-50 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-0 w-96 h-96 bg-rose-100 rounded-full blur-3xl opacity-40" />
          <div className="absolute bottom-20 left-0 w-80 h-80 bg-amber-100 rounded-full blur-3xl opacity-30" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" animate="visible" variants={fadeUp}>
              <span className="inline-block px-4 py-1.5 bg-rose-100 text-rose-600 text-xs font-semibold tracking-widest uppercase rounded-full mb-6">
                Handcrafted with Love
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight mb-6">
                Beautiful
                <span className="block text-rose-500">Plastic Wire</span>
                <span className="block text-amber-600">Baskets</span>
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-lg">
                Premium handcrafted baskets for home, gifting, and storage. Made with care in Sivagangai, Tamil Nadu.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/products" className="btn-primary">
                  Explore Collection
                </Link>
                <a
                  href="https://www.instagram.com/malarmanickam_plastic_basket"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline inline-flex items-center gap-2"
                >
                  <Instagram className="w-4 h-4" />
                  Follow on Instagram
                </a>
              </div>
              <div className="flex items-center gap-6 mt-10">
                <div className="text-center">
                  <div className="font-serif text-2xl font-bold text-gray-800">100+</div>
                  <div className="text-xs text-gray-500 mt-0.5">Designs</div>
                </div>
                <div className="w-px h-8 bg-gray-200" />
                <div className="text-center">
                  <div className="font-serif text-2xl font-bold text-gray-800">500+</div>
                  <div className="text-xs text-gray-500 mt-0.5">Happy Customers</div>
                </div>
                <div className="w-px h-8 bg-gray-200" />
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                  <span className="text-xs text-gray-500 ml-1">Premium Quality</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -top-4 -right-4 w-full h-full bg-rose-100 rounded-3xl" />
              <img
                src="/WhatsApp_Image_2026-06-03_at_3.11.35_PM.jpeg"
                alt="Malar Manickam Plastic Wire Baskets"
                className="relative w-full rounded-3xl shadow-2xl object-cover aspect-[4/3]"
              />
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                  <Award className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-800">Premium Quality</div>
                  <div className="text-xs text-gray-500">Handcrafted Baskets</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { icon: Award, title: 'Premium Quality', desc: 'Crafted with top-grade plastic wire for lasting durability and beauty.' },
              { icon: HeartHandshake, title: 'Custom Designs', desc: 'Personalized basket designs available for any occasion or requirement.' },
              { icon: Truck, title: 'Delivery Available', desc: 'We deliver across Tamil Nadu and beyond. Contact us for details.' },
            ].map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="text-center p-6"
              >
                <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-rose-500" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-gray-800 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Snippet */}
      <section className="py-20 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="/WhatsApp_Image_2026-06-03_at_3.11.35_PM.jpeg"
                  alt="Purple wire baskets"
                  className="rounded-2xl shadow-lg object-cover w-full aspect-square"
                />
                <img
                  src="/WhatsApp_Image_2026-06-03_at_3.11.34_PM.jpeg"
                  alt="Golden wire baskets"
                  className="rounded-2xl shadow-lg object-cover w-full aspect-square mt-8"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-700 text-xs font-semibold tracking-widest uppercase rounded-full mb-4">
                Our Story
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-800 mb-5 leading-tight">
                Crafting Baskets with <span className="text-rose-500">Passion & Precision</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Welcome to Malar Manickam Plastic Wire Baskets — your trusted destination for beautifully handcrafted baskets designed to combine style, durability, and everyday functionality.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Premium-quality plastic wire craftsmanship',
                  'Strong, durable, and long-lasting products',
                  'Wide range of sizes and color combinations',
                  'Customized basket designs available on request',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-rose-500 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/about" className="btn-primary inline-flex items-center gap-2">
                Read More <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {products.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-center mb-12"
            >
              <h2 className="section-title">Featured Products</h2>
              <div className="gold-divider" />
              <p className="section-subtitle">Explore our handcrafted plastic wire basket collections</p>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8">
              {products.map((product, i) => (
                <motion.div
                  key={product.id}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="card-hover bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm"
                >
                  <Link to={`/products/${product.id}`} className="block">
                    <div className="relative overflow-hidden aspect-[4/3] bg-gray-50">
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-contain hover:scale-105 transition-transform duration-500 p-4"
                      />
                      {product.available ? (
                        <span className="absolute top-3 right-3 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                          Available
                        </span>
                      ) : (
                        <span className="absolute top-3 right-3 bg-gray-100 text-gray-500 text-xs font-semibold px-3 py-1 rounded-full">
                          Out of Stock
                        </span>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="font-serif text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
                      <p className="text-sm text-gray-500 mb-1">{product.size}</p>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-2xl font-bold text-rose-600">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-rose-500 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
                          View Details <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link to="/products" className="btn-outline">
                View All Products
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Instagram CTA */}
      <section className="py-20 bg-gradient-to-r from-rose-500 to-rose-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <Instagram className="w-12 h-12 text-white/80 mx-auto mb-4" />
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
              Follow Us on Instagram
            </h2>
            <p className="text-rose-100 text-lg mb-8 max-w-xl mx-auto">
              Stay updated with our latest designs, new arrivals, and special offers. Contact us through Instagram for orders and custom designs.
            </p>
            <a
              href="https://www.instagram.com/malarmanickam_plastic_basket"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-rose-600 px-8 py-3 rounded-full font-semibold text-sm uppercase tracking-wide hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
            >
              <Instagram className="w-4 h-4" />
              @malarmanickam_plastic_basket
            </a>
          </motion.div>
        </div>
      </section>

      {/* Contact / Inquiry Form */}
      <section className="py-20 bg-cream-50" id="inquiry">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-10"
          >
            <h2 className="section-title">Send an Inquiry</h2>
            <div className="gold-divider" />
            <p className="section-subtitle">Have a question or custom order? We'll get back to you soon.</p>
          </motion.div>
          <InquiryForm />
        </div>
      </section>
    </div>
  );
}
