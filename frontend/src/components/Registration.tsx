import { useState } from 'react';

const Registration = () => {
    const [activeTab, setActiveTab] = useState<'hacker' | 'mentor' | 'volunteer' | 'sponsor'>('hacker');

    const forms = {
        hacker: "https://docs.google.com/forms/d/e/1FAIpQLSdU_Xp8hE_M_N_P_Q_R_S_T_U_V_W_X_Y_Z/viewform?embedded=true",
        mentor: null,
        volunteer: "https://docs.google.com/forms/d/e/1FAIpQLSg_A_B_C_D_E_F_G_H_I_J_K_L_M_N_O/viewform?embedded=true",
        sponsor: null,
    };

    const isComingSoon = forms[activeTab] === null;

    return (
        <section className="py-24 px-4 bg-white" id="register">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-google font-bold mb-4 text-google-black">
                        Register <span className="text-google-blue">Now</span>
                    </h2>
                    <p className="text-xl text-google-black/60">
                        Join us for a historic weekend of innovation.
                    </p>
                </div>

                {/* Tab Selector */}
                <div className="flex flex-wrap justify-center gap-2 mb-8 bg-google-off-white/50 p-2 rounded-2xl w-fit mx-auto">
                    {(['hacker', 'mentor', 'volunteer', 'sponsor'] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-2 rounded-xl font-google font-medium transition-all capitalize ${activeTab === tab
                                ? 'bg-white text-google-blue shadow-sm'
                                : 'text-google-black/40 hover:text-google-black/60'
                                }`}
                        >
                            {tab === 'mentor' ? 'Judge/Mentor' : tab}
                        </button>
                    ))}
                </div>

                {/* Content Container */}
                <div className="relative w-full bg-white rounded-3xl border border-google-off-white shadow-xl overflow-hidden min-h-[400px] flex items-center justify-center">
                    {isComingSoon ? (
                        <div className="text-center p-12 animate-fade-in">
                            <div className="bg-google-blue/10 p-4 rounded-2xl mb-6 inline-block text-google-blue">
                                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-google font-bold text-google-black mb-2">Coming Soon</h3>
                            <p className="text-google-black/60 font-google-text">
                                Interest forms for {activeTab === 'mentor' ? 'judges and mentors' : 'sponsors'} will be available shortly.
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="absolute inset-0 flex items-center justify-center -z-10">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-google-blue"></div>
                            </div>
                            <iframe
                                src={forms[activeTab]!}
                                width="100%"
                                height="1000"
                                style={{ border: 0 }}
                                className="w-full h-[1000px]"
                                title={`${activeTab} Registration Form`}
                            >
                                Loading...
                            </iframe>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Registration;
