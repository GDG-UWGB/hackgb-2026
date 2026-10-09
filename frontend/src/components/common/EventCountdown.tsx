import React, { useState, useEffect } from 'react';
import { Clock, Calendar, Sparkles, Trophy } from 'lucide-react';
import { EVENT_START_DATE } from '../../data/constants';

interface EventCountdownProps {
  variant?: 'hero' | 'banner' | 'card' | 'compact' | 'mini' | 'pill';
  showNotice?: boolean;
  className?: string;
}

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isStarted: boolean;
}

export const calculateTimeUntilEvent = (): TimeLeft => {
  const diff = EVENT_START_DATE.getTime() - new Date().getTime();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isStarted: true };
  }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isStarted: false,
  };
};

const GOOGLE_SANS_STYLE: React.CSSProperties = {
  fontFamily: "'GoogleSans', ui-sans-serif, system-ui, -apple-system, sans-serif",
};

const EventCountdown: React.FC<EventCountdownProps> = ({
  variant = 'hero',
  showNotice = true,
  className = '',
}) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeUntilEvent());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeUntilEvent());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');

  // When event has officially started — Celebration State
  if (timeLeft.isStarted) {
    return (
      <div
        style={GOOGLE_SANS_STYLE}
        className={`font-google bg-gradient-to-r from-[#0C3C34] via-[#124d43] to-[#0C3C34] text-white rounded-2xl p-4 sm:p-5 shadow-xl border border-white/20 select-none text-center max-w-md mx-auto ${className}`}
      >
        <div className="flex items-center justify-center gap-1.5 mb-1.5">
          <Trophy className="w-4 h-4 text-[#ffcc00] animate-bounce" />
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#ffcc00]">
            Hackathon In Progress
          </span>
        </div>
        <h3 className="text-lg sm:text-xl font-bold tracking-tight mb-0.5">
          HackGB 2026 is LIVE!
        </h3>
        <p className="text-[11px] sm:text-xs text-slate-200 font-medium">
          Welcome innovators, mentors, and judges to the STEM Innovation Center!
        </p>
      </div>
    );
  }

  // Pill variant — Ultra-sleek compact pill
  if (variant === 'pill') {
    return (
      <div
        style={GOOGLE_SANS_STYLE}
        className={`font-google inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-2.5 px-3.5 py-1.5 sm:py-2 rounded-2xl sm:rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-[0_4px_16px_rgba(12,60,52,0.06)] select-none text-center ${className}`}
      >
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#0C3C34]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#61A644] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#61A644]" />
          </span>
          <span className="tracking-tight text-slate-600 font-medium">T-Minus</span>
          <span className="text-[#0C3C34] font-extrabold tracking-tight tabular-nums bg-[#61A644]/15 px-2 py-0.5 rounded-md border border-[#61A644]/25">
            {timeLeft.days}d {pad(timeLeft.hours)}h {pad(timeLeft.minutes)}m {pad(timeLeft.seconds)}s
          </span>
        </div>

        {showNotice && (
          <>
            <span className="hidden sm:inline text-slate-300 font-bold">•</span>
            <div className="flex items-center gap-1 text-[11px] text-slate-700 font-medium">
              <Sparkles className="w-3 h-3 text-[#E37100]" />
              <span className="font-semibold text-slate-800">
                Applications Closed • Oct 17–18
              </span>
            </div>
          </>
        )}
      </div>
    );
  }

  // Compact variant — inline badge with Google Sans font
  if (variant === 'compact') {
    return (
      <div
        style={GOOGLE_SANS_STYLE}
        className={`font-google inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-[#0C3C34] text-[11px] font-bold select-none ${className}`}
      >
        <Clock className="w-3 h-3 text-[#61A644] animate-pulse shrink-0" />
        <span className="font-medium text-slate-600">Launch in</span>
        <span className="font-extrabold tabular-nums text-[#0C3C34]">
          {timeLeft.days}d {pad(timeLeft.hours)}h {pad(timeLeft.minutes)}m {pad(timeLeft.seconds)}s
        </span>
      </div>
    );
  }

  // Banner variant — wide card with Google Sans typography
  if (variant === 'banner') {
    return (
      <div
        style={GOOGLE_SANS_STYLE}
        className={`font-google w-full bg-gradient-to-r from-[#0C3C34]/5 via-[#61A644]/10 to-[#E37100]/5 border border-[#61A644]/25 rounded-xl p-3 sm:p-4 select-none ${className}`}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#61A644]/15 flex items-center justify-center text-[#61A644] shrink-0 border border-[#61A644]/20 shadow-xs">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#61A644] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#61A644] animate-pulse" />
                Launch Countdown • Oct 17, 2026
              </div>
              <div className="text-xs sm:text-sm font-bold text-[#0C3C34] tracking-tight">
                T-Minus {timeLeft.days} Days, {timeLeft.hours} Hours Until HackGB 2026!
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {[
              { val: timeLeft.days, label: 'D' },
              { val: timeLeft.hours, label: 'H' },
              { val: timeLeft.minutes, label: 'M' },
              { val: timeLeft.seconds, label: 'S' },
            ].map((unit, idx) => (
              <React.Fragment key={unit.label}>
                <div className="bg-white/90 backdrop-blur-sm border border-white/70 shadow-xs px-2 py-1 rounded-md text-center min-w-[32px]">
                  <span className="text-xs font-extrabold text-[#0C3C34] tabular-nums block leading-none">
                    {pad(unit.val)}
                  </span>
                  <span className="text-[7px] text-slate-400 font-bold block mt-0.5 tracking-wider">
                    {unit.label}
                  </span>
                </div>
                {idx < 3 && <span className="text-slate-400 text-xs font-bold">:</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {showNotice && (
          <div className="mt-2.5 pt-2 border-t border-black/5 flex items-center gap-1.5 text-[11px] text-slate-700">
            <Sparkles className="w-3 h-3 text-[#E37100] shrink-0" />
            <span>
              <strong>Applications Closed.</strong> Applications are closed for HackGB 2026. See you at UW-Green Bay STEM Innovation Center!
            </span>
          </div>
        )}
      </div>
    );
  }

  // Units array for the Hero display
  const units = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: timeLeft.hours },
    { label: 'MINUTES', value: timeLeft.minutes },
    { label: 'SECONDS', value: timeLeft.seconds },
  ];

  // Default 'hero' variant — Elevated, High-Polish Glassmorphic Countdown
  return (
    <div className={`relative group max-w-[420px] mx-auto w-full select-none ${className}`}>
      {/* Subtle Ambient Glow behind card */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[#61A644]/20 via-[#E37100]/15 to-[#0C3C34]/20 rounded-3xl blur-lg opacity-50 group-hover:opacity-80 transition duration-500 pointer-events-none" />

      {/* Main Glassmorphic Card Container */}
      <div
        style={GOOGLE_SANS_STYLE}
        className="font-google relative bg-white/75 backdrop-blur-2xl border border-white/90 shadow-[0_12px_36px_rgba(12,60,52,0.06),0_1px_3px_rgba(0,0,0,0.03)] rounded-2xl p-3 sm:p-3.5 transition-all duration-300 hover:shadow-[0_16px_44px_rgba(12,60,52,0.09)] hover:border-white"
      >
        {/* Subtle Top Accent Line */}
        <div className="absolute top-0 inset-x-6 h-[2px] bg-gradient-to-r from-transparent via-[#61A644]/60 to-transparent rounded-full" />

        {/* Top Meta Header: Status Beacon & Date Badge */}
        <div className="flex items-center justify-between mb-2.5 px-0.5">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#0C3C34]/5 border border-[#0C3C34]/10 shadow-2xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#61A644] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#61A644]" />
            </span>
            <span className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wider text-[#0C3C34]">
              Countdown to Kickoff
            </span>
          </div>

          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100/70 text-[10px] sm:text-[10.5px] font-medium text-slate-600 border border-slate-200/50">
            <Calendar className="w-3 h-3 text-[#61A644]" />
            <span>Oct 17 • STEM Center</span>
          </div>
        </div>

        {/* Digit Tiles with Animated Colon Separators */}
        <div className="flex items-center justify-between gap-1 sm:gap-1.5">
          {units.map((item, idx) => (
            <React.Fragment key={item.label}>
              <div className="flex-1 min-w-0 bg-gradient-to-b from-white/95 to-slate-50/90 rounded-xl py-2 px-1 sm:py-2.5 flex flex-col items-center justify-center border border-slate-200/70 shadow-[inset_0_1px_0_rgba(255,255,255,1),0_2px_8px_rgba(12,60,52,0.04)] relative group/tile transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(12,60,52,0.08)] hover:border-[#61A644]/40">
                {/* Micro top gleam on tile */}
                <div className="absolute top-0 inset-x-2 h-[1.5px] bg-gradient-to-r from-transparent via-[#61A644]/40 to-transparent rounded-full opacity-60 group-hover/tile:opacity-100 transition-opacity" />

                <span className="text-2xl sm:text-[28px] font-bold text-[#0C3C34] tracking-tight leading-none tabular-nums">
                  {pad(item.value)}
                </span>
                <span className="text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-[0.14em] text-[#61A644] mt-1 sm:mt-1.5">
                  {item.label}
                </span>
              </div>

              {/* Blinking Colon Separator between modules */}
              {idx < units.length - 1 && (
                <span className="text-slate-300 font-bold text-base sm:text-lg select-none pb-3.5 shrink-0 animate-pulse">
                  :
                </span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Notice: Applications are closed for HackGB 2026 */}
        {showNotice && (
          <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center justify-center gap-1.5 text-center text-[11px] sm:text-xs text-slate-600 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
            <span>
              Applications are closed for <strong className="text-[#0C3C34] font-bold">HackGB 2026</strong>.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCountdown;

