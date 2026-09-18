import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, Sparkles, ArrowRight, RotateCcw, Clock, Award } from 'lucide-react';
import { Language, LevelConfig } from '../types';
import { sound } from '../utils/audio';

interface WinModalProps {
  bet: number;
  timeTaken: number;
  level: LevelConfig;
  hasNextLevel: boolean;
  onNextLevel: () => void;
  onReplay: () => void;
  language: Language;
}

export const WinModal: React.FC<WinModalProps> = ({
  bet,
  timeTaken,
  level,
  hasNextLevel,
  onNextLevel,
  onReplay,
  language,
}) => {
  const isHi = language === 'hi';
  const payout = bet * 10;

  useEffect(() => {
    sound.playWin10X();

    // Launch celebratory confetti bursts
    const end = Date.now() + 2.5 * 1000;
    const colors = ['#f59e0b', '#fbbf24', '#10b981', '#38bdf8', '#ffffff'];

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
      <div
        id="win-celebration-modal"
        className="relative max-w-md w-full bg-slate-900 border-2 border-amber-500/80 rounded-3xl p-6 sm:p-7 text-center shadow-2xl shadow-amber-500/30 overflow-hidden"
      >
        {/* Glow halo */}
        <div className="absolute -top-20 -left-20 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-yellow-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Icon & Badge */}
        <div className="relative mx-auto w-20 h-20 mb-4 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 animate-ping opacity-25" />
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center shadow-xl shadow-amber-500/40 text-slate-950">
            <Trophy className="w-10 h-10 stroke-[2.5]" />
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          {isHi ? 'शानदार जीत! 10X जैकपॉट' : 'Victory! 10X Jackpot'}
        </div>

        <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          {isHi ? 'बधाई हो! आपने चित्र बना लिया!' : 'Puzzle Solved in Time!'}
        </h3>
        <p className="text-xs text-slate-300 mt-1">
          {isHi
            ? `आपने केवल ${timeTaken.toFixed(1)} सेकंड में पूरा चित्र सही कर दिया!`
            : `Completed within ${timeTaken.toFixed(1)} seconds!`}
        </p>

        {/* 10X Payout showcase */}
        <div className="my-5 p-4 rounded-2xl bg-gradient-to-b from-amber-950/60 to-slate-950 border border-amber-500/50">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
            {isHi ? 'कुल प्राप्त राशि (10 गुणा)' : 'Total Received (10X Multiplier)'}
          </div>
          <div className="text-3xl sm:text-4xl font-black text-amber-300 font-mono flex items-center justify-center gap-2">
            <span>+₹{payout.toLocaleString('en-IN')}</span>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-800 grid grid-cols-2 gap-2 text-xs text-slate-400">
            <div>
              <span className="block text-[10px] uppercase text-slate-500">
                {isHi ? 'लगाई गई शर्त' : 'Wagered Bet'}
              </span>
              <strong className="text-white font-mono">₹{bet}</strong>
            </div>
            <div>
              <span className="block text-[10px] uppercase text-slate-500">
                {isHi ? 'समय लिया' : 'Time Taken'}
              </span>
              <strong className="text-emerald-400 font-mono flex items-center justify-center gap-1">
                <Clock className="w-3 h-3" />
                {timeTaken.toFixed(1)}s / 30s
              </strong>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-2.5">
          {hasNextLevel ? (
            <button
              id="btn-next-level"
              type="button"
              onClick={onNextLevel}
              className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-500/30 transition-all cursor-pointer"
            >
              <span>{isHi ? 'अगले लेवल पर जाएं' : 'Proceed to Next Level'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-1.5">
              <Award className="w-4 h-4" />
              {isHi ? 'अद्भुत! आपने सभी लेवल पार कर लिए हैं!' : 'Master! You have beat all levels!'}
            </div>
          )}

          <button
            id="btn-replay-level"
            type="button"
            onClick={onReplay}
            className="w-full py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{isHi ? 'यह लेवल दोबारा खेलें' : 'Play This Level Again'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
