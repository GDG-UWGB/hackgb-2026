import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, MapPin, User, Sparkles } from 'lucide-react';
import stemImg from '../assets/images/background/jpg/uwgb-stem.jpg';
import { saturdaySchedule, sundaySchedule } from '../data/scheduleData';

const SchedulePage = () => {
  const navigate = useNavigate();
  const [activeDay, setActiveDay] = useState<'saturday' | 'sunday'>('saturday');

  const events = activeDay === 'saturday' ? saturdaySchedule : sundaySchedule;

  return (
    <main className="relative min-h-screen pt-28 pb-20 px-4 overflow-hidden bg-[#eff6eb] noise-overlay flex flex-col items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src={stemImg}
          alt=""
          className="w-full h-full object-cover opacity-[0.18] parallax-bg"
        />
        <div className="absolute inset-0 bg-[#61A644]/[0.01]" />
      </div>

      <div className="w-full max-w-4xl z-10 flex flex-col items-center">
        {/* Back Link */}
        <div className="w-full flex justify-start mb-6">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-slate-600 hover:text-[#0C3C34] font-google text-sm font-semibold transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Home</span>
          </button>
        </div>

        {/* Title Section */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#61A644]/10 border border-[#61A644]/15 text-[#61A644] font-google font-bold text-xs uppercase tracking-widest mb-4">
            October 17–18, 2026 • UW-Green Bay
          </span>
          <h1 className="text-4xl md:text-5xl font-google font-bold text-[#0C3C34] tracking-tight mb-3">
            Event Schedule
          </h1>
          <p className="text-slate-600 font-google-text text-sm md:text-base max-w-xl mx-auto">
            UW-Green Bay • 24 Hours of Building, Workshops & Community
          </p>

          {/* Clean Day Switcher */}
          <div className="inline-flex bg-white/90 p-1.5 rounded-full border border-black/5 shadow-sm mt-6">
            <button
              onClick={() => setActiveDay('saturday')}
              className={`px-6 py-2 rounded-full font-google text-sm font-bold transition-all cursor-pointer ${
                activeDay === 'saturday'
                  ? 'bg-[#0C3C34] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Saturday, Oct 17
            </button>
            <button
              onClick={() => setActiveDay('sunday')}
              className={`px-6 py-2 rounded-full font-google text-sm font-bold transition-all cursor-pointer ${
                activeDay === 'sunday'
                  ? 'bg-[#0C3C34] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sunday, Oct 18
            </button>
          </div>
        </div>

        {/* Context Notice */}
        {activeDay === 'saturday' && (
          <div className="w-full bg-[#61A644]/10 border border-[#61A644]/20 rounded-2xl p-4 mb-6 text-slate-700 text-xs sm:text-sm font-google-text flex flex-col gap-2">
            <div>
              <strong className="font-google text-[#0C3C34]">Day 1 Venue Flow:</strong>{' '}
              Check-in at STEM Innovation Center → Opening Ceremony at Wood Hall → Head to University Union Dining for lunch & Phoenix Room B & C for hacking space. Workshops are in University Union (Room: TBD). At 10:00 PM, return to STEM Innovation Center as the Union closes for overnight hacking.
            </div>
            <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-[#61A644]/15 text-[11px] font-google">
              <span className="text-slate-600">Workshops start at 1:30 PM (Modal)</span>
              <span className="text-slate-400">•</span>
              <span className="text-[#E37100] font-semibold">Dinner Break: 5:00 PM – 7:00 PM (No Workshops)</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-600">Return to STEM at 10:00 PM</span>
            </div>
          </div>
        )}

        {activeDay === 'sunday' && (
          <div className="w-full bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 mb-6 text-amber-900 text-xs sm:text-sm font-google-text">
            <strong className="font-google text-amber-950">Day 2 at STEM Innovation Center:</strong>{' '}
            All Sunday events are hosted at the STEM Innovation Center. No workshops on Sunday — the day is focused on the 12:00 PM submission deadline, lunch, the Project Expo & Live Judging, and the Awards Ceremony.
          </div>
        )}

        {/* Main Schedule Card */}
        <div className="w-full bg-white/90 border border-black/5 rounded-[2rem] shadow-xl p-6 sm:p-10 flex flex-col divide-y divide-black/5">
          {events.map((evt) => {
            const isDinner = evt.id === 'sat-dinner';

            return (
              <div
                key={evt.id}
                className={`py-6 first:pt-0 last:pb-0 transition-colors ${
                  isDinner ? 'bg-amber-50/50 -mx-6 sm:-mx-10 px-6 sm:px-10 rounded-xl my-2' : ''
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-3 md:gap-8">
                  {/* Left Column: Time & Room (Clean Google Sans digits) */}
                  <div className="w-full md:w-56 shrink-0">
                    <div className="flex items-center gap-1.5 font-google font-bold text-base md:text-lg text-[#0C3C34]">
                      <Clock className="w-4 h-4 text-[#61A644] shrink-0" />
                      <span>{evt.time}</span>
                      {evt.endTime && evt.endTime !== evt.time && (
                        <>
                          <span className="text-slate-400 font-normal"> – </span>
                          <span>{evt.endTime}</span>
                        </>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 font-google text-xs md:text-sm text-slate-500 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{evt.room}</span>
                    </div>
                  </div>

                  {/* Right Column: Title, Topic, Speaker & Details */}
                  <div className="flex-1 min-w-0">
                    {/* Header Row with Badges */}
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <h2 className="font-google font-bold text-lg md:text-xl text-slate-900">
                        {evt.title}
                      </h2>

                      {evt.badge === 'Modal' && (
                        <span className="inline-flex items-center gap-1 text-xs font-google font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          <Sparkles className="w-3 h-3 text-emerald-600" />
                          Modal
                        </span>
                      )}

                      {evt.badge === 'Google Developer Expert' && (
                        <span className="inline-flex items-center gap-1 text-xs font-google font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                          <Sparkles className="w-3 h-3 text-blue-600" />
                          Google Developer Expert
                        </span>
                      )}

                      {isDinner && (
                        <span className="text-xs font-google font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
                          Dinner Break
                        </span>
                      )}
                    </div>

                    {/* Topic Indicator for Workshops */}
                    {evt.isWorkshop && (
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-100 border border-slate-200 text-xs font-google text-slate-700 mb-2.5">
                        <span className="font-bold text-[#E37100]">Topic:</span>
                        <span className="font-semibold text-slate-800">{evt.topic}</span>
                        <span className="text-slate-500 font-normal italic">(To be announced soon)</span>
                      </div>
                    )}

                    {/* Description */}
                    <p className="text-slate-600 font-google-text text-sm leading-relaxed mb-3">
                      {evt.desc}
                    </p>

                    {/* Speaker Space (Clean, non-clustered card) */}
                    {evt.speaker && (
                      <div className="mt-3 p-3.5 rounded-xl bg-slate-50 border border-black/5 flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-white border border-black/10 flex items-center justify-center shrink-0 text-[#0C3C34]">
                          <User className="w-5 h-5 text-slate-500" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-baseline gap-2">
                            <h3 className="font-google font-bold text-sm text-[#0C3C34]">
                              {evt.speaker.name}
                            </h3>
                            <span className="font-google text-xs text-slate-500">
                              • {evt.speaker.role} ({evt.speaker.company})
                            </span>
                          </div>
                          {evt.speaker.bio && (
                            <p className="text-xs font-google-text text-slate-600 mt-0.5 leading-normal">
                              {evt.speaker.bio}
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Buffer Time Note */}
                    {evt.bufferAfterMinutes && (
                      <div className="mt-2.5 text-xs font-google text-slate-500 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#61A644]" />
                        <span>
                          {evt.bufferAfterMinutes}-minute buffer before the next session
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info & Home button */}
        <div className="mt-10 text-center text-slate-600 font-google-text text-xs sm:text-sm">
          <p className="mb-4">
            Questions about workshops or directions? Mentors and organizers are available to help at the STEM Innovation Center and University Union.
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2.5 rounded-full bg-[#0C3C34] hover:bg-[#0C3C34]/90 text-white font-google font-bold text-xs sm:text-sm transition-all shadow-sm cursor-pointer"
          >
            Back to HackGB Home
          </button>
        </div>
      </div>
    </main>
  );
};

export default SchedulePage;
