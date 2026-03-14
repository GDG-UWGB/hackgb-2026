import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faInstagram, faLinkedin, faFacebook } from '@fortawesome/free-brands-svg-icons';
import GDGLogo from '../../assets/images/GDG-Logo-Horizontal-Light.svg'; // Ensure this path is correct

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // Mobile menu state
  const [isVisible, setIsVisible] = useState(true); // Scroll visibility state
  const lastScrollY = useRef(0); // Track last scroll position
  const location = useLocation(); // To determine active page

  // --- 1. Smart Scroll Behavior (Hide on Down, Show on Up) ---
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show navbar if at the very top or scrolling UP
      if (currentScrollY < 10 || currentScrollY < lastScrollY.current) {
        setIsVisible(true);
      } else {
        // Hide navbar if scrolling DOWN and not at the top
        setIsVisible(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- 2. Lock Body Scroll when Mobile Menu is Open ---
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  // --- Helper: Nav Link Component ---
  const NavLink = ({ to, name, external = false }: { to: string; name: string; external?: boolean }) => {
    const isActive = location.pathname === to;
    
    return (
      <Link
        to={to}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        onClick={() => setIsOpen(false)} // Close mobile menu on link click
        className={`relative px-4 py-2 text-base font-medium rounded-lg transition-all duration-200
        ${isActive 
          ? 'text-gray-900' // Active text color
          : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100' // Inactive hover state
        }`}
      >
        {name}
        {/* The Thin Blue Bottom Border for Active State */}
        {isActive && (
          <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-google-blue rounded-t-full" />
        )}
      </Link>
    );
  };

  return (
    <>
      {/* --- MAIN NAVBAR --- */}
      <nav
        className={`fixed top-0 z-50 w-full h-16 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-xs transition-transform duration-300 ease-in-out
        ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
      >
        {/* Full width container with small padding, mimicking Google's "border-hugging" layout */}
        <div className="w-full px-4 md:px-6 h-16 flex items-center justify-between">

          {/* LEFT SIDE: Hamburger (Mobile) + Logo + Desktop Links */}
          <div className="flex items-center md:gap-8 h-full">
            
            {/* Mobile Hamburger Button (Left aligned) */}
            <button
              onClick={() => setIsOpen(true)}
              className="md:hidden p-3 -ml-3 text-google-black hover:border-google-blue border-3 border-transparent rounded-md transition-colors focus:outline-none"
              aria-label="Open menu"
            >
              <div className="flex flex-col w-6">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>
              </div>
              
            </button>

            {/* Logo */}
            <Link to="/" className="shrink-0" onClick={() => setIsOpen(false)}>
              <img
                src={GDGLogo}
                alt="GDG Logo"
                className="h-12 md:h-14 w-auto object-contain" // Slightly smaller, cleaner look
              />
            </Link>

            {/* Desktop Navigation Links (Immediately after logo) */}
            <div className="hidden md:flex items-center gap-1 ml-2">
              <NavLink to="/" name="Overview"/>
              <NavLink to="/faqs" name="FAQs" />
              <NavLink to="https://gdg.community.dev/gdg-on-campus-university-of-wisconsin-green-bay/#fLxJTacAdHH" name="Team" external />
              {/* Add more links here if needed */}
            </div>
          </div>

          {/* RIGHT SIDE: Call to Action */}
          <div className="hidden md:block">
            <Link
              to="https://gdg.community.dev/gdg-on-campus-university-of-wisconsin-green-bay/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 text-sm font-medium text-google-blue border border-google-blue rounded-full hover:bg-google-blue hover:text-white hover:border-transparent transition-all duration-300"
            >
              Get event updates
            </Link>
          </div>

          {/* Mobile Right Spacer (to keep logo centered-ish if needed, or just empty) */}
          <div className="md:hidden w-8" /> 
        </div>
      </nav>

      {/* --- MOBILE DRAWER MENU --- */}
      {/* Backdrop (The "Click outside to close" area) */}
      <div 
        className={`fixed inset-0 z-60 bg-black/20 backdrop-blur-[1px] transition-opacity duration-300
        ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)} // Clicking here closes the menu
      />

      {/* The Drawer Panel (75% Width) */}
      <div
        className={`fixed inset-y-0 left-0 z-70 w-[75%] max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ease-out flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Mobile Header: Logo */}
        {/* <div className="px-6 h-16 flex items-center border-b border-gray-50">
          <img src={GDGLogo} alt="GDG Logo" className="h-12 w-auto" />
        </div> */}
        
        <Link to="/" className="px-6 h-16 flex items-center border-b border-gray-50" onClick={() => setIsOpen(false)}>
            <img
            src={GDGLogo}
            alt="GDG Logo"
            className="h-12 w-auto object-contain" // Slightly smaller, cleaner look
            />
        </Link>


        {/* Mobile Links List */}
        <div className="flex-1 overflow-y-auto py-6 px-6 flex flex-col gap-6">
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/" 
              onClick={() => setIsOpen(false)}
              className={`text-lg font-medium ${location.pathname === '/' ? 'text-google-blue' : 'text-gray-700'}`}
            >
              Overview
            </Link>
            <Link 
              to="/faqs" 
              onClick={() => setIsOpen(false)}
              className={`text-lg font-medium ${location.pathname === '/faqs' ? 'text-google-blue' : 'text-gray-700'}`}
            >
              FAQs
            </Link>
            <Link 
                to="https://gdg.community.dev/gdg-on-campus-university-of-wisconsin-green-bay/#fLxJTacAdHH" 
                target="_blank" 
                rel="noopener noreferrer" 
                onClick={() => setIsOpen(false)} 
                className="text-lg font-medium text-gray-700"
            >
              Team
            </Link>
          </nav>
        </div>

        {/* Mobile Footer: Socials + CTA */}
        <div className="p-6 bg-gray-50 border-t border-gray-100">
           {/* Social Icons */}
           <div className="flex gap-6 mb-6 text-gray-500">
              <a href="https://github.com/GDG-UWGB" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faGithub} style={{fontSize: '22px'}} /></a>
              <a href="https://linkedin.com/company/gdg-uwgb" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedin} style={{fontSize: '22px'}} /></a>
              <a href="https://instagram.com/gdg.uwgb" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram} style={{fontSize: '22px'}} /></a>
              <a href="https://facebook.com/gdg.uwgb" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebook} style={{fontSize: '22px'}} /></a>
           </div>

           {/* Mobile CTA Button */}
           <Link
              to="https://gdg.community.dev/gdg-on-campus-university-of-wisconsin-green-bay/"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center py-3 text-sm font-bold text-white bg-google-blue rounded-full hover:bg-blue-700 transition-colors"
           >
              Get event updates
           </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;