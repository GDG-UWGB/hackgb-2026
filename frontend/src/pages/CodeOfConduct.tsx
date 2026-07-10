import { useNavigate } from 'react-router-dom';
import stemImg from '../assets/images/background/uwgb-stem.png';

const CodeOfConduct = () => {
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
            Code of Conduct
          </h1>
        </div>

        {/* Conduct Rules List */}
        <div className="w-full bg-white/90 border border-black/5 rounded-[2rem] shadow-xl p-8 md:p-10 flex flex-col gap-8">

          {/* Core Goal */}
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-google font-bold text-[#0C3C34]">
              Our Core Goal
            </h2>
            <p className="text-slate-655 font-google-text text-sm leading-relaxed">
              HackGB is all about learning, building, and solving problems together. As UW-Green Bay's first collegiate hackathon, we want to create a community where everyone feels safe, welcome, and respected. Whether you are writing your first line of code or you are an experienced builder, this is a space for you.
            </p>
          </div>

          {/* Who This Applies To */}
          <div className="flex flex-col gap-2 border-t border-black/5 pt-6">
            <h2 className="text-xl font-google font-bold text-[#0C3C34]">
              Who This Applies To
            </h2>
            <p className="text-slate-655 font-google-text text-sm leading-relaxed">
              This Code of Conduct applies to everyone attending or involved with the event on October 17-18. This includes all hackers, organizers from GDG on Campus, mentors, sponsors, and judges.
            </p>
          </div>

          {/* What We Expect */}
          <div className="flex flex-col gap-3 border-t border-black/5 pt-6">
            <h2 className="text-xl font-google font-bold text-[#0C3C34]">
              What We Expect
            </h2>
            <ul className="list-disc pl-5 text-slate-655 font-google-text text-sm leading-relaxed flex flex-col gap-2">
              <li><strong>Be kind and respectful.</strong> Treat everyone with basic human decency.</li>
              <li><strong>Be helpful.</strong> If you see someone struggling or looking lost, offer a hand.</li>
              <li><strong>Keep an open mind.</strong> We have people from different backgrounds and skill levels. Listen to different perspectives, especially when collaborating on projects across tracks like Healthcare, Education, and the Environment.</li>
              <li><strong>Take care of yourself and the space.</strong> Get some rest, drink water, and help us keep the venue clean.</li>
            </ul>
          </div>

          {/* What Is Not Allowed */}
          <div className="flex flex-col gap-3 border-t border-black/5 pt-6">
            <h2 className="text-xl font-google font-bold text-[#0C3C34]">
              What Is Not Allowed
            </h2>
            <p className="text-slate-655 font-google-text text-sm leading-relaxed">
              We do not tolerate harassment of any kind. Harassment includes, but is not limited to:
            </p>
            <ul className="list-disc pl-5 text-slate-655 font-google-text text-sm leading-relaxed flex flex-col gap-2">
              <li>Offensive comments related to gender, identity, race, ethnicity, religion, or disability.</li>
              <li>Making fun of someone's skill level or background.</li>
              <li>Unwelcome physical contact or sexual attention.</li>
              <li>Showing inappropriate or sexual images in public spaces, project demos, or presentations.</li>
              <li>Intimidation, stalking, or bullying.</li>
            </ul>
          </div>

          {/* How to Report an Issue */}
          <div className="flex flex-col gap-3 border-t border-black/5 pt-6">
            <h2 className="text-xl font-google font-bold text-[#0C3C34]">
              How to Report an Issue
            </h2>
            <p className="text-slate-655 font-google-text text-sm leading-relaxed">
              If someone makes you feel unsafe, or if you see someone else being harassed, please tell an organizer right away.
            </p>
            <ul className="list-disc pl-5 text-slate-655 font-google-text text-sm leading-relaxed flex flex-col gap-1.5">
              <li><strong>In-person:</strong> Look for a GDG-UWGB organizer (we will be wearing specific team shirts).</li>
              <li><strong>Online/Email:</strong> Reach out through the official event Discord or email the team at <a href="mailto:info@hackgb.com" className="text-[#61A644] font-bold hover:underline">info@hackgb.com</a>.</li>
            </ul>
            <p className="text-slate-500 font-google-text text-xs leading-relaxed mt-1">
              We will handle all reports privately and take them seriously. We are here to help you feel safe, which includes walking you to your car or helping you contact campus security if needed.
            </p>
          </div>

          {/* Consequences */}
          <div className="flex flex-col gap-2 border-t border-black/5 pt-6">
            <h2 className="text-xl font-google font-bold text-[#0C3C34]">
              Consequences
            </h2>
            <p className="text-slate-655 font-google-text text-sm leading-relaxed">
              If someone breaks these rules, the organizing team will step in. We might give a warning, or we might ask the person to leave the hackathon immediately without any prizes or sponsor perks. Our main priority is keeping HackGB a positive experience for the rest of the community.
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

export default CodeOfConduct;
