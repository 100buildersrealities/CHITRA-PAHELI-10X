import React from 'react';
import { X, Clock, Flame, RotateCw, Trophy, ArrowRightCircle } from 'lucide-react';
import { Language } from '../types';

interface RulesGuideModalProps {
  onClose: () => void;
  language: Language;
}

export const RulesGuideModal: React.FC<RulesGuideModalProps> = ({ onClose, language }) => {
  const isHi = language === 'hi';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        id="rules-guide-modal"
        className="relative max-w-lg w-full bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl text-white overflow-hidden max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              ?
            </div>
            <h3 className="text-lg font-bold text-white">
              {isHi ? 'गेम के नियम एवं 10X गाइड' : 'Game Rules & 10X Guide'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-300">
          {/* Rule 1 */}
          <div className="p-3.5 rounded-2xl bg-slate-850 bg-slate-800/60 border border-slate-700/60 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">
                {isHi ? '1. केवल 30 सेकंड का समय' : '1. 30 Seconds Time Limit'}
              </h4>
              <p className="text-slate-400 mt-0.5">
                {isHi
                  ? 'हर स्तर पर आपको बिखरे हुए चित्र को ठीक 30 सेकंड के अंदर सही क्रम में जोड़ना होगा।'
                  : 'You have strictly 30 seconds to reconstruct the scrambled picture into its original form.'}
              </p>
            </div>
          </div>

          {/* Rule 2 */}
          <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-amber-400 text-sm">
                {isHi ? '2. शर्त का सीधा 2 गुना ईनाम (2X Multiplier)' : '2. 2X Direct Return On Fast Win'}
              </h4>
              <p className="text-slate-400 mt-0.5">
                {isHi
                  ? '30 सेकंड के भीतर चित्र सही करने पर लगाई गई शर्त का सीधा 2 गुना (जैसे ₹50 लगाने पर ₹100) वॉलेट में जुड़ता है और कंफेटी/सिक्कों की बारिश होती है।'
                  : 'Solving the puzzle correctly within 30 seconds doubles your wagered bet directly into your wallet (e.g. ₹50 wager wins ₹100) with a celebration of coins and confetti shower!'}
              </p>
            </div>
          </div>

          {/* Rule 3 */}
          <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 shrink-0">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">
                {isHi ? '3. 1 से 100 स्तरों की क्रमिक कठिनाई' : '3. 100 Progressive Difficulty Levels'}
              </h4>
              <p className="text-slate-400 mt-0.5">
                {isHi
                  ? 'शुरुआती स्तर सरल (2x2 ग्रिड = 4 टुकड़े) होंगे। आगे 3x3, 4x4 और 5x5 ग्रिड तक कुल 100 लेवल्स की क्रमिक चुनौती है, जिसमें टुकड़े उल्टे-सीधे (रोटेटेड ↺) भी मिलेंगे।'
                  : 'Begins with simple 2x2 grids (4 pieces), scaling progressively through 3x3, 4x4, and 5x5 grids across 100 levels with rotated tiles ↺ up to the Level 100 finale!'}
              </p>
            </div>
          </div>

          {/* Rule 4 */}
          <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400 shrink-0">
              <RotateCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">
                {isHi ? '4. टुकड़े कैसे बदलें व घुमाएं?' : '4. How to Swap and Rotate?'}
              </h4>
              <p className="text-slate-400 mt-0.5">
                {isHi
                  ? 'पहले किसी टुकड़े को टैप करें, फिर दूसरे टुकड़े को टैप करें - दोनों आपस में बदल जाएंगे। उल्टे टुकड़ों को सीधा करने के लिए ↺ बटन दबाएं।'
                  : 'Tap piece A then piece B to swap them, or drag & drop. For rotated tiles, tap the ↺ button to orient it right.'}
              </p>
            </div>
          </div>

          {/* Rule 5 - Welcome Bonus & PhonePe Real Game Deposit */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-purple-950/50 to-slate-800/80 border border-purple-500/50 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#5f259f] text-white flex items-center justify-center font-black text-sm shrink-0 shadow-md">
              पे
            </div>
            <div>
              <h4 className="font-bold text-purple-300 text-sm">
                {isHi
                  ? '5. ₹50 वेलकम बोनस एवं PhonePe / UPI रियल गेम डिपॉजिट'
                  : '5. ₹50 Welcome Bonus & PhonePe / UPI Deposit'}
              </h4>
              <p className="text-slate-300 mt-0.5">
                {isHi
                  ? 'रजिस्ट्रेशन पूरा होते ही खिलाड़ी को गेम शुरू करने के लिए ₹50 का वेलकम बोनस प्राप्त होता है। अगर खिलाड़ी वेलकम बोनस हार जाता है, तो गेम में बने रहने के लिए PhonePe या UPI (9981228006-2@axl) पर ₹100 से ₹1,000 पेमेंट करने के बाद अपनी जमा राशि का स्क्रीनशॉट अपलोड करें और WhatsApp (9981228006) पर भेजें। उसके बाद ही डिपॉजिट सत्यापित होगी।'
                  : 'Upon registration, players receive ₹50 Welcome Bonus. If exhausted, continue the real game by depositing ₹100 to ₹1,000 via PhonePe or UPI (9981228006-2@axl), uploading payment screenshot, and sending to WhatsApp (9981228006) for verification.'}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <span>{isHi ? 'समझ गया, खेल शुरू करें!' : 'Got it, Let’s Play!'}</span>
            <ArrowRightCircle className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
