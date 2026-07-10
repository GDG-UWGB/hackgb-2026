import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCompass, faBuildingColumns } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import stemImg from '../assets/images/background/uwgb-stem.png';

/* Premium spring easing */
const spring = [0.22, 1, 0.36, 1] as const;

const ApplyOptions = () => {
  const navigate = useNavigate();

  const options = [
    {
      title: 'Hacker Application',
      description: 'Submit your application to participate in the hackathon as a hacker.',
      icon: faCompass,
      path: '/apply/hacker',
      themeColor: '#61A644', // HackGB Green
      badge: 'Hacker',
    },
    {
      title: 'Judge Application',
      description: 'Submit your application to participate in the hackathon as a judge.',
      icon: faBuildingColumns,
      path: '/apply/judge',
      themeColor: '#E37100', // Phoenix Orange/Amber
      badge: 'Judge',
    },
  ];

  return (
    <main className="relative min-h-screen pt-28 pb-20 px-4 overflow-hidden bg-[#eff6eb] noise-overlay flex flex-col items-center justify-center">
      {/* Background Landmark Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img src={stemImg} alt="" className="w-full h-full object-cover opacity-[0.25] parallax-bg" />
        <div className="absolute inset-0 bg-[#61A644]/[0.01]" />
      </div>

      <div className="w-full max-w-4xl z-10 flex flex-col items-center">
        {/* Title Section */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#61A644]/10 border border-[#61A644]/15 text-[#61A644] font-google font-bold text-xs uppercase tracking-widest mb-4">
            <span className="w-2 h-2 bg-[#61A644] rounded-full" />
            Apply Now
          </span>
          <h1 className="text-4xl md:text-5xl font-google font-bold text-[#0C3C34] tracking-tight">
            HackGB 2026 Registration
          </h1>
          <p className="text-slate-600 mt-3 font-google-text text-sm md:text-base max-w-lg mx-auto">
            Please choose whether you would like to apply as a hacker or as a judge.
          </p>
        </div>

        {/* Option Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl">
          {options.map((opt, index) => {
            const isHacker = opt.path.includes('hacker');
            return (
              <motion.div
                key={opt.title}
                initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: spring }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="group relative cursor-pointer flex flex-col justify-between p-8 rounded-[2rem] bg-white/95 border border-black/5 hover:border-black/10 shadow-xl transition-all duration-350 min-h-[320px]"
                onClick={() => navigate(opt.path)}
              >
                {/* Visual hover glow effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[2rem] blur-xl -z-10"
                  style={{
                    background: `radial-gradient(circle at center, ${opt.themeColor}12 0%, transparent 70%)`,
                  }}
                />

                <div>
                  {/* Badge & Icon Row */}
                  <div className="flex justify-between items-start mb-6">
                    <span
                      className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-google font-bold uppercase tracking-wider"
                      style={{
                        backgroundColor: `${opt.themeColor}15`,
                        color: opt.themeColor,
                        border: `1px solid ${opt.themeColor}20`,
                      }}
                    >
                      {opt.badge}
                    </span>
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                      style={{
                        backgroundColor: isHacker ? '#61A64415' : '#E3710015',
                        color: opt.themeColor,
                      }}
                    >
                      <FontAwesomeIcon icon={opt.icon} />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h2 className="text-2xl font-google font-bold text-[#0C3C34] mb-3 group-hover:text-black transition-colors">
                    {opt.title}
                  </h2>
                  <p className="text-slate-600 font-google-text text-sm leading-relaxed">
                    {opt.description}
                  </p>
                </div>

                {/* CTA Action Bar */}
                <div className="flex items-center gap-2 mt-8 font-google font-bold text-sm" style={{ color: opt.themeColor }}>
                  <span>Apply to participate</span>
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="text-xs transition-transform duration-350 group-hover:translate-x-1.5"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Back link */}
        <button
          onClick={() => navigate('/')}
          className="mt-12 text-slate-500 hover:text-[#0C3C34] font-google font-bold text-sm cursor-pointer transition-all hover:underline"
        >
          ← Back to Homepage
        </button>
      </div>
    </main>
  );
};

export default ApplyOptions;
