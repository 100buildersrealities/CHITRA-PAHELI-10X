import React, { useEffect } from 'react';
import { AlertOctagon, RotateCcw, ArrowLeft, ShieldCheck, XCircle } from 'lucide-react';
import { Language, LevelConfig } from '../types';
import { sound } from '../utils/audio';

interface GameOverModalProps {
  bet: number;
  walletBalance: number;
  level: LevelConfig;
  reason?: 'wrong' | 'timeout';
  onRetry: () => void;
  onBackToBetting: () => void;
  onOpenDeposit: () => void;
  onClaimBonus: () => void;
  language: Language;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  bet,
  walletBalance,
  level,
  reason = 'timeout',
  onRetry,
  onBackToBetting,
  onOpenDeposit,
  onClaimBonus,
  language,
}) => {
  const isHi = language === 'hi';

  useEffect(() => {
    sound.playLoss();
  }, []);

  const isWrong = reason === 'wrong';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
      <div
        id="game-over-modal"
        className="relative max-w-md w-full bg-slate-900 border-2 border-red-500/60 rounded-3xl p-6 sm:p-7 text-center shadow-2xl shadow-red-950/50 overflow-hidden"
      >
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Big Alert Icon */}
        <div className="mx-auto w-16 h-16 mb-4 rounded-2xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400">
          {isWrong ? <XCircle className="w-8 h-8" /> : <AlertOctagon className="w-8 h-8" />}
        </div>

        <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          {isWrong
            ? isHi
              ? 'गलत उत्तर! (Wrong Answer)'
              : 'Wrong Answer!'
            : isHi
            ? 'समय समाप्त! (Time Out)'
            : 'Time Expired!'}
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          {isWrong
            ? isHi
              ? `कंप्यूटर जी ने इस उत्तर को अमान्य घोषित किया। सही उत्तर था: "${level.question.optionsHi[level.question.correctIndex]}"`
              : `Incorrect choice. The correct answer was: "${level.question.optionsEn[level.question.correctIndex]}"`
            : isHi
            ? '30 सेकंड की टिक-टिक घड़ी समाप्त हो गई और उत्तर नहीं दिया गया।'
            : 'The 30-second hotseat clock reached zero before answering.'}
        </p>

        {/* Bet lost details */}
        <div className="my-4 p-4 rounded-2xl bg-red-950/30 border border-red-900/60">
          <div className="text-xs font-semibold uppercase tracking-wider text-red-400 mb-1">
            {isHi ? 'शर्त राशि का नुकसान' : 'Bet Wager Lost'}
          </div>
          <div className="text-2xl sm:text-3xl font-black text-red-400 font-mono">
            -₹{bet}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            {isHi ? 'शेष वॉलेट राशि:' : 'Remaining Balance:'}{' '}
            <strong className="text-white font-mono">₹{walletBalance}</strong>
          </div>
        </div>

        {/* Real Game Deposit Callout if balance is low or zero */}
        {walletBalance < bet && (
          <div className="mb-4 p-3.5 rounded-2xl bg-gradient-to-r from-purple-950/80 to-slate-800/80 border border-purple-500/40 text-left">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-4 h-4 rounded-full bg-[#5f259f] text-white font-black text-[10px] flex items-center justify-center">
                पे
              </span>
              <span className="text-xs font-bold text-purple-300">
                {isHi ? 'रियल गेम में बने रहें' : 'Continue Real Game'}
              </span>
            </div>
            <p className="text-[11px] text-slate-300 leading-snug">
              {isHi
                ? 'यदि वेलकम बोनस समाप्त हो गया है, तो PhonePe (9981228006) से ₹100 से ₹1,000 डिपॉजिट करके गेम जारी रखें।'
                : 'Welcome bonus depleted? Deposit ₹100 - ₹1,000 via PhonePe (9981228006) to stay in the game!'}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-2.5">
          {walletBalance >= bet ? (
            <button
              id="btn-retry-puzzle"
              type="button"
              onClick={onRetry}
              className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>
                {isHi
                  ? `नया सवाल खेलें (₹${bet} शर्त - 2X जीतें)`
                  : `Try New Question (Bet ₹${bet} - Win 2X)`}
              </span>
            </button>
          ) : (
            <button
              id="btn-modal-phonepe-deposit"
              type="button"
              onClick={onOpenDeposit}
              className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-[#5f259f] via-purple-600 to-[#5f259f] hover:from-purple-500 hover:to-indigo-500 text-white font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-purple-900/50 transition-all cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>
                {isHi
                  ? 'PhonePe से ₹100 - ₹1000 डिपॉजिट करें'
                  : 'Deposit via PhonePe (₹100 - ₹1000)'}
              </span>
            </button>
          )}

          <button
            id="btn-back-to-betting"
            type="button"
            onClick={onBackToBetting}
            className="w-full py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{isHi ? 'शर्त राशि बदलें / मुख्य स्क्रीन' : 'Change Bet / Main Screen'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
