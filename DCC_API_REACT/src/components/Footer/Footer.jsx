
import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white hover:bg-gray-900">
      <div className="container mx-auto py-10 px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* About Section */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-3xl font-bold mb-4 text-orange-500">Davangere Cycling Club</h2>
          <p className="text-sm leading-relaxed">
          Fostering health, fitness, and community spirit through the joy of cycling. Be part of our journey with regular rides, exciting events, and lifelong connections.          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-xl font-bold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:text-orange-400 text-sm">Home</a>
            </li>
            <li>
              <a href="/about" className="hover:text-orange-400 text-sm">About Us</a>
            </li>
            <li>
              <a href="/signup" className="hover:text-orange-400 text-sm">Sign-Up</a>
            </li>
            <li>
              <a href="/contact" className="hover:text-orange-400 text-sm">Contact</a>
            </li>
          </ul>
        </div>

        {/* Contact & Social Links */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-xl font-bold mb-4">Contact Us</h2>
          <p className="text-sm mb-2">
            Email: <a href="mailto:info@cyclingclub.com" className="hover:text-orange-400">pavanbangher@gmail.com</a>
          </p>
          <p className="text-sm mb-4">
            Phone: <a href="tel:+7411068393" className="hover:text-orange-400">+7 411 068 393</a>
          </p>
          <div className="mt-6">
            <h2 className="text-gray-200 font-semibold mb-4">Follow Us</h2>
            <div className="flex space-x-6">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-blue-600 transition-colors duration-200">
                <FaFacebookF size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-blue-400 transition-colors duration-200">
                <FaTwitter size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-pink-600 transition-colors duration-200">
                <FaInstagram size={24} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-blue-700 transition-colors duration-200">
                <FaLinkedinIn size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-gray-900 py-4 text-center text-sm">
        <p className="text-orange-600 font-bold">
          &copy; {new Date().getFullYear()} Davangere Cycling Club. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
