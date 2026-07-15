import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/images/logos/HGBL - DKGN.png';
import { APPLICATIONS_OPEN } from '../../data/constants';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (to: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(to);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const navLinks = [
    { name: 'About', to: 'about' },
    { name: 'Tracks', to: 'tracks' },
    { name: 'Schedule', to: 'schedule' },
    { name: 'Travel', to: 'travel' },
    { name: 'FAQs', to: 'faqs' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-350 ${isScrolled
        ? 'bg-[#eff6eb]/90 border-b border-black/5 shadow-md backdrop-blur-md py-3'
        : 'bg-transparent py-5'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex justify-between items-center h-12">
          {/* Logo */}
          <Link href="#hero" to="hero" smooth={true} onClick={() => handleNavClick('hero')} className="flex items-center gap-2 cursor-pointer">
            <img src={logo} alt="HackGB Logo" className="h-10 lg:h-12 w-auto object-contain transition-transform duration-300 hover:scale-105" />
          </Link>

          {/* Links & CTA */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={`#${link.to}`}
                  to={link.to}
                  smooth={true}
                  duration={500}
                  onClick={() => handleNavClick(link.to)}
                  className="px-4 py-2 rounded-full font-google-text font-medium text-sm text-slate-700 hover:text-[#61A644] hover:bg-slate-100 transition-all cursor-pointer"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <button
              onClick={() => navigate('/apply')}
              className="bg-[#61A644] hover:bg-[#61A644]/90 text-white px-6 py-2.5 rounded-full font-google font-bold text-sm transition-all shadow-[0_4px_14px_rgba(97,166,68,0.35)] hover:shadow-[0_6px_20px_rgba(97,166,68,0.25)] cursor-pointer transform hover:-translate-y-0.5"
            >
              {APPLICATIONS_OPEN ? 'Apply Now' : 'Opening Soon'}
            </button>
          </div>

          {/* Mobile menu and MLH badge */}
          <div className="lg:hidden flex items-center gap-2">
            {/* MLH badge removed for now
            <a className="mt-1.5" style={{ display: 'block', width: '36px' }} href="https://mlh.io/seasons/2026/events?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2026-season&utm_content=white" target="_blank">
              <img src="https://s3.amazonaws.com/logged-assets/trust-badge/2026/mlh-trust-badge-2026-white.svg" alt="Major League Hacking 2026 Hackathon Season" style={{ width: '100%' }} className="drop-shadow-sm" />
            </a>
            */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
              aria-expanded={mobileMenuOpen}
              className="p-1.5 rounded-md focus:outline-none text-slate-800 hover:text-[#61A644] transition-colors"
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

        {/* Mobile Nav Drawer */}
        <div className={`lg:hidden ${mobileMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0 overflow-hidden'} transition-all duration-350 rounded-2xl bg-white border border-black/5 p-4 shadow-xl`}>
          <div className="space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={`#${link.to}`}
                to={link.to}
                smooth={true}
                duration={500}
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleNavClick(link.to);
                }}
                className="text-slate-700 hover:bg-slate-100 hover:text-[#61A644] block px-4 py-2.5 rounded-xl font-google-text font-medium text-sm cursor-pointer"
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/apply');
              }}
              className="w-full bg-[#61A644] text-white block px-4 py-3 rounded-xl font-google font-bold text-center text-sm mt-3 shadow-lg active:scale-95 transition-all cursor-pointer"
            >
              {APPLICATIONS_OPEN ? 'Apply Now' : 'Opening Soon'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;