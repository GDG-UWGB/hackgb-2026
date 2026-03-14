const tracks = [
    {
        title: "Titletown Community Impact",
        description: "Solutions for Green Bay’s local needs including small business support, transit optimization, or community engagement tech.",
        color: "bg-google-blue",
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
        )
    },
    {
        title: "AI-Native Future",
        description: "Pushing the boundaries of innovation with Generative AI, LLMs, Computer Vision, or intelligent autonomous systems.",
        color: "bg-google-green",
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        )
    },
    {
        title: "Eco-Green Bay",
        description: "Focusing on sustainability, water conservation for Lake Michigan, green energy, and sustainable manufacturing practices.",
        color: "bg-uwgb-green",
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
        )
    },
    {
        title: "Health & Human Performance",
        description: "Advancing rural health access, student mental wellness, sports technology, and overall human well-being.",
        color: "bg-google-red",
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
        )
    }
];

const Tracks = () => {
    return (
        <section className="py-24 px-4 bg-white relative">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-google font-bold mb-4 text-google-black">
                        The 4 Main <span className="text-google-blue">Tracks</span>
                    </h2>
                    <p className="text-xl text-google-black/60 max-w-2xl mx-auto">
                        Choose a path that inspires you and build something that matters.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {tracks.map((track, index) => (
                        <div
                            key={index}
                            className="group p-8 rounded-3xl border border-google-off-white bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col items-center text-center"
                        >
                            <div className={`${track.color} p-4 rounded-2xl text-white mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                                {track.icon}
                            </div>
                            <h3 className="text-xl font-google font-bold mb-4 text-google-black leading-tight">
                                {track.title}
                            </h3>
                            <p className="text-google-black/60 font-google-text leading-relaxed">
                                {track.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Tracks;
