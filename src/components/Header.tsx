import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900 shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 py-4 sm:py-6">
        <div className="flex justify-between items-center">
          <a href="#" onClick={(e) => { e.preventDefault(); scrollToTop(); }} className="flex items-center space-x-2 cursor-pointer">
            <Zap size={32} className="text-blue-400" />
            <span className="text-2xl font-bold gradient-text">CLKK</span>
          </a>
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li><a href="#features" className="hover:text-blue-400 transition-colors">Features</a></li>
              <li><a href="#benefits" className="hover:text-blue-400 transition-colors">Benefits</a></li>
              <li>
                <Link to="/signup" className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-full transition-colors">
                  Join Waitlist
                </Link>
              </li>
            </ul>
          </nav>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {isMenuOpen && (
          <nav className="mt-4 md:hidden">
            <ul className="flex flex-col space-y-4">
              <li><a href="#features" className="hover:text-blue-400 transition-colors" onClick={() => setIsMenuOpen(false)}>Features</a></li>
              <li><a href="#benefits" className="hover:text-blue-400 transition-colors" onClick={() => setIsMenuOpen(false)}>Benefits</a></li>
              <li>
                <Link
                  to="/signup"
                  className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-full transition-colors inline-block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Join Waitlist
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;