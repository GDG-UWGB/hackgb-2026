import React, { useState, useEffect } from 'react';
import { Clock, Sparkles } from 'lucide-react';
import { EVENT_START_DATE } from '../../data/constants';

interface EventCountdownProps {
  variant?: 'hero' | 'banner' | 'card' | 'compact' | 'mini' | 'pill';
  showNotice?: boolean;
  className?: string;
}

interface TimeLeft {
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

const EventCountdown: React.FC<EventCountdownProps> = ({
  variant = 'hero',
  showNotice = true,
  className = '',
}) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeUntilEvent());

  useEffect(() => {
    setTimeLeft(calculateTimeUntilEvent());
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeUntilEvent());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');

  if (variant === 'pill') {
    return (
      <div
        className={`inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-3 px-5 py-2.5 rounded-2xl sm:rounded-full bg-white/95 backdrop-blur-md border border-slate-200 shadow-[0_4px_20px_rgba(12,60,52,0.08)] select-none text-center ${className}`}
      >
        <div className="flex items-center gap-2 text-xs sm:text-sm font-google-mono font-bold text-[#0C3C34]">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#61A644] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#61A644]" />
          </span>
          <span>Event in</span>
          <span className="text-[#0C3C34] font-black tracking-tight bg-[#61A644]/15 px-2 py-0.5 rounded-md border border-[#61A644]/25">
            {timeLeft.days}d {pad(timeLeft.hours)}h {pad(timeLeft.minutes)}m {pad(timeLeft.seconds)}s
          </span>
        </div>

        {showNotice && (
          <>
            <span className="hidden sm:inline text-slate-300 font-bold">•</span>
            <div className="flex items-center gap-1.5 text-xs font-google-text text-slate-700 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-[#E37100] shrink-0" />
              <span>
                Priority closed Oct. 2 • <strong className="text-[#0C3C34]">Rolling applications open</strong>
              </span>
            </div>
          </>
        )}
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[#0C3C34] font-google-mono text-[11px] font-bold select-none ${className}`}
      >
        <Clock className="w-3.5 h-3.5 text-[#61A644] animate-pulse shrink-0" />
        <span>T-minus</span>
        <span className="font-extrabold text-[#0C3C34]">
          {timeLeft.days}d {pad(timeLeft.hours)}h {pad(timeLeft.minutes)}m {pad(timeLeft.seconds)}s
        </span>
        <span className="text-[9px] text-slate-500 font-normal uppercase hidden sm:inline">to HackGB</span>
      </div>
    );
  }

  if (variant === 'banner') {
    return (
      <div
        className={`w-full bg-gradient-to-r from-[#0C3C34]/5 via-[#61A644]/10 to-[#E37100]/5 border border-[#61A644]/20 rounded-xl p-3 sm:p-4 select-none ${className}`}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#61A644]/15 flex items-center justify-center text-[#61A644] shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-google-mono font-bold uppercase tracking-wider text-[#61A644]">
                Event Countdown • October 17, 2026
              </div>
              <div className="text-xs sm:text-sm font-google font-bold text-[#0C3C34]">
                HackGB 2026 Kicks Off in {timeLeft.days} Days, {timeLeft.hours} Hours!
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 font-google-mono">
            {[
              { val: timeLeft.days, label: 'D' },
              { val: timeLeft.hours, label: 'H' },
              { val: timeLeft.minutes, label: 'M' },
              { val: timeLeft.seconds, label: 'S' },
            ].map((unit, idx) => (
              <React.Fragment key={unit.label}>
                <div className="bg-white/80 backdrop-blur-sm border border-white/60 shadow-xs px-2 py-1 rounded-md text-center min-w-[32px]">
                  <span className="text-xs sm:text-sm font-bold text-[#0C3C34]">{pad(unit.val)}</span>
                  <span className="text-[8px] text-slate-400 block -mt-0.5">{unit.label}</span>
                </div>
                {idx < 3 && <span className="text-slate-400 text-xs font-bold">:</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {showNotice && (
          <div className="mt-2.5 pt-2 border-t border-black/5 flex items-center gap-1.5 text-[11px] text-slate-650 font-google-text">
            <Sparkles className="w-3.5 h-3.5 text-[#E37100] shrink-0" />
            <span>
              <strong>Priority applications closed Oct. 2 at 11:59 PM.</strong> Rolling applications are still open with limited review priority until capacity is reached!
            </span>
          </div>
        )}
      </div>
    );
  }

  // Default: 'hero' variant
  return (
    <div
      className={`bg-white/55 backdrop-blur-xl border border-white/70 shadow-[0_12px_40px_rgba(12,60,52,0.07)] rounded-2xl p-4 sm:p-5 max-w-lg mx-auto select-none ${className}`}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#61A644] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#61A644]" />
          </span>
          <span className="font-google-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-[#0C3C34]">
            Countdown to HackGB 2026
          </span>
        </div>
        <span className="font-google-mono text-[10px] text-slate-500 font-medium">
          Oct 17 • 8:00 AM CDT
        </span>
      </div>

      {/* 4 Digit Boxes */}
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {[
          { label: 'Days', value: timeLeft.days },
          { label: 'Hours', value: timeLeft.hours },
          { label: 'Minutes', value: timeLeft.minutes },
          { label: 'Seconds', value: timeLeft.seconds },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-white/85 backdrop-blur-md rounded-xl p-2.5 sm:p-3 flex flex-col items-center justify-center border border-white/80 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_2px_8px_rgba(0,0,0,0.03)] relative overflow-hidden group transition-transform duration-200 hover:-translate-y-0.5"
          >
            <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#61A644]/40 to-transparent" />
            <span className="font-google-mono text-2xl sm:text-3xl font-extrabold text-[#0C3C34] tracking-tight leading-none">
              {pad(item.value)}
            </span>
            <span className="text-[9px] sm:text-[10px] font-google-mono font-bold uppercase tracking-wider text-[#61A644] mt-1.5">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Small Letter Friendly Announcement */}
      {showNotice && (
        <div className="mt-3.5 pt-3 border-t border-black/5 flex items-start gap-2 text-left">
          <div className="w-4 h-4 rounded-full bg-amber-500/15 flex items-center justify-center text-[#E37100] shrink-0 mt-0.5">
            <Sparkles className="w-2.5 h-2.5" />
          </div>
          <p className="text-[11px] leading-relaxed text-slate-600 font-google-text">
            <strong className="text-[#0C3C34]">Still accepting applications!</strong> While priority registration closed Oct. 2 at 11:59 PM, rolling applications remain open on a space-available basis with secondary review priority.
          </p>
        </div>
      )}
    </div>
  );
};

export default EventCountdown;
