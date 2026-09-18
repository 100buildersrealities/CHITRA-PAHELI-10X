import React from 'react';
import { Timer, AlertTriangle } from 'lucide-react';
import { Language } from '../types';

interface TimerBarProps {
  timeLeft: number; // in seconds (can have decimals e.g. 24.5)
  totalTime?: number; // default 30
  language: Language;
}

export const TimerBar: React.FC<TimerBarProps> = ({
  timeLeft,
  totalTime = 30,
  language,
}) => {
  const isHi = language === 'hi';
  const progressPercent = Math.max(0, Math.min(100, (timeLeft / totalTime) * 100));

  const isUrgent = timeLeft <= 5;
  const isWarning = timeLeft <= 10 && timeLeft > 5;

  let colorClass = 'bg-emerald-500 shadow-emerald-500/40 text-emerald-400';
  let strokeColor = '#10b981';

  if (isUrgent) {
    colorClass = 'bg-red-500 shadow-red-500/60 text-red-400 animate-pulse';
    strokeColor = '#ef4444';
  } else if (isWarning) {
    colorClass = 'bg-amber-500 shadow-amber-500/50 text-amber-400';
    strokeColor = '#f59e0b';
  }

  // Circular progress calculation
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <div
      id="timer-bar-container"
      className={`relative w-full rounded-2xl p-3 sm:p-4 border transition-all duration-300 ${
        isUrgent
          ? 'bg-red-950/40 border-red-500/60 shadow-lg shadow-red-900/30 ring-1 ring-red-500/50'
          : isWarning
          ? 'bg-amber-950/30 border-amber-500/50'
          : 'bg-slate-900/70 border-slate-800'
      }`}
    >
      <div className="flex items-center justify-between gap-3 mb-2">
        <div className="flex items-center gap-2">
          <div
            className={`p-1.5 rounded-lg ${
              isUrgent ? 'bg-red-500/20 text-red-400 animate-bounce' : 'bg-slate-800 text-slate-300'
            }`}
          >
            {isUrgent ? (
              <AlertTriangle className="w-5 h-5" />
            ) : (
              <Timer className={`w-5 h-5 ${isWarning ? 'text-amber-400' : 'text-emerald-400'}`} />
            )}
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              {isHi ? 'समय सीमा (30 सेकंड)' : 'Time Limit (30 Seconds)'}
            </div>
            <div className="text-[11px] text-slate-500">
              {isUrgent
                ? isHi
                  ? 'जल्दी करें! समय समाप्त होने वाला है!'
                  : 'Hurry up! Almost out of time!'
                : isHi
                ? 'चित्र को 30 सेकंड में सही बनाएं'
                : 'Arrange pieces before clock hits 0'}
            </div>
          </div>
        </div>

        {/* Big digital countdown */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span
              className={`font-mono text-2xl sm:text-3xl font-black tracking-tight ${
                isUrgent ? 'text-red-400 drop-shadow-[0_0_8px_rgba(239,68,68,0.7)]' : isWarning ? 'text-amber-400' : 'text-emerald-400'
              }`}
            >
              {timeLeft.toFixed(1)}
              <span className="text-xs ml-0.5 font-normal text-slate-400">s</span>
            </span>
          </div>

          {/* Mini Ring Gauge */}
          <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
            <svg className="w-12 h-12 -rotate-90" viewBox="0 0 70 70">
              <circle
                cx="35"
                cy="35"
                r={radius}
                className="stroke-slate-800"
                strokeWidth="6"
                fill="transparent"
              />
              <circle
                cx="35"
                cy="35"
                r={radius}
                stroke={strokeColor}
                strokeWidth="6"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                style={{ transition: 'stroke-dashoffset 0.1s linear' }}
              />
            </svg>
            <span className="absolute text-[10px] font-bold font-mono text-slate-300">
              {Math.ceil(timeLeft)}
            </span>
          </div>
        </div>
      </div>

      {/* Linear bar */}
      <div className="w-full bg-slate-800/80 rounded-full h-2.5 overflow-hidden p-0.5 border border-slate-700/50">
        <div
          className={`h-full rounded-full transition-all duration-100 ${colorClass}`}
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
};
