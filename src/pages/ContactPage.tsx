import { motion } from 'framer-motion';
import { MapPin, Mail, Instagram, Phone } from 'lucide-react';
import InquiryForm from '../components/InquiryForm';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

export default function ContactPage() {
  return (
    <div className="pt-20">
      {/* Header */}
      <section className="bg-gradient-to-br from-rose-50 via-white to-cream-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <span className="inline-block px-4 py-1.5 bg-rose-100 text-rose-600 text-xs font-semibold tracking-widest uppercase rounded-full mb-4">
              Get in Touch
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-800 mb-3">
              Contact Us
            </h1>
            <div className="gold-divider" />
            <p className="text-gray-500 mt-4 max-w-lg mx-auto text-sm">
              We'd love to hear from you. Send us a message and we'll get back to you as soon as possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="lg:col-span-2 space-y-6"
            >
              <h2 className="font-serif text-2xl font-bold text-gray-800">Business Information</h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                Malar Manickam Plastic Wire Baskets — premium handcrafted baskets for home, gifting, and storage.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-rose-50 rounded-2xl">
                  <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-rose-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800 mb-0.5">Address</p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      368, Athangudi, Gandhi Nagar,<br />
                      Aranmanaipatti, Sivagangai,<br />
                      Tamil Nadu, India
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-rose-50 rounded-2xl">
                  <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-rose-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800 mb-0.5">Email</p>
                    <a
                      href="mailto:malarmanickam25@gmail.com"
                      className="text-sm text-rose-500 hover:text-rose-600 transition-colors"
                    >
                      malarmanickam25@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-rose-50 rounded-2xl">
                  <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Instagram className="w-5 h-5 text-rose-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800 mb-0.5">Instagram</p>
                    <a
                      href="https://www.instagram.com/malarmanickam_plastic_basket"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-rose-500 hover:text-rose-600 transition-colors"
                    >
                      @malarmanickam_plastic_basket
                    </a>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="rounded-2xl overflow-hidden shadow-md">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.4!2d78.48!3d9.85!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwNTEnMDAuMCJOIDc4wrAyOCcwMC4wIkU!5e0!3m2!1sen!2sin!4v1"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Location Map - Sivagangai, Tamil Nadu"
                />
              </div>

              {/* Instagram button */}
              <a
                href="https://www.instagram.com/malarmanickam_plastic_basket"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-xl font-semibold text-sm hover:from-rose-600 hover:to-pink-600 transition-all shadow-md hover:shadow-lg"
              >
                <Instagram className="w-4 h-4" />
                Order / Inquire on Instagram
              </a>
            </motion.div>

            {/* Inquiry Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="lg:col-span-3"
              custom={1}
            >
              <InquiryForm />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
