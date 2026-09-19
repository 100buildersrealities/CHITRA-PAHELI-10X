import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, Sparkles, ArrowRight, RotateCcw, Clock, Award, Coins, CheckCircle2, Zap } from 'lucide-react';
import { Language, LevelConfig } from '../types';
import { sound } from '../utils/audio';
import { CoinShower } from './CoinShower';

interface WinModalProps {
  bet: number;
  timeTaken: number;
  level: LevelConfig;
  hasNextLevel: boolean;
  onNextLevel: () => void;
  onReplay: () => void;
  onOpenWithdraw?: () => void;
  language: Language;
}

export const WinModal: React.FC<WinModalProps> = ({
  bet,
  timeTaken,
  level,
  hasNextLevel,
  onNextLevel,
  onReplay,
  onOpenWithdraw,
  language,
}) => {
  const isHi = language === 'hi';
  const payout = bet * 2;

  useEffect(() => {
    sound.playWin10X();

    // Launch celebratory confetti bursts and continuous stream
    const end = Date.now() + 3.5 * 1000;
    const colors = ['#f59e0b', '#fbbf24', '#ffd700', '#10b981', '#38bdf8', '#ffffff'];

    // Initial big burst from center-top
    confetti({
      particleCount: 60,
      spread: 90,
      origin: { x: 0.5, y: 0.3 },
      colors,
      gravity: 0.9,
      scalar: 1.2,
    });

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 60,
        origin: { x: 0, y: 0.65 },
        colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 60,
        origin: { x: 1, y: 0.65 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-300">
      {/* Falling Coins & Confetti Shower */}
      <CoinShower durationMs={6000} />

      <div
        id="win-celebration-modal"
        className="relative max-w-md w-full bg-slate-900/95 border-2 border-amber-400/90 rounded-3xl p-6 sm:p-7 text-center shadow-2xl shadow-amber-500/40 overflow-hidden z-50 backdrop-blur-xl"
      >
        {/* Glow halo */}
        <div className="absolute -top-20 -left-20 w-52 h-52 bg-amber-500/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-52 h-52 bg-yellow-500/25 rounded-full blur-3xl pointer-events-none" />

        {/* Icon & Badge */}
        <div className="relative mx-auto w-20 h-20 mb-3 flex items-center justify-center">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 animate-ping opacity-20" />
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center shadow-xl shadow-amber-500/40 text-slate-950">
            <Trophy className="w-10 h-10 stroke-[2.5]" />
          </div>
        </div>

        {/* Milestone Prize Tag */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{isHi ? `पड़ाव ईनाम: ${level.prizeTag}` : `Milestone Prize: ${level.prizeTag}`}</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          {isHi ? 'बिल्कुल सही जवाब!' : 'Correct Answer!'}
        </h3>
        <p className="text-xs text-slate-300 mt-1">
          {isHi
            ? `कंप्यूटर जी ने आपके उत्तर को लॉक किया और आपने ${timeTaken.toFixed(1)} सेकंड में जीत हासिल की!`
            : `Locked and verified! Answered in ${timeTaken.toFixed(1)} seconds!`}
        </p>

        {/* 2X Payout showcase */}
        <div className="my-4 p-4 rounded-2xl bg-gradient-to-b from-amber-950/70 via-slate-900 to-slate-950 border border-amber-500/60 shadow-lg">
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
            <Coins className="w-4 h-4 text-amber-300" />
            <span>{isHi ? 'वॉलेट में जुड़ी राशि (शर्त का सीधा 2 गुना)' : 'Added to Wallet (Direct 2X Multiplier)'}</span>
          </div>

          <div className="text-3xl sm:text-4xl font-black text-amber-300 font-mono flex items-center justify-center gap-2">
            <span>+₹{payout.toLocaleString('en-IN')}</span>
          </div>

          <div className="mt-1 text-[11px] text-amber-200/90 font-medium">
            {isHi
              ? `(₹${bet} शर्त ➔ सीधा ₹${payout} वॉलेट में जुड़ा)`
              : `(Wagered ₹${bet} ➔ ₹${payout} added to your wallet)`}
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

        {/* Withdraw winnings quick callout */}
        {onOpenWithdraw && (
          <button
            type="button"
            onClick={onOpenWithdraw}
            className="w-full mb-3 py-2 px-3 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            <span>
              {isHi
                ? 'जीते हुए पैसे PhonePe / GPay में तुरंत निकालें'
                : 'Withdraw winnings via PhonePe / GPay now'}
            </span>
          </button>
        )}

        {/* Action buttons */}
        <div className="flex flex-col gap-2.5">
          {hasNextLevel ? (
            <button
              id="btn-next-level"
              type="button"
              onClick={onNextLevel}
              className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-500/30 transition-all cursor-pointer"
            >
              <span>{isHi ? `अगला सवाल (लेवल ${level.id + 1})` : `Next Question (Level ${level.id + 1})`}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/20 to-yellow-400/20 border border-amber-500/40 text-amber-300 text-xs font-bold flex items-center justify-center gap-2 shadow-lg">
              <Award className="w-5 h-5 text-amber-400" />
              <span>
                {isHi
                  ? 'अद्भुत! आपने सभी 100 स्तर सफलतापूर्वक पार कर लिए हैं! आप 7 करोड़ के महा-विजेता हैं!'
                  : 'Grand Champion! You completed all 100 questions! ₹7 Crore winner!'}
              </span>
            </div>
          )}

          <button
            id="btn-replay-level"
            type="button"
            onClick={onReplay}
            className="w-full py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{isHi ? 'यह सवाल दोबारा खेलें' : 'Play This Question Again'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
