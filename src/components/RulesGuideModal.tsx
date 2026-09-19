import React from 'react';
import { X, Clock, Sparkles, Trophy, ArrowRightCircle, Users, Zap, HelpCircle } from 'lucide-react';
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
        className="relative max-w-lg w-full bg-slate-900 border border-amber-500/40 rounded-3xl p-6 shadow-2xl text-white overflow-hidden max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-black">
              KBC
            </div>
            <h3 className="text-lg font-bold text-white">
              {isHi ? 'KBC 100X गेम के नियम व गाइड' : 'KBC 100X Rules & Guide'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-300">
          {/* Rule 1: 4 Options & Hotseat Format */}
          <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-amber-300 text-sm">
                {isHi ? '1. सवाल और 4 विकल्प (A, B, C, D)' : '1. Hotseat Question & 4 Options'}
              </h4>
              <p className="text-slate-400 mt-0.5">
                {isHi
                  ? 'कौन बनेगा करोड़पति की तरह हर स्तर पर एक रोचक सामान्य ज्ञान का सवाल पूछा जाता है जिसके 4 विकल्प होते हैं। किसी भी विकल्प को चुनकर "उत्तर लॉक करें" बटन दबाएं।'
                  : 'Just like in KBC, every stage presents a GK question with 4 options (A, B, C, D). Select an option and press "Lock Answer".'}
              </p>
            </div>
          </div>

          {/* Rule 2: 100 Progressive Levels with No Repeats */}
          <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-emerald-400 text-sm">
                {isHi ? '2. लेवल 1 से 100 तक क्रमिक कठिनाई (कोई सवाल रिपीट नहीं)' : '2. 100 Levels - No Repeated Questions'}
              </h4>
              <p className="text-slate-400 mt-0.5">
                {isHi
                  ? 'लेवल 1 से 100 तक क्रमिक कठिनाई स्तर के सवाल हर बार नए आते हैं। एक बार देखा हुआ सवाल दोबारा कभी नहीं आता है!'
                  : 'Levels 1 to 100 progress deterministically from beginner to grandmaster. Questions are tracked per player so no question is ever repeated.'}
              </p>
            </div>
          </div>

          {/* Rule 3: 30 Seconds Timer */}
          <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">
                {isHi ? '3. 30 सेकंड की टिक-टिक घड़ी और 2X जीत' : '3. 30-Second Timer & 2X Win'}
              </h4>
              <p className="text-slate-400 mt-0.5">
                {isHi
                  ? 'समय सीमा समाप्त होने से पहले सही उत्तर लॉक करने पर लगाई गई शर्त का सीधा 2 गुना (2X) वॉलेट में जुड़ता है।'
                  : 'Locking in the correct answer before the 30-second clock expires doubles your wager (2X payout) instantly.'}
              </p>
            </div>
          </div>

          {/* Rule 4: Lifelines */}
          <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 shrink-0">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-purple-300 text-sm">
                {isHi ? '4. लाइफलाइन्स (Lifelines)' : '4. KBC Lifelines'}
              </h4>
              <p className="text-slate-400 mt-0.5">
                {isHi
                  ? 'कठिन सवालों के लिए 50:50, ऑडियंस पोल (Audience Poll), विशेषज्ञ सलाह (Expert Advice) और सवाल बदलो (Flip Question) का उपयोग करें।'
                  : 'Use 50:50, Audience Poll, Ask the Expert, and Flip Question when facing tough questions.'}
              </p>
            </div>
          </div>

          {/* Rule 5: PhonePe & GPay Cash Withdrawal */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-slate-800/80 border border-emerald-500/50 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-emerald-300 text-sm">
                {isHi
                  ? '5. PhonePe व Google Pay (GPay) द्वारा जीती हुई रकम निकालें'
                  : '5. Withdraw Winnings via PhonePe & Google Pay (GPay)'}
              </h4>
              <p className="text-slate-300 mt-0.5">
                {isHi
                  ? 'खिलाड़ी अपनी जीती हुई राशि PhonePe या Google Pay (GPay) में अपना मोबाइल नंबर या UPI ID दर्ज करके तत्काल सीधे अपने बैंक खाते में ट्रांसफर कर सकते हैं।'
                  : 'Players can instantly withdraw their winnings to PhonePe or Google Pay (GPay) by entering their mobile number or UPI ID.'}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{isHi ? 'समझ गया, गेम शुरू करें!' : 'Got it, Let’s Play!'}</span>
            <ArrowRightCircle className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
