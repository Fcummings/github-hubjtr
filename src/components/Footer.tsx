import React from 'react';
import { Facebook, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="mb-4 sm:mb-0">
            <p className="text-gray-400">&copy; 2024 CLKK. All rights reserved.</p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors"><Facebook size={24} /></a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors"><Twitter size={24} /></a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors"><Instagram size={24} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;