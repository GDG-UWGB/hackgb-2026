import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';

const ComingSoon: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-google-blue-pastel/50">
      <div className="text-center px-4 "> 
        <div className="flex justify-center mb-6">
          {/* animate-spin-slow is now a valid utility */}
          <FontAwesomeIcon icon={faGear} className="animate-spin" style={{fontSize: '60px'}} />
        </div>
        <h1 className="text-4xl md:text-5xl font-googlesans text-raisin-black">
          Coming Soon!
        </h1>
        <p className="mt-4 text-lg md:text-xl text-raisin-black">
          I'm busy building something amazing. Please check back later.
        </p>
      </div>
    </div>
  );
};

export default ComingSoon;