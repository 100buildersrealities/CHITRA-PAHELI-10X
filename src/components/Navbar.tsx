import React from 'react';
import { Volume2, VolumeX, HelpCircle, Coins, PlusCircle, User, LogOut } from 'lucide-react';
import { Language, UserAccount } from '../types';

interface NavbarProps {
  currentUser: UserAccount | null;
  onLogout: () => void;
  walletBalance: number;
  currentLevelIndex: number;
  totalLevels: number;
  language: Language;
  onLanguageToggle: () => void;
  soundEnabled: boolean;
  onSoundToggle: () => void;
  onOpenHelp: () => void;
  onOpenDeposit: () => void;
  onClaimBonus: () => void;
  onResetProgress: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  onLogout,
  walletBalance,
  currentLevelIndex,
  totalLevels,
  language,
  onLanguageToggle,
  soundEnabled,
  onSoundToggle,
  onOpenHelp,
  onOpenDeposit,
  onClaimBonus,
  onResetProgress,
}) => {
  const isHi = language === 'hi';

  return (
    <header className="sticky top-0 z-30 w-full bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-white px-4 py-3 shadow-md">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Logo & Level */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center shadow-lg shadow-amber-500/20 text-slate-950 font-black text-xl">
            10X
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                {isHi ? 'चित्र पहेली 10X' : 'Picture Puzzle 10X'}
              </h1>
              <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {isHi ? '30 सेकंड्स' : '30s Rush'}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {isHi
                ? `लेवल ${currentLevelIndex + 1} / ${totalLevels}`
                : `Level ${currentLevelIndex + 1} of ${totalLevels}`}
            </p>
          </div>
        </div>

        {/* User Info & Wallet & Controls */}
        <div className="flex items-center flex-wrap gap-2 sm:gap-3">
          {/* User ID Badge */}
          {currentUser && (
            <div
              id="user-profile-badge"
              className="flex items-center gap-2 bg-slate-800/80 border border-slate-700 rounded-xl px-2.5 py-1.5"
            >
              <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-bold">
                <User className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-slate-200 leading-tight truncate max-w-[100px] sm:max-w-[130px]">
                  {currentUser.name}
                </span>
                <span className="text-[10px] font-mono text-amber-400 leading-none">
                  ID: {currentUser.mobile}
                </span>
              </div>
              <button
                id="btn-navbar-logout"
                type="button"
                onClick={onLogout}
                title={isHi ? 'लॉगआउट करें' : 'Log out'}
                className="ml-1 p-1 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-red-400 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Wallet Display */}
          <div
            id="wallet-display"
            className="flex items-center gap-2 bg-slate-800/90 border border-amber-500/30 rounded-xl px-3 py-1.5 shadow-inner"
          >
            <Coins className="w-4 h-4 text-amber-400 animate-pulse" />
            <div className="flex flex-col text-right">
              <span className="text-[10px] font-medium text-slate-400 leading-none">
                {isHi ? 'वॉलेट राशि' : 'Wallet'}
              </span>
              <span className="text-sm font-bold text-amber-400 font-mono leading-tight">
                ₹{walletBalance.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* PhonePe Deposit Button */}
          <button
            id="btn-navbar-deposit"
            type="button"
            onClick={onOpenDeposit}
            title={isHi ? 'PhonePe (9981228006) से ₹100 - ₹1000 डिपॉजिट करें' : 'Deposit via PhonePe (9981228006)'}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-md ${
              walletBalance < 20
                ? 'bg-gradient-to-r from-purple-600 via-indigo-500 to-purple-600 text-white animate-bounce shadow-purple-900/50'
                : 'bg-[#5f259f] hover:bg-[#702dbd] text-white border border-purple-400/40 shadow-purple-950/40'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-white text-[#5f259f] font-black text-[10px] flex items-center justify-center">
              पे
            </span>
            <span>{isHi ? 'डिपॉजिट (PhonePe)' : 'Deposit'}</span>
          </button>

          {/* Language Toggle */}
          <button
            id="btn-toggle-lang"
            onClick={onLanguageToggle}
            className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors"
            title={isHi ? 'Switch to English' : 'हिंदी में बदलें'}
          >
            {isHi ? 'EN' : 'हिन्दी'}
          </button>

          {/* Sound Toggle */}
          <button
            id="btn-toggle-sound"
            onClick={onSoundToggle}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-colors"
            title={soundEnabled ? (isHi ? 'आवाज़ बंद करें' : 'Mute') : (isHi ? 'आवाज़ चालू करें' : 'Unmute')}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

          {/* Help Button */}
          <button
            id="btn-help-rules"
            onClick={onOpenHelp}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-colors"
            title={isHi ? 'नियम व 10X गाइड' : 'How to Play & 10X Guide'}
          >
            <HelpCircle className="w-4 h-4 text-sky-400" />
          </button>
        </div>
      </div>
    </header>
  );
};
