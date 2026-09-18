import React, { useRef } from 'react';
import { Lock, CheckCircle2, Play, Upload, Image as ImageIcon } from 'lucide-react';
import { LevelConfig, Language } from '../types';

interface LevelSelectorProps {
  levels: LevelConfig[];
  currentLevelIndex: number;
  highestUnlockedLevel: number;
  onSelectLevel: (index: number) => void;
  onCustomImageUpload: (dataUrl: string) => void;
  language: Language;
}

export const LevelSelector: React.FC<LevelSelectorProps> = ({
  levels,
  currentLevelIndex,
  highestUnlockedLevel,
  onSelectLevel,
  onCustomImageUpload,
  language,
}) => {
  const isHi = language === 'hi';
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        onCustomImageUpload(result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="w-full bg-slate-900/60 border border-slate-800 rounded-3xl p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
            <ImageIcon className="w-4 h-4 text-amber-400" />
            <span>{isHi ? 'गेम लेवल्स (कठिनाई क्रम)' : 'Game Levels (Progression)'}</span>
          </h3>
          <p className="text-[11px] text-slate-400">
            {isHi ? 'सरल 2x2 से शुरुआत होकर 5x5 मास्टर लेवल तक' : 'Starting simple 2x2 to master 5x5'}
          </p>
        </div>

        {/* Custom Upload Button */}
        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-amber-300 transition-colors cursor-pointer"
            title={isHi ? 'अपनी तस्वीर अपलोड करें' : 'Upload Your Own Photo'}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>{isHi ? 'खुद की फोटो जोड़ें' : 'Custom Photo'}</span>
          </button>
        </div>
      </div>

      {/* Levels list carousel / grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
        {levels.map((lvl, idx) => {
          const isUnlocked = idx <= highestUnlockedLevel;
          const isSelected = idx === currentLevelIndex;
          const isCompleted = idx < highestUnlockedLevel;

          return (
            <button
              key={lvl.id}
              type="button"
              disabled={!isUnlocked}
              onClick={() => onSelectLevel(idx)}
              className={`relative p-2 rounded-2xl border text-left flex flex-col items-center justify-between transition-all duration-200 overflow-hidden ${
                isSelected
                  ? 'bg-amber-500/15 border-amber-500 ring-2 ring-amber-400/40 shadow-lg'
                  : isUnlocked
                  ? 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700 cursor-pointer'
                  : 'bg-slate-900/40 border-slate-800/60 opacity-50 cursor-not-allowed'
              }`}
            >
              {/* Thumbnail */}
              <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-1.5 bg-slate-800">
                <img
                  src={lvl.imageUrl}
                  alt={lvl.titleHi}
                  className={`w-full h-full object-cover ${!isUnlocked ? 'grayscale' : ''}`}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60"><rect width="60" height="60" fill="%23334155"/></svg>';
                  }}
                />
                {!isUnlocked && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] flex items-center justify-center text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                )}
                {isCompleted && (
                  <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center">
                    <CheckCircle2 className="w-3 h-3 stroke-[3]" />
                  </div>
                )}
              </div>

              {/* Label */}
              <div className="w-full text-center">
                <div className="text-[11px] font-bold text-white truncate">
                  L{idx + 1}: {lvl.gridSize}x{lvl.gridSize}
                </div>
                <div className="text-[10px] text-amber-400/90 truncate">
                  {lvl.hasRotation ? (isHi ? 'उल्टे टुकड़े ↺' : 'Rotated ↺') : (isHi ? 'सीधा' : 'Plain')}
                </div>
              </div>

              {isSelected && (
                <div className="w-full mt-1 py-0.5 rounded bg-amber-500 text-slate-950 font-black text-[9px] text-center uppercase tracking-wider">
                  {isHi ? 'सक्रिय' : 'Active'}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
