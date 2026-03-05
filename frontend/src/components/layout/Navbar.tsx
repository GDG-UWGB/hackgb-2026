import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import logo from '../../assets/logo.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', to: 'about' },
    { name: 'Schedule', to: 'schedule' },
    { name: 'Tracks', to: 'tracks' },
    { name: 'FAQs', to: 'faqs' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center gap-6">
            <Link to="hero" smooth={true} className="flex items-center gap-2 group cursor-pointer">
              <img src={logo} alt="HackGB Logo" className="h-16 w-auto object-contain" />
            </Link>

            {/* Top-Left Register Now Button */}
            <Link
              to="register"
              smooth={true}
              className="bg-google-blue hover:bg-google-blue/90 text-white px-5 py-2.5 rounded-full font-google font-bold text-sm transition-all shadow-[0_4px_14px_0_rgba(66,133,244,0.39)] hover:shadow-[0_6px_20px_rgba(66,133,244,0.23)] cursor-pointer flex items-center gap-2 transform hover:scale-105"
            >
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              Register Now
            </Link>
          </div>

          {/* Desktop Nav Links (Moved to the right) */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  smooth={true}
                  duration={500}
                  className="px-4 py-2 text-google-black/70 hover:text-google-blue hover:bg-google-blue/5 rounded-full font-google-text font-medium transition-all cursor-pointer text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-google-black p-2 rounded-md focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'} bg-white border-t`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              smooth={true}
              duration={500}
              onClick={() => setMobileMenuOpen(false)}
              className="text-google-black hover:bg-google-blue/10 hover:text-google-blue block px-3 py-2 rounded-md font-google-text font-medium"
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="register"
            smooth={true}
            onClick={() => setMobileMenuOpen(false)}
            className="w-full bg-google-blue text-white block px-3 py-3 rounded-xl font-google font-medium text-center mt-4 shadow-lg active:scale-95 transition-all"
          >
            Register Now
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;