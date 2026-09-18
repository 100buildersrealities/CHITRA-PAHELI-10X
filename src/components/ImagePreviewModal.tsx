import React from 'react';
import { X } from 'lucide-react';
import { LevelConfig, Language } from '../types';

interface ImagePreviewModalProps {
  level: LevelConfig;
  onClose: () => void;
  language: Language;
}

export const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({
  level,
  onClose,
  language,
}) => {
  const isHi = language === 'hi';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        id="image-preview-modal"
        className="relative max-w-lg w-full bg-slate-900 border border-slate-700 rounded-3xl p-5 shadow-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
          <div>
            <h4 className="text-base font-bold text-white">
              {isHi ? 'मूल संपूर्ण चित्र' : 'Original Reference Image'}
            </h4>
            <p className="text-xs text-slate-400">{isHi ? level.titleHi : level.titleEn}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-slate-800 shadow-inner">
          <img
            src={level.imageUrl}
            alt={level.titleHi}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="mt-3 text-center">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider"
          >
            {isHi ? 'खेल पर वापस जाएं' : 'Back to Puzzle'}
          </button>
        </div>
      </div>
    </div>
  );
};
