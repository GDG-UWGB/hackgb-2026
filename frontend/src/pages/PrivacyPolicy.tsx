import { useNavigate } from 'react-router-dom';
import stemImg from '../assets/images/background/uwgb-stem.png';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <main className="relative min-h-screen pt-28 pb-20 px-4 overflow-hidden bg-[#eff6eb] noise-overlay flex flex-col items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img src={stemImg} alt="" className="w-full h-full object-cover opacity-[0.18] parallax-bg" />
        <div className="absolute inset-0 bg-[#61A644]/[0.01]" />
      </div>

      <div className="w-full max-w-3xl z-10 flex flex-col items-center">
        {/* Title */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#61A644]/10 border border-[#61A644]/15 text-[#61A644] font-google font-bold text-xs uppercase tracking-widest mb-4">
            Rules & Policies
          </span>
          <h1 className="text-4xl md:text-5xl font-google font-bold text-[#0C3C34] tracking-tight">
            Privacy Policy
          </h1>
        </div>

        {/* Policy Content */}
        <div className="w-full bg-white/90 border border-black/5 rounded-[2rem] shadow-xl p-8 md:p-10 flex flex-col gap-8">
          
          {/* Our Promise to You */}
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-google font-bold text-[#0C3C34]">
              Our Promise to You
            </h2>
            <p className="text-slate-655 font-google-text text-sm leading-relaxed">
              We are so excited to build with you at UW-Green Bay on October 17-18. We know that trusting us with your personal information is a big deal. We wrote this policy in plain, simple language so you know exactly what information we collect, why we need it, and how we keep it safe.
            </p>
          </div>

          {/* What Information We Collect */}
          <div className="flex flex-col gap-3 border-t border-black/5 pt-6">
            <h2 className="text-xl font-google font-bold text-[#0C3C34]">
              What Information We Collect
            </h2>
            <p className="text-slate-655 font-google-text text-sm leading-relaxed">
              When you apply and check in to HackGB, we ask for a few details to make sure the event runs smoothly:
            </p>
            <ul className="list-disc pl-5 text-slate-655 font-google-text text-sm leading-relaxed flex flex-col gap-1.5">
              <li><strong>Basic Details:</strong> Your name, email address, school, and major.</li>
              <li><strong>Professional Profiles:</strong> Your resume, GitHub repository link, and LinkedIn profile.</li>
              <li><strong>Event Needs:</strong> Your shirt size, dietary restrictions, and any accessibility requests.</li>
            </ul>
          </div>

          {/* Why We Collect It */}
          <div className="flex flex-col gap-3 border-t border-black/5 pt-6">
            <h2 className="text-xl font-google font-bold text-[#0C3C34]">
              Why We Collect It
            </h2>
            <p className="text-slate-655 font-google-text text-sm leading-relaxed">
              We only use your information to give you the best possible experience at the hackathon. We use it to:
            </p>
            <ul className="list-disc pl-5 text-slate-655 font-google-text text-sm leading-relaxed flex flex-col gap-1.5">
              <li>Send you important updates, schedules, and welcome guides.</li>
              <li>Make sure we order the right amount of food and the correct t-shirt sizes.</li>
              <li>Organize teams and hacking tracks.</li>
            </ul>
          </div>

          {/* Who We Share It With */}
          <div className="flex flex-col gap-3 border-t border-black/5 pt-6">
            <h2 className="text-xl font-google font-bold text-[#0C3C34]">
              Who We Share It With
            </h2>
            <p className="text-slate-655 font-google-text text-sm leading-relaxed">
              We do not sell your personal information to anyone. However, we do share specific pieces of information with our official event partners:
            </p>
            <ul className="list-disc pl-5 text-slate-655 font-google-text text-sm leading-relaxed flex flex-col gap-1.5">
              <li><strong>Our Sponsors:</strong> We share your resume, GitHub, and LinkedIn profiles with our sponsors so they can connect with you for internships and job opportunities.</li>
              <li><strong>The Organizing Team:</strong> Our core Google Developer Group organizers have access to your application data to plan the event and ensure your safety.</li>
            </ul>
          </div>

          {/* How Keep It Safe */}
          <div className="flex flex-col gap-2 border-t border-black/5 pt-6">
            <h2 className="text-xl font-google font-bold text-[#0C3C34]">
              How We Keep It Safe
            </h2>
            <p className="text-slate-655 font-google-text text-sm leading-relaxed">
              Your data is stored securely. Only authorized organizers have access to the full list of attendee information, and we take active steps to protect your details from unauthorized access.
            </p>
          </div>

          {/* Your Choices */}
          <div className="flex flex-col gap-3 border-t border-black/5 pt-6">
            <h2 className="text-xl font-google font-bold text-[#0C3C34]">
              Your Choices
            </h2>
            <p className="text-slate-655 font-google-text text-sm leading-relaxed">
              You have total control over your information. If you want to:
            </p>
            <ul className="list-disc pl-5 text-slate-655 font-google-text text-sm leading-relaxed flex flex-col gap-1">
              <li>Update your application details</li>
              <li>Opt out of sharing your resume with sponsors</li>
              <li>Ask us to delete your data after the event is over</li>
            </ul>
            <p className="text-slate-655 font-google-text text-sm leading-relaxed">
              Just reach out to our organizing team at <a href="mailto:contact@hackgb.com" className="text-[#61A644] font-bold hover:underline">contact@hackgb.com</a>. We are happy to help.
            </p>
          </div>

        </div>

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="mt-10 text-slate-500 hover:text-[#0C3C34] font-google font-bold text-sm cursor-pointer transition-all hover:underline"
        >
          ← Go Back
        </button>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
