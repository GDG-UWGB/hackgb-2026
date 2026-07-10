import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faInstagram, faLinkedinIn, faYoutube } from '@fortawesome/free-brands-svg-icons';
import logo from '../../assets/images/logos/logo-phx.png';
import gdgLogo from '../../assets/images/gdg/GDG On Campus - Horizontal - Light.png';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const socialLinks = [
    { name: 'Twitter', icon: faTwitter, href: '#' },
    { name: 'Instagram', icon: faInstagram, href: '#' },
    { name: 'LinkedIn', icon: faLinkedinIn, href: '#' },
    { name: 'YouTube', icon: faYoutube, href: '#' },
  ];

  const handleQuickLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, to: string) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(to);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(to);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="relative bg-[#eff6eb] text-slate-800 py-20 px-4 overflow-hidden border-t border-black/5">
      {/* Subtle glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#61A644]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex flex-wrap items-center gap-3.5 mb-4">
              <img src={logo} alt="HackGB Logo" className="h-12 w-auto object-contain opacity-90" />
              <div className="h-8 w-[1px] bg-slate-300" />
              <a href="https://gdg.uwgb.edu/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                <img src={gdgLogo} alt="GDG UWGB Logo" className="h-12 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity" />
              </a>
            </div>
            <span className="font-google text-3xl font-bold text-[#0C3C34] mb-2 block">
              HackGB 2026
            </span>
            <p className="text-[#E37100] text-xs font-google font-bold mb-4">
              UWGB's Premier Collegiate Hackathon
            </p>
            <p className="text-slate-600 max-w-sm mb-6 font-google-text">
              A mythical 24-hour coding journey across Green Bay. Building a better future at the STEM Innovation Center.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-white border border-black/5 flex items-center justify-center hover:bg-[#61A644]/10 hover:border-[#61A644]/20 transition-all duration-300 transform hover:-translate-y-1 text-slate-500 hover:text-[#61A644]"
                >
                  <span className="sr-only">{social.name}</span>
                  <FontAwesomeIcon icon={social.icon} className="text-lg" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-google font-bold mb-6 text-[#61A644]">Quick Links</h4>
            <ul className="space-y-4 text-slate-600 font-google-text">
              <li><a href="#about" onClick={(e) => handleQuickLinkClick(e, 'about')} className="hover:text-[#61A644] transition-colors">About</a></li>
              <li><a href="#tracks" onClick={(e) => handleQuickLinkClick(e, 'tracks')} className="hover:text-[#61A644] transition-colors">Tracks</a></li>
              <li><a href="#schedule" onClick={(e) => handleQuickLinkClick(e, 'schedule')} className="hover:text-[#61A644] transition-colors">Schedule</a></li>
              <li><a href="#faqs" onClick={(e) => handleQuickLinkClick(e, 'faqs')} className="hover:text-[#61A644] transition-colors">FAQs</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-google font-bold mb-6 text-[#61A644]">Contact</h4>
            <ul className="space-y-4 text-slate-600 font-google-text">
              <li>
                <a href="mailto:contact@hackgb.com" className="hover:text-[#61A644] transition-colors">
                  contact@hackgb.com
                </a>
              </li>
              <li>UW-Green Bay</li>
              <li>Green Bay, WI</li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-slate-500 text-sm font-google-text">
            © 2026 GDG on Campus UW-Green Bay. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-slate-500 text-sm font-google-text">
            <Link to="/code-of-conduct" className="hover:text-slate-800 transition-colors">HackGB Code of Conduct</Link>
            <a href="https://mlh.io/code-of-conduct" target="_blank" rel="noopener noreferrer" className="hover:text-slate-800 transition-colors">MLH Code of Conduct</a>
            <Link to="/privacy-policy" className="hover:text-slate-800 transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;