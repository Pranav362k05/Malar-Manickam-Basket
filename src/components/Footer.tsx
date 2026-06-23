import { Link } from 'react-router-dom';
import { ShoppingBag, Instagram, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full bg-rose-500 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-serif font-bold text-white text-sm leading-tight">Malar Manickam</div>
                <div className="text-xs text-amber-400">Plastic Wire Baskets</div>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Premium handcrafted plastic wire baskets for home, gifting, and storage. Quality craftsmanship from Sivagangai, Tamil Nadu.
            </p>
            <a
              href="https://www.instagram.com/malarmanickam_plastic_basket"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-sm text-rose-400 hover:text-rose-300 transition-colors"
            >
              <Instagram className="w-4 h-4" />
              @malarmanickam_plastic_basket
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-white font-semibold mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { label: 'Home', to: '/' },
                { label: 'About Us', to: '/about' },
                { label: 'Products', to: '/products' },
                { label: 'Gallery', to: '/gallery' },
                { label: 'Contact Us', to: '/contact' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-gray-400 hover:text-rose-400 transition-colors hover:pl-1 duration-200 block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-white font-semibold mb-4 text-lg">Contact Us</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 mt-0.5 text-rose-400 flex-shrink-0" />
                <span>368, Athangudi, Gandhi Nagar, Aranmanaipatti, Sivagangai, Tamil Nadu, India</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-rose-400 flex-shrink-0" />
                <a href="mailto:malarmanickam25@gmail.com" className="hover:text-rose-400 transition-colors">
                  malarmanickam25@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Instagram className="w-4 h-4 text-rose-400 flex-shrink-0" />
                <a
                  href="https://www.instagram.com/malarmanickam_plastic_basket"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-rose-400 transition-colors"
                >
                  @malarmanickam_plastic_basket
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Malar Manickam Plastic Wire Baskets. All rights reserved.</p>
          <Link to="/admin" className="text-gray-600 hover:text-gray-400 transition-colors text-xs">
            Admin Login
          </Link>
        </div>
      </div>
    </footer>
  );
}
