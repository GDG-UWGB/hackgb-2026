import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faInstagram, faLinkedinIn, faYoutube } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  const socialLinks = [
    { name: 'Twitter', icon: faTwitter, href: '#' },
    { name: 'Instagram', icon: faInstagram, href: '#' },
    { name: 'LinkedIn', icon: faLinkedinIn, href: '#' },
    { name: 'YouTube', icon: faYoutube, href: '#' },
  ];

  return (
    <footer className="bg-google-black text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <span className="font-google text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-google-blue to-google-green mb-6 block">
              HackGB 2026
            </span>
            <p className="text-white/60 max-w-sm mb-6 font-google-text">
              Green Bay's first collegiate hackathon. Building a better future, 36 hours at a time.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-google-blue transition-all duration-300 transform hover:-translate-y-1"
                >
                  <span className="sr-only">{social.name}</span>
                  <FontAwesomeIcon icon={social.icon} className="text-lg" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-google font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-white/60 font-google-text">
              <li><a href="#about" className="hover:text-google-green transition-colors">About</a></li>
              <li><a href="#tracks" className="hover:text-google-green transition-colors">Tracks</a></li>
              <li><a href="#schedule" className="hover:text-google-green transition-colors">Schedule</a></li>
              <li><a href="#faqs" className="hover:text-google-green transition-colors">FAQs</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-google font-bold mb-6">Contact</h4>
            <ul className="space-y-4 text-white/60 font-google-text">
              <li>gdg@uwgb.edu</li>
              <li>UW-Green Bay</li>
              <li>Green Bay, WI</li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/40 text-sm">
            © 2026 GDG on Campus UW-Green Bay. All rights reserved.
          </p>
          <div className="flex gap-8 text-white/40 text-sm">
            <a href="https://mlh.io/code-of-conduct" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">MLH Code of Conduct</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;