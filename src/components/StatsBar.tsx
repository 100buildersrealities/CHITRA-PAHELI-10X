import React from 'react';
import { Trophy, TrendingUp, Clock, Zap } from 'lucide-react';
import { GameStats, Language } from '../types';

interface StatsBarProps {
  stats: GameStats;
  language: Language;
}

export const StatsBar: React.FC<StatsBarProps> = ({ stats, language }) => {
  const isHi = language === 'hi';
  const winRate =
    stats.gamesPlayed > 0 ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100) : 0;

  return (
    <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2 text-slate-300">
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-3 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
          <Trophy className="w-4 h-4" />
        </div>
        <div>
          <div className="text-[10px] uppercase font-bold text-slate-400">
            {isHi ? '2X जीतें' : '2X Wins'}
          </div>
          <div className="text-base font-black text-white font-mono">
            {stats.gamesWon} / {stats.gamesPlayed}
          </div>
        </div>
      </div>

      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-3 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
          <TrendingUp className="w-4 h-4" />
        </div>
        <div>
          <div className="text-[10px] uppercase font-bold text-slate-400">
            {isHi ? 'कुल कमाई' : 'Total Won'}
          </div>
          <div className="text-base font-black text-emerald-400 font-mono">
            ₹{stats.totalWon.toLocaleString('en-IN')}
          </div>
        </div>
      </div>

      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-3 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center shrink-0">
          <Clock className="w-4 h-4" />
        </div>
        <div>
          <div className="text-[10px] uppercase font-bold text-slate-400">
            {isHi ? 'सर्वश्रेष्ठ समय' : 'Best Time'}
          </div>
          <div className="text-base font-black text-sky-300 font-mono">
            {stats.bestTime > 0 ? `${stats.bestTime.toFixed(1)}s` : '--'}
          </div>
        </div>
      </div>

      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-3 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
          <Zap className="w-4 h-4" />
        </div>
        <div>
          <div className="text-[10px] uppercase font-bold text-slate-400">
            {isHi ? 'जीत दर (Win Rate)' : 'Win Rate'}
          </div>
          <div className="text-base font-black text-purple-300 font-mono">{winRate}%</div>
        </div>
      </div>
    </div>
  );
};
