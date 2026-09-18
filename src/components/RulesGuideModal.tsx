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
                {isHi ? '2. शर्त का 10 गुना ईनाम (10X Multiplier)' : '2. 10X Cash Return On Win'}
              </h4>
              <p className="text-slate-400 mt-0.5">
                {isHi
                  ? 'शुरुआत में अपनी इच्छानुसार शर्त (उदा. ₹50) लगाएं। 30 सेकंड में जीतने पर आपको लगाए गए पैसे का 10 गुना (₹500) सीधा मिलेगा!'
                  : 'Wager your desired coins (e.g. ₹50). Solving the puzzle in 30s pays 10X your wager (₹500)!'}
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
                {isHi ? '3. स्तर बढ़ने के साथ कठिनाई' : '3. Increasing Difficulty'}
              </h4>
              <p className="text-slate-400 mt-0.5">
                {isHi
                  ? 'शुरुआती स्तर सरल (2x2 ग्रिड = 4 टुकड़े) होंगे। आगे 3x3, 4x4 और 5x5 ग्रिड आएंगे और टुकड़े उल्टे-सीधे (रोटेटेड) भी मिलेंगे।'
                  : 'Begins with simple 2x2 grids (4 pieces). Progresses to 3x3, 4x4, 5x5 with inverted and rotated tiles.'}
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
                  ? 'रजिस्ट्रेशन पूरा होते ही खिलाड़ी को गेम शुरू करने के लिए ₹50 का वेलकम बोनस प्राप्त होता है। अगर खिलाड़ी वेलकम बोनस हार जाता है, तो वह गेम में बने रहने के लिए PhonePe नंबर 9981228006 अथवा UPI ID: 9981228006-2@axl पर ₹100 से ₹1,000 देकर रियल गेम खेल सकता है।'
                  : 'Upon completing registration, players receive a ₹50 Welcome Bonus to start the game. If the welcome bonus is lost, players can continue playing the real game by depositing ₹100 to ₹1,000 via PhonePe number 9981228006 or UPI ID: 9981228006-2@axl.'}
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
