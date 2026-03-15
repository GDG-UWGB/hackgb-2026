import { useState } from "react";
import { Email } from "../../data/constants";
import GDGLogo from '../../assets/images/GDG-Logo-Horizontal-Light.svg';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faInstagram, faLinkedin, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faClipboard } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {

  // Copy functionality
  const [isCopied, setIsCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(Email);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
  };


  return (
    <footer id='footer' className="bg-white pt-8 mx-0 px-0 bottom-0 ">

      <hr className="w-full text-google-off-white border-b-2" />

      <div className="container my-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between pl-2">

          <div className="w-full md:w-1/3 lg:w-1/4 mb-8 -ml-2">
            <Link to="/" className="flex items-center gap-3">
              <img
                src={GDGLogo}
                alt="Google Developer Group On Campus, University of Wisconsin-Green Bay Logo"
                className='object-cover h-12 w-auto'
              />
            </Link>

          </div>

          {/* -------------------------------------------------------------- */}

          <div id="Contact" className="w-full md:w-1/3 lg:w-1/4 mb-8">
            <h6 className="text-google-black/75 font-google text-lg mb-4">Contact Us</h6>
            <div className="w-full max-w-xs">
              <p className="text-google-black font-google-text pb-2">Email Address:</p>
              <div className="relative">
                <label htmlFor="email-copy-text" className="sr-only">email</label>

                <button
                  onClick={handleCopy}
                  id="email-copy-text"
                  className="
                    group
                    relative
                    block w-full rounded-lg px-2.5 py-4 text-left
                    font-google-text text-sm text-neutral2
                    border border-google-black
                    bg-primary1
                    hover:bg-night hover:border-night
                    transition-colors duration-300 ease-in-out
                    cursor-pointer
                  "
                >
                  {Email}

                  {/* Inner Badge / Status Indicator */}
                  <span
                    className="
                      absolute right-2.5 top-1/2 -translate-y-1/2 
                      inline-flex items-center justify-center 
                      rounded-lg py-2 px-3
                      border border-primary2/30
                      bg-night/20
                      text-neutral2
                      group-hover:bg-primary2 group-hover:text-text2 group-hover:border-primary2
                      transition-all duration-300
                    "
                  >
                    {isCopied ? (
                      <span className="inline-flex items-center">
                        {/* Used primary2 (Gold) for the success state icon */}
                        <FontAwesomeIcon icon={faClipboard} className="w-3 h-3 text-primary2 group-hover:text-text2 mr-1.5" />
                        <span className="text-xs font-semibold text-primary2 group-hover:text-text2">Copied</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center">
                        <FontAwesomeIcon icon={faClipboard} className="w-3 h-3 mr-1.5" />
                        <span className="text-xs font-semibold">Copy</span>
                      </span>
                    )}
                  </span>
                </button>
              </div>
            </div>
          </div>


          {/* -------------------------------------------------------------- */}

          {/* Related Articles links */}
          <div className="w-full md:w-1/3 lg:w-1/4 mb-8">
            <h6 className="text-google-black/75 font-google text-lg mb-4">Social</h6>

            {/* List of social media links: Github, LinkedIn, Instagram, Facebook */}
            <ul className="list-none flex flex-row justify-start gap-4 items-start text-google-black">
              <li>
                <Link to="https://github.com/GDG-UWGB/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                  <FontAwesomeIcon icon={faGithub} className="text-google-black/75 text-2xl hover:scale-110 transition-transform duration-300" />
                  {/* <span className="text-sm">GitHub</span> */}
                </Link>
              </li>
              <li>
                <Link to="https://www.linkedin.com/company/gdg-uwgb/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                  <FontAwesomeIcon icon={faLinkedin} className="text-google-black/75 text-2xl hover:scale-110 transition-transform duration-300" />
                  {/* <span className="text-sm">LinkedIn</span> */}
                </Link>
              </li>
              <li>
                <Link to="https://www.instagram.com/gdg_uwgb/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                  <FontAwesomeIcon icon={faInstagram} className="text-google-black/75 text-2xl hover:scale-110 transition-transform duration-300" />
                  {/* <span className="text-sm">Instagram</span> */}
                </Link>
              </li>
              <li>
                {/*  */}
                <Link to="https://www.facebook.com/gdg.uwgb/" target="_blank" rel="noopener noreferrer" className="flex items-center group-[]:">
                  <FontAwesomeIcon icon={faFacebook} className="text-google-black/75 text-2xl hover:scale-110 transition-transform duration-300 " />
                  {/* <span className="text-sm">Facebook</span> */}
                </Link>
              </li>
            </ul>
          </div>

        </div>

        <div className="flex justify-start items-center">
          <p className="text-google-black/75 text-sm font-google pl-2">&copy; {new Date().getFullYear()} Google</p>


          {/* Right: The Signature */}
          {/* <div className="text-sm text-google-black/75 flex items-center gap-1 ml-auto">
            <span>Developed by</span>
            <a 
              href="https://carlosguzmanr.com"
              target="_blank" 
              rel="noopener noreferrer"
              className="font-medium text-google-black hover:text-google-blue transition-colors relative group"
            >
              Carlos Guzman
            </a>
          </div> */}

        </div>
      </div>
    </footer>
  )
}

export default Footer