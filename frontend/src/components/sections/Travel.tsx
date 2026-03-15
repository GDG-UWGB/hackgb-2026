// import React from 'react'
// import font awesome location dot
import { faLocationDot, faDiamondTurnRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import UUnion from '../../assets/images/UUnion-square.jpg'
import ImageMask from '../common/ImageMask'
import TellyMask from '../../assets/icons/telly-mask.svg'
const Travel = () => {

    const destinationQuery = encodeURIComponent("University of Wisconsin-Green Bay");
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destinationQuery}`;

    return (
        <section className='py-24 bg-google-green/15 rounded-4xl mx-3'>
            {/* Initial Text */}
            <div className='max-w-7/8 lg:max-w-6/8 mx-auto'>
                <div className='flex items-center gap-6 mb-8 text-4xl lg:text-5xl font-google'>
                    {/* Location icon */}
                    <span className=" lg:text-4xl text-google-green-darktone"><FontAwesomeIcon icon={faLocationDot} /></span>
                    <h2 className='text-google-green-black'>How to get here</h2>
                </div>
                <div className='flex flex-col lg:flex-row gap-8 lg:gap-14 text-lg text-google-black/80 font-google-text leading-relaxed'>
                    <p>The University of Wisconsin-Green Bay is located in Green Bay, Wisconsin. It is a medium-sized institution with a beautiful campus located on the shores of the Fox River and Green Bay.</p>
                    <p>Green Bay is a city in northeastern Wisconsin, located on the western shore of Lake Michigan. It is the third-largest city in Wisconsin, with a population of about 107,000 people.</p>
                </div>
            </div>

            {/* Address Information */}
            <div className='mx-auto max-w-7/8 mt-16'>
                {/* Bento Grid */}
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-14 h-auto lg:h-[85vh]'>
                    {/* Left (large): Google Maps container */}
                    <div className="relative min-h-[400px] lg:col-span-2 lg:min-h-0 border-[4px] border-green-600 rounded-[2.5rem] overflow-hidden">

                        {/* The Map Iframe */}
                        {/* Note: I added 'absolute inset-0 w-full h-full' to ensure it perfectly fills the container */}
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2844.2106338345134!2d-87.92362848785474!3d44.53131957095336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8802e61d64ca7a93%3A0xd35c038e0e1219bd!2sUniversity%20of%20Wisconsin-Green%20Bay!5e0!3m2!1sen!2sus!4v1773608498244!5m2!1sen!2sus"
                            className="absolute inset-0 w-full h-full"
                            style={{ border: 0 }}
                            allowFullScreen={false}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Google Maps Location"
                        ></iframe>

                        {/* Custom "Get Directions" Overlay Button */}
                        <div className="absolute bottom-6 left-6 z-10">
                            <a
                                href={directionsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-google-blue hover:bg-google-blue-darktone text-white px-5 py-2.5 rounded-full font-medium transition-colors shadow-md text-sm md:text-base"
                            >
                                Get directions
                                <FontAwesomeIcon icon={faDiamondTurnRight} />
                            </a>
                        </div>

                    </div>

                    {/* Right: Address (top) and image (bottom) */}
                    <div className='flex flex-col gap-6 lg:h-full'>

                        {/* Address Pill */}
                        <div className='bg-google-green-darktone text-white rounded-full py-10 lg:py-0 flex flex-col justify-center items-center lg:flex-1 text-center shadow-md font-google font-bold text-3xl leading-snug'>
                            <h2>UW Green Bay</h2>
                            <h2>2420 Nicolet Dr</h2>
                            <h2>Green Bay</h2>
                            <h2>WI 54311</h2>
                        </div>

                        {/* Location Image */}
                        <div className='lg:flex-1 hidden md:block'>
                            <ImageMask
                                imageSrc={UUnion}
                                maskSvg={TellyMask}
                                altText="UWGB Campus"
                                aspectRatio="1/1"
                                className='w-full lg:h-full object-contain'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Travel