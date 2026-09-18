import React, { useRef, useState, useMemo, useEffect } from 'react';
import {
  Lock,
  CheckCircle2,
  Upload,
  Image as ImageIcon,
  Sparkles,
  Trophy,
  Search,
  ChevronRight,
  Flame,
  Check
} from 'lucide-react';
import { LevelConfig, Language } from '../types';
import { createFallbackPatternSvg } from '../utils/levels';

interface LevelSelectorProps {
  levels: LevelConfig[];
  currentLevelIndex: number;
  highestUnlockedLevel: number;
  onSelectLevel: (index: number) => void;
  onCustomImageUpload: (dataUrl: string) => void;
  language: Language;
}

type LevelGroupKey = '1-20' | '21-40' | '41-60' | '61-80' | '81-100' | 'all';

interface LevelGroup {
  key: LevelGroupKey;
  labelHi: string;
  labelEn: string;
  subHi: string;
  subEn: string;
  range: [number, number];
}

const LEVEL_GROUPS: LevelGroup[] = [
  {
    key: '1-20',
    labelHi: '1 - 20',
    labelEn: '1 - 20',
    subHi: 'सरल (2x2 व 3x3)',
    subEn: 'Easy (2x2 & 3x3)',
    range: [0, 19],
  },
  {
    key: '21-40',
    labelHi: '21 - 40',
    labelEn: '21 - 40',
    subHi: 'मध्यम (3x3 विश्व अजूबे)',
    subEn: 'Medium (3x3 Wonders)',
    range: [20, 39],
  },
  {
    key: '41-60',
    labelHi: '41 - 60',
    labelEn: '41 - 60',
    subHi: 'कठिन (4x4 प्रकृति व कारें)',
    subEn: 'Hard (4x4 Nature & Cars)',
    range: [40, 59],
  },
  {
    key: '61-80',
    labelHi: '61 - 80',
    labelEn: '61 - 80',
    subHi: 'मास्टर (4x4 व 5x5 अंतरिक्ष)',
    subEn: 'Master (4x4 & 5x5 Space)',
    range: [60, 79],
  },
  {
    key: '81-100',
    labelHi: '81 - 100',
    labelEn: '81 - 100',
    subHi: 'ग्रैंडमास्टर (5x5 फिनाले)',
    subEn: 'Grandmaster (5x5 Finale)',
    range: [80, 99],
  },
  {
    key: 'all',
    labelHi: 'सभी 100',
    labelEn: 'All 100',
    subHi: 'संपूर्ण स्तर',
    subEn: 'All Levels',
    range: [0, 99],
  },
];

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
  const [searchQuery, setSearchQuery] = useState('');

  // Auto-detect which group the current level belongs to
  const initialGroupKey = useMemo<LevelGroupKey>(() => {
    if (currentLevelIndex < 20) return '1-20';
    if (currentLevelIndex < 40) return '21-40';
    if (currentLevelIndex < 60) return '41-60';
    if (currentLevelIndex < 80) return '61-80';
    return '81-100';
  }, [currentLevelIndex]);

  const [activeGroup, setActiveGroup] = useState<LevelGroupKey>(initialGroupKey);

  // Sync active group when currentLevelIndex changes externally
  useEffect(() => {
    if (activeGroup !== 'all') {
      if (currentLevelIndex < 20 && activeGroup !== '1-20') setActiveGroup('1-20');
      else if (currentLevelIndex >= 20 && currentLevelIndex < 40 && activeGroup !== '21-40') setActiveGroup('21-40');
      else if (currentLevelIndex >= 40 && currentLevelIndex < 60 && activeGroup !== '41-60') setActiveGroup('41-60');
      else if (currentLevelIndex >= 60 && currentLevelIndex < 80 && activeGroup !== '61-80') setActiveGroup('61-80');
      else if (currentLevelIndex >= 80 && activeGroup !== '81-100') setActiveGroup('81-100');
    }
  }, [currentLevelIndex]);

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

  const jumpToCurrentLevel = () => {
    if (currentLevelIndex < 20) setActiveGroup('1-20');
    else if (currentLevelIndex < 40) setActiveGroup('21-40');
    else if (currentLevelIndex < 60) setActiveGroup('41-60');
    else if (currentLevelIndex < 80) setActiveGroup('61-80');
    else setActiveGroup('81-100');
  };

  // Filter levels by active group & search query
  const displayedLevels = useMemo(() => {
    const groupDef = LEVEL_GROUPS.find((g) => g.key === activeGroup);
    const [start, end] = groupDef ? groupDef.range : [0, levels.length - 1];

    return levels
      .map((lvl, index) => ({ lvl, index }))
      .filter(({ lvl, index }) => {
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchesTitleHi = lvl.titleHi.toLowerCase().includes(q);
          const matchesTitleEn = lvl.titleEn.toLowerCase().includes(q);
          const matchesCat = lvl.categoryHi.toLowerCase().includes(q) || lvl.categoryEn.toLowerCase().includes(q);
          const matchesNum = `l${index + 1}`.includes(q) || `${index + 1}` === q;
          return matchesTitleHi || matchesTitleEn || matchesCat || matchesNum;
        }
        return index >= start && index <= end;
      });
  }, [levels, activeGroup, searchQuery]);

  const progressPercent = Math.min(100, Math.round(((highestUnlockedLevel + 1) / levels.length) * 100));

  return (
    <div className="w-full bg-slate-900/80 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-xl">
      {/* Header with Title, Progress, and Custom Upload */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-black">
              <Trophy className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>{isHi ? '100 क्रमिक लेवल्स (चैलेंज)' : '100 Progressive Levels'}</span>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {isHi ? 'लेवल 1 से 100' : 'Lv 1 - 100'}
              </span>
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {isHi
              ? '2x2 (4 टुकड़े) से 3x3, 4x4 और 5x5 (25 टुकड़े + ↺ रोटेशन) तक क्रमिक कठिनाई'
              : 'Progressive difficulty from 2x2 (4 pcs) to 3x3, 4x4, and 5x5 (25 pcs + ↺ rotation)'}
          </p>
        </div>

        {/* Action Controls: Jump to current level & Custom Photo */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={jumpToCurrentLevel}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-xs font-bold text-amber-300 transition-colors cursor-pointer"
            title={isHi ? 'वर्तमान स्तर पर जाएं' : 'Jump to Current Level'}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{isHi ? `चालू लेवल (L${currentLevelIndex + 1})` : `Active (L${currentLevelIndex + 1})`}</span>
          </button>

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
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 hover:text-white transition-colors cursor-pointer"
            title={isHi ? 'अपनी तस्वीर अपलोड करें' : 'Upload Your Own Photo'}
          >
            <Upload className="w-3.5 h-3.5 text-amber-400" />
            <span>{isHi ? 'फोटो अपलोड' : 'Upload Photo'}</span>
          </button>
        </div>
      </div>

      {/* Progress Bar & Stats */}
      <div className="my-3 p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-300">
            {isHi ? 'कुल प्रगति:' : 'Overall Progress:'}
          </span>
          <span className="text-xs font-mono font-bold text-amber-400">
            {highestUnlockedLevel + 1} / {levels.length} {isHi ? 'लेवल्स अनलॉक' : 'Unlocked'}
          </span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
            {progressPercent}%
          </span>
        </div>

        <div className="w-full sm:w-64 h-2 rounded-full bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-500 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Tier Group Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5 my-3">
        {/* Tier Tabs */}
        <div className="flex items-center overflow-x-auto gap-1.5 pb-1 sm:pb-0 scrollbar-none">
          {LEVEL_GROUPS.map((group) => {
            const isTabActive = activeGroup === group.key && !searchQuery.trim();
            const groupRange = group.range;
            const isGroupUnlocked = highestUnlockedLevel >= groupRange[0];

            return (
              <button
                key={group.key}
                type="button"
                onClick={() => {
                  setActiveGroup(group.key);
                  setSearchQuery('');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                  isTabActive
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white border border-slate-700/60'
                }`}
              >
                <span>{isHi ? group.labelHi : group.labelEn}</span>
                {isGroupUnlocked && group.key !== 'all' && (
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isTabActive ? 'bg-slate-950' : 'bg-amber-400'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Search / Jump Input */}
        <div className="relative min-w-[180px] sm:min-w-[220px]">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isHi ? 'लेवल खोजें (उदा. 50, मोर, ताजमहल)...' : 'Search level (e.g. 50, Tiger)...'}
            className="w-full pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Grid of Displayed Levels */}
      {displayedLevels.length === 0 ? (
        <div className="py-12 text-center text-slate-400 text-xs">
          {isHi ? 'कोई लेवल नहीं मिला' : 'No matching level found'}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-10 gap-2.5 max-h-[460px] overflow-y-auto pr-1">
          {displayedLevels.map(({ lvl, index }) => {
            const isUnlocked = index <= highestUnlockedLevel;
            const isSelected = index === currentLevelIndex;
            const isCompleted = index < highestUnlockedLevel;

            return (
              <button
                key={lvl.id}
                type="button"
                disabled={!isUnlocked}
                onClick={() => onSelectLevel(index)}
                className={`relative p-2 rounded-2xl border text-left flex flex-col items-center justify-between transition-all duration-200 overflow-hidden group ${
                  isSelected
                    ? 'bg-amber-500/20 border-amber-400 ring-2 ring-amber-400 shadow-xl shadow-amber-500/20 scale-[1.02]'
                    : isUnlocked
                    ? 'bg-slate-850 bg-slate-800/80 hover:bg-slate-700/90 border-slate-700/80 hover:border-amber-500/40 cursor-pointer'
                    : 'bg-slate-900/40 border-slate-800/60 opacity-40 cursor-not-allowed'
                }`}
              >
                {/* Thumbnail Image */}
                <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-1.5 bg-slate-950">
                  <img
                    src={lvl.imageUrl}
                    alt={isHi ? lvl.titleHi : lvl.titleEn}
                    className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                      !isUnlocked ? 'grayscale blur-[1px]' : ''
                    }`}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = createFallbackPatternSvg(
                        `Level ${index + 1}`
                      );
                    }}
                  />

                  {/* Locked Overlay */}
                  {!isUnlocked && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] flex items-center justify-center text-slate-400">
                      <Lock className="w-4 h-4 text-slate-400" />
                    </div>
                  )}

                  {/* Completed Checkmark */}
                  {isCompleted && (
                    <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-md">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}

                  {/* Grid Badge overlay */}
                  <div className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-xs text-[9px] font-mono font-bold text-amber-300 border border-amber-500/30">
                    {lvl.gridSize}x{lvl.gridSize}
                  </div>

                  {/* Rotation Indicator */}
                  {lvl.hasRotation && (
                    <div className="absolute bottom-1 right-1 px-1 py-0.5 rounded-md bg-rose-500/80 backdrop-blur-xs text-[9px] font-bold text-white shadow">
                      ↺
                    </div>
                  )}
                </div>

                {/* Level Title & Details */}
                <div className="w-full text-center">
                  <div className="text-[11px] font-bold text-white truncate" title={isHi ? lvl.titleHi : lvl.titleEn}>
                    L{index + 1}: {isHi ? lvl.titleHi.split('(')[0].trim() : lvl.titleEn}
                  </div>
                  <div className="text-[9px] text-slate-400 truncate">
                    {isHi ? lvl.categoryHi : lvl.categoryEn}
                  </div>
                </div>

                {/* Status indicator */}
                {isSelected ? (
                  <div className="w-full mt-1 py-0.5 rounded-md bg-amber-500 text-slate-950 font-black text-[9px] text-center uppercase tracking-wider">
                    {isHi ? 'सक्रिय' : 'Active'}
                  </div>
                ) : isCompleted ? (
                  <div className="w-full mt-1 text-[9px] font-semibold text-emerald-400 text-center flex items-center justify-center gap-0.5">
                    <CheckCircle2 className="w-2.5 h-2.5" />
                    <span>{isHi ? 'सफल' : 'Cleared'}</span>
                  </div>
                ) : isUnlocked ? (
                  <div className="w-full mt-1 text-[9px] font-medium text-amber-400/80 text-center">
                    {isHi ? 'खेलें' : 'Play'}
                  </div>
                ) : (
                  <div className="w-full mt-1 text-[9px] font-medium text-slate-500 text-center flex items-center justify-center gap-0.5">
                    <Lock className="w-2.5 h-2.5" />
                    <span>{isHi ? 'बंद' : 'Locked'}</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
