import { motion } from 'framer-motion';
import { CheckCircle, Instagram, Mail, MapPin } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-gradient-to-br from-rose-50 via-white to-cream-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <span className="inline-block px-4 py-1.5 bg-rose-100 text-rose-600 text-xs font-semibold tracking-widest uppercase rounded-full mb-6">
              Our Story
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              About Malar Manickam<br />
              <span className="text-rose-500">Plastic Wire Baskets</span>
            </h1>
            <div className="gold-divider" />
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="prose max-w-none"
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="font-serif text-2xl font-bold text-gray-800 mb-4">Welcome to Our World</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Welcome to Malar Manickam Plastic Wire Baskets, your trusted destination for beautifully handcrafted plastic wire baskets designed to combine style, durability, and everyday functionality.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  At Malar Manickam Plastic Wire Baskets, we believe that storage solutions should be both practical and visually appealing. Our collection features a wide range of handcrafted plastic wire baskets carefully made with attention to detail, ensuring quality, strength, and long-lasting performance.
                </p>
              </div>
              <div>
                <img
                  src="/WhatsApp_Image_2026-06-03_at_3.11.35_PM.jpeg"
                  alt="Purple wire baskets"
                  className="rounded-2xl shadow-lg w-full object-contain bg-gray-50 p-4"
                />
              </div>
            </div>

            <div className="bg-cream-50 rounded-3xl p-8 mb-14">
              <p className="text-gray-700 leading-relaxed mb-4">
                Our journey began with a passion for creating durable and attractive baskets that help organize everyday life while adding a touch of elegance to homes. Every basket is crafted using premium-quality plastic wire materials that provide excellent strength, flexibility, and resistance to daily wear and tear. The result is a product that is lightweight, easy to maintain, and built to last.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We proudly offer baskets in various shapes, sizes, colors, and designs to meet the diverse needs of our customers. From compact baskets for household essentials to larger storage solutions for clothes, toys, kitchen items, and gifts, our products are designed to bring convenience and beauty into every space.
              </p>
            </div>

            {/* Why Choose Us */}
            <div className="mb-14">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-800 mb-2 text-center">
                Why Choose Malar Manickam Plastic Wire Baskets?
              </h2>
              <div className="gold-divider" />
              <div className="grid sm:grid-cols-2 gap-4 mt-8">
                {[
                  'Premium-quality plastic wire craftsmanship',
                  'Strong, durable, and long-lasting products',
                  'Attractive and modern designs',
                  'Wide range of sizes and color combinations',
                  'Suitable for home, office, gifting, and storage',
                  'Affordable pricing without compromising quality',
                  'Customized basket designs available upon request',
                  'Dedicated customer support and personalized service',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 p-4 bg-rose-50 rounded-xl">
                    <CheckCircle className="w-5 h-5 text-rose-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Products */}
            <div className="mb-14">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-800 mb-2 text-center">
                Our Products
              </h2>
              <div className="gold-divider" />
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
                {[
                  'Storage Baskets',
                  'Utility Baskets',
                  'Gift Baskets',
                  'Decorative Baskets',
                  'Household Organization Baskets',
                  'Kitchen Storage Baskets',
                  'Laundry Baskets',
                  'Customized Plastic Wire Basket Designs',
                  'Festival and Special Occasion Gift Hampers',
                ].map((product) => (
                  <div
                    key={product}
                    className="bg-white border border-gray-100 rounded-xl p-3 text-center text-sm text-gray-600 shadow-sm hover:border-rose-200 hover:shadow-md transition-all"
                  >
                    {product}
                  </div>
                ))}
              </div>
            </div>

            {/* Commitment */}
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-14">
              <div>
                <img
                  src="/WhatsApp_Image_2026-06-03_at_3.11.34_PM.jpeg"
                  alt="Golden wire baskets"
                  className="rounded-2xl shadow-lg w-full object-contain bg-gray-50 p-4"
                />
              </div>
              <div>
                <h2 className="font-serif text-2xl font-bold text-gray-800 mb-4">Our Commitment</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Customer satisfaction remains at the heart of everything we do. We continuously strive to provide products that exceed expectations in quality, design, and functionality. Our goal is to help customers find practical storage solutions that are both elegant and affordable.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Through our Instagram page, <strong>@malarmanickam_plastic_basket</strong>, we regularly showcase our latest creations, new arrivals, customer favorites, and custom orders. We invite everyone to explore our collection and discover baskets that perfectly suit their needs.
                </p>
              </div>
            </div>

            {/* Connect */}
            <div className="bg-gradient-to-r from-rose-50 to-amber-50 rounded-3xl p-8 text-center">
              <h2 className="font-serif text-2xl font-bold text-gray-800 mb-4">Connect With Us</h2>
              <p className="text-gray-600 leading-relaxed mb-6 max-w-xl mx-auto">
                Follow us on Instagram to stay updated with our newest designs, product launches, and special offers. We're always happy to assist with inquiries, custom orders, pricing details, and bulk purchase requirements.
              </p>
              <a
                href="https://www.instagram.com/malarmanickam_plastic_basket"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-rose-500 text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-rose-600 transition-colors mb-8"
              >
                <Instagram className="w-4 h-4" />
                @malarmanickam_plastic_basket
              </a>
              <div className="grid sm:grid-cols-2 gap-4 mt-4 text-sm text-gray-600">
                <div className="flex items-start gap-2 justify-center sm:justify-start">
                  <MapPin className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />
                  <span>368, Athangudi, Gandhi Nagar, Aranmanaipatti, Sivagangai, Tamil Nadu, India</span>
                </div>
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <Mail className="w-4 h-4 text-rose-400 flex-shrink-0" />
                  <a href="mailto:malarmanickam25@gmail.com" className="hover:text-rose-500 transition-colors">
                    malarmanickam25@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <p className="text-center text-gray-500 text-sm mt-10 leading-relaxed">
              Thank you for choosing Malar Manickam Plastic Wire Baskets. We look forward to bringing quality craftsmanship, creativity, and convenience into your home through our handcrafted basket collection.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
