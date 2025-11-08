import React from "react";
import { Link } from "react-router-dom";
import {
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiYoutube,
  FiMail,
  FiPhone,
  FiMapPin,
} from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-amber-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Business Info */}
          <div>
            <h3 className="text-2xl font-bold text-amber-400 mb-4">XYZABC</h3>
            <p className="text-amber-200 mb-4">
              Beautifully handmade by one artisan. Every piece crafted with
              care, tradition, and a personal touch.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com/XYZABC"
                className="text-amber-300 hover:text-amber-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiFacebook className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/XYZABC"
                className="text-amber-300 hover:text-amber-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiTwitter className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/XYZABC"
                className="text-amber-300 hover:text-amber-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiInstagram className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com/XYZABC"
                className="text-amber-300 hover:text-amber-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiYoutube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-amber-300 hover:text-amber-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-amber-300 hover:text-amber-400 transition-colors"
                >
                  Shop All
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="text-amber-300 hover:text-amber-400 transition-colors"
                >
                  Request Custom Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Customer Support</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/contact"
                  className="text-amber-300 hover:text-amber-400 transition-colors"
                >
                  Contact Me
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-amber-300 hover:text-amber-400 transition-colors"
                >
                  About Me
                </Link>
              </li>

              <li>
                <Link
                  to="/faq"
                  className="text-amber-300 hover:text-amber-400 transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <FiMapPin className="h-5 w-5 text-amber-300 mr-2" />
                <span className="text-amber-200">
                  Mumbai, Maharashtra, India
                </span>
              </div>
              <div className="flex items-center">
                <FiPhone className="h-5 w-5 text-amber-300 mr-2" />
                <span className="text-amber-200">+91 9140847529</span>
              </div>
              <div className="flex items-center">
                <FiMail className="h-5 w-5 text-amber-300 mr-2" />
                <span className="text-amber-200">hello@XYZABC.in</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-amber-700 mt-8 pt-8 text-center">
          <p className="text-amber-400 text-sm">
            &copy; 2025 XYZABC. Handmade with heart in Mumbai, India. |
            <Link to="/privacy" className="hover:text-amber-300 ml-1">
              Privacy Policy
            </Link>{" "}
            |
            <Link to="/terms" className="hover:text-amber-300 ml-1">
              Terms of Service
            </Link>
          </p>
        </div>

        <div className="text-center mt-2">
          <p className="text-xs text-amber-300 italic">
            Thank you for supporting a artisan business. Every order, review,
            and referral helps me grow!
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
