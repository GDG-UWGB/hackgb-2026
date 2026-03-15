// import React from 'react';

interface ImageMaskProps {
    imageSrc: string;
    maskSvg: string; // Accepts any SVG path/URL as a prop
    altText?: string;
    aspectRatio?: string; // e.g., '1/1', '16/9', '4/3'
    className?: string;
    hoverScale?: number;
}

const ImageMask = ({
    imageSrc,
    maskSvg,
    altText = 'Masked image',
    aspectRatio = '1/1', // Defaults to a square aspect ratio
    className = '',
    hoverScale = 100,
}: ImageMaskProps) => {
    return (
        <div
            className={`relative w-full ${className}`}
            // Applying the aspect ratio dynamically to the outer container
            style={{ aspectRatio }}
        >
            {/* The Mask Container */}
            <div
                className="w-full h-full overflow-clip group"
                style={{
                    maskImage: `url("${maskSvg}")`,
                    maskSize: '100% 100%',
                    maskRepeat: 'no-repeat',
                    maskPosition: 'center',
                    // Webkit prefix for Safari/older Chrome support
                    WebkitMaskImage: `url("${maskSvg}")`,
                    WebkitMaskSize: '100% 100%',
                    WebkitMaskRepeat: 'no-repeat',
                    WebkitMaskPosition: 'center',
                }}
            >
                <img
                    src={imageSrc}
                    alt={altText}
                    // Changed to object-cover to ensure the image fills the custom aspect ratio
                    className={`w-full h-full object-cover transition-transform duration-200 transform group-hover:scale-[${hoverScale}%]`}
                />
            </div>
        </div>
    );
};

export default ImageMask;