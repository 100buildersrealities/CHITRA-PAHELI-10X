import React from 'react';
import { Sparkles, Trophy, Flame, ArrowRight, ShieldCheck, Wallet } from 'lucide-react';
import { Language, LevelConfig } from '../types';

interface BetSelectorProps {
  currentBet: number;
  onBetChange: (bet: number) => void;
  walletBalance: number;
  level: LevelConfig;
  onStartGame: () => void;
  onOpenDeposit: () => void;
  language: Language;
}

const CHIP_PRESETS = [10, 20, 50, 100, 200, 500];

export const BetSelector: React.FC<BetSelectorProps> = ({
  currentBet,
  onBetChange,
  walletBalance,
  level,
  onStartGame,
  onOpenDeposit,
  language,
}) => {
  const isHi = language === 'hi';
  const potentialWin = currentBet * 10;
  const canAfford = walletBalance >= currentBet && currentBet > 0;

  return (
    <div
      id="bet-selector-card"
      className="bg-slate-900/90 border border-amber-500/40 rounded-3xl p-5 sm:p-6 shadow-2xl shadow-amber-500/10 backdrop-blur-xl relative overflow-hidden"
    >
      {/* Decorative ambient backdrop */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold mb-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            {isHi ? '10 गुना जैकपॉट चैलेंज' : '10X Jackpot Challenge'}
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {isHi ? 'अपनी शर्त (Bet) चुनें' : 'Select Your Bet Amount'}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {isHi
              ? 'इस लेवल पर जितने पैसे लगाएंगे, 30 सेकंड में जीतने पर उसका सीधा 10 गुना मिलेगा!'
              : 'Wager your coins: Solve the 30-second scrambled puzzle to win exactly 10X!'}
          </p>
        </div>

        {/* Level Details */}
        <div className="flex items-center gap-3 bg-slate-800/80 border border-slate-700/80 rounded-2xl p-2.5">
          <img
            src={level.imageUrl}
            alt={level.titleHi}
            className="w-12 h-12 rounded-xl object-cover border border-slate-600 shadow"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60"><rect width="60" height="60" fill="%23334155"/></svg>';
            }}
          />
          <div>
            <div className="text-xs font-semibold text-white truncate max-w-[150px]">
              {isHi ? level.titleHi : level.titleEn}
            </div>
            <div className="text-[11px] text-amber-400 font-medium">
              {isHi ? level.difficultyHi : level.difficultyEn}
            </div>
          </div>
        </div>
      </div>

      {/* 10X Multiplier Banner Highlight */}
      <div className="my-5 p-4 rounded-2xl bg-gradient-to-r from-amber-950/60 via-yellow-950/40 to-slate-900 border border-amber-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center text-slate-950 font-black text-2xl shadow-lg shadow-amber-500/30">
            10X
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-300">
              {isHi ? 'विजेता पुरस्कार (Winning Payout)' : 'Winning Payout'}
            </div>
            <div className="text-xs text-slate-400">
              {isHi ? 'लगाए गए पैसे × 10 गुना' : 'Wagered Coins × 10 Multiplier'}
            </div>
          </div>
        </div>

        <div className="text-center sm:text-right">
          <div className="text-xs text-slate-400">{isHi ? 'जीतने पर कुल राशि:' : 'Total You Win:'}</div>
          <div className="text-2xl sm:text-3xl font-black text-amber-300 font-mono flex items-center justify-center sm:justify-end gap-1">
            <Trophy className="w-6 h-6 text-amber-400" />
            ₹{potentialWin.toLocaleString('en-IN')}
          </div>
        </div>
      </div>

      {/* Bet Preset Chips */}
      <div className="mb-4">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
          {isHi ? 'शर्त राशि चुनें (Select Amount):' : 'Select Coin Chips:'}
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {CHIP_PRESETS.map((preset) => {
            const isSelected = currentBet === preset;
            const isTooHigh = preset > walletBalance;

            return (
              <button
                key={preset}
                id={`btn-chip-${preset}`}
                type="button"
                disabled={isTooHigh}
                onClick={() => onBetChange(preset)}
                className={`py-2.5 px-3 rounded-2xl font-bold font-mono text-sm transition-all duration-200 flex flex-col items-center justify-center gap-0.5 border ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 border-amber-300 shadow-lg shadow-amber-500/30 scale-105'
                    : isTooHigh
                    ? 'bg-slate-900/50 text-slate-600 border-slate-800 cursor-not-allowed opacity-50'
                    : 'bg-slate-800 hover:bg-slate-700/80 text-white border-slate-700'
                }`}
              >
                <span>₹{preset}</span>
                <span
                  className={`text-[10px] font-sans ${
                    isSelected ? 'text-slate-900 font-bold' : 'text-amber-400/80'
                  }`}
                >
                  Win ₹{preset * 10}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom Slider or All-in button */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-slate-800/40 p-3 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">{isHi ? 'कस्टम शर्त:' : 'Custom Bet:'}</span>
          <div className="relative">
            <span className="absolute left-2.5 top-1.5 text-xs text-amber-400 font-mono font-bold">₹</span>
            <input
              id="custom-bet-input"
              type="number"
              min={1}
              max={walletBalance}
              value={currentBet || ''}
              onChange={(e) => {
                const val = Math.max(0, parseInt(e.target.value, 10) || 0);
                onBetChange(Math.min(val, walletBalance));
              }}
              className="w-28 pl-6 pr-2 py-1 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {walletBalance > 0 && (
            <button
              id="btn-bet-max"
              type="button"
              onClick={() => onBetChange(walletBalance)}
              className="text-xs font-semibold px-2.5 py-1 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 transition-colors"
            >
              {isHi ? 'अधिकतम (Max)' : 'Max All-In'}
            </button>
          )}
          <span className="text-xs text-slate-400">
            {isHi ? 'वॉलेट:' : 'Wallet:'} <strong className="text-white font-mono">₹{walletBalance}</strong>
          </span>
        </div>
      </div>

      {/* Start Button */}
      <button
        id="btn-start-challenge"
        type="button"
        disabled={!canAfford}
        onClick={onStartGame}
        className={`w-full py-4 px-6 rounded-2xl font-black text-base sm:text-lg tracking-wide uppercase flex items-center justify-center gap-3 transition-all duration-300 shadow-xl ${
          canAfford
            ? 'bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-slate-950 shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] cursor-pointer'
            : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
        }`}
      >
        <Flame className="w-5 h-5 text-slate-950 animate-pulse" />
        <span>
          {isHi
            ? `शर्त ₹${currentBet} लगाएं और खेलें (जीत: ₹${potentialWin})`
            : `Bet ₹${currentBet} & Start (Win ₹${potentialWin})`}
        </span>
        <ArrowRight className="w-5 h-5" />
      </button>

      {/* When balance is lower than current bet or low, show PhonePe deposit callout */}
      {!canAfford && (
        <div className="mt-4 p-4 rounded-2xl bg-gradient-to-br from-purple-950/80 via-slate-900 to-slate-900 border-2 border-purple-500/50 text-center animate-in fade-in duration-200">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-[11px] font-bold mb-2">
            <span className="w-3.5 h-3.5 rounded-full bg-[#5f259f] text-white font-black text-[9px] flex items-center justify-center">
              पे
            </span>
            {isHi ? 'वेलकम बोनस समाप्त? रियल गेम खेलें' : 'Welcome Bonus Exhausted? Play Real Game'}
          </div>

          <p className="text-xs text-slate-300 mb-3">
            {isHi
              ? 'गेम में बने रहने के लिए PhonePe (9981228006) से ₹100 से ₹1,000 डिपॉजिट करें और 10X जैकपॉट जीतना जारी रखें!'
              : 'Deposit ₹100 to ₹1,000 via PhonePe (9981228006) to continue playing and winning 10X!'}
          </p>

          <button
            id="btn-betselector-deposit"
            type="button"
            onClick={onOpenDeposit}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#5f259f] via-purple-600 to-[#5f259f] hover:from-purple-500 hover:to-indigo-500 text-white font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-purple-900/50 transition-all cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>
              {isHi
                ? 'PhonePe से ₹100 - ₹1000 डिपॉजिट करें'
                : 'Deposit via PhonePe (₹100 - ₹1000)'}
            </span>
          </button>
        </div>
      )}

      {/* General deposit link for anytime access */}
      {canAfford && (
        <div className="mt-3 text-center">
          <button
            type="button"
            onClick={onOpenDeposit}
            className="text-xs text-purple-400 hover:text-purple-300 flex items-center justify-center gap-1 mx-auto font-medium transition-colors"
          >
            <Wallet className="w-3.5 h-3.5" />
            <span>
              {isHi
                ? 'अधिक बैलेंस के लिए PhonePe (9981228006) से पैसे जोड़ें'
                : 'Add more balance via PhonePe (9981228006)'}
            </span>
          </button>
        </div>
      )}
    </div>
  );
};
