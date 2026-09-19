import React, { useState, useEffect } from 'react';
import {
  HelpCircle,
  Users,
  Sparkles,
  Shuffle,
  Clock,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Award,
  ChevronRight,
  Info,
} from 'lucide-react';
import { LevelConfig, Language, LifelineState, KbcQuestion } from '../types';
import { sound } from '../utils/audio';

interface KbcGameBoardProps {
  level: LevelConfig;
  timeLeft: number;
  totalTime: number;
  currentBet: number;
  onAnswerSubmit: (selectedIndex: number, isCorrect: boolean) => void;
  onTimeExpired: () => void;
  language: Language;
  onFlipQuestion?: () => void;
}

export const KbcGameBoard: React.FC<KbcGameBoardProps> = ({
  level,
  timeLeft,
  totalTime,
  currentBet,
  onAnswerSubmit,
  onTimeExpired,
  language,
  onFlipQuestion,
}) => {
  const isHi = language === 'hi';
  const question = level.question;

  // Selection & Lock State
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [revealedResult, setRevealedResult] = useState<'correct' | 'wrong' | null>(null);

  // Lifelines
  const [lifelines, setLifelines] = useState<LifelineState>({
    fiftyFiftyUsed: false,
    audiencePollUsed: false,
    expertHintUsed: false,
    flipUsed: false,
    hiddenOptions: [],
  });

  const [showAudiencePoll, setShowAudiencePoll] = useState<boolean>(false);
  const [showExpertHint, setShowExpertHint] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  // Reset states when question changes (e.g. next level or flipped)
  useEffect(() => {
    setSelectedOption(null);
    setIsLocked(false);
    setRevealedResult(null);
    setShowAudiencePoll(false);
    setShowExpertHint(false);
    setShowExplanation(false);
    setLifelines({
      fiftyFiftyUsed: false,
      audiencePollUsed: false,
      expertHintUsed: false,
      flipUsed: false,
      hiddenOptions: [],
    });
  }, [question.id]);

  // Handle option click
  const handleSelectOption = (index: number) => {
    if (isLocked || revealedResult !== null) return;
    if (lifelines.hiddenOptions.includes(index)) return; // hidden by 50:50

    sound.playClick();
    setSelectedOption(index);
  };

  // Handle lock-in answer ("उत्तर लॉक करें")
  const handleLockAnswer = () => {
    if (selectedOption === null || isLocked || revealedResult !== null) return;

    setIsLocked(true);
    sound.playLockAnswer();

    // Suspense delay like in KBC (1.6 seconds)
    setTimeout(() => {
      const isCorrect = selectedOption === question.correctIndex;
      if (isCorrect) {
        sound.playCorrectKbc();
        setRevealedResult('correct');
      } else {
        sound.playWrongKbc();
        setRevealedResult('wrong');
      }
      setShowExplanation(true);

      // Transition to win or lose modal after suspense reveal
      setTimeout(() => {
        onAnswerSubmit(selectedOption, isCorrect);
      }, 2200);
    }, 1500);
  };

  // Lifeline: 50:50
  const handleUseFiftyFifty = () => {
    if (lifelines.fiftyFiftyUsed || isLocked) return;

    sound.playLifeline();
    const wrongIndices = [0, 1, 2, 3].filter((idx) => idx !== question.correctIndex);
    // Shuffle and pick 2 to hide
    const toHide = wrongIndices.sort(() => Math.random() - 0.5).slice(0, 2);

    setLifelines((prev) => ({
      ...prev,
      fiftyFiftyUsed: true,
      hiddenOptions: toHide,
    }));

    // If currently selected option got hidden, clear selection
    if (selectedOption !== null && toHide.includes(selectedOption)) {
      setSelectedOption(null);
    }
  };

  // Lifeline: Audience Poll
  const handleUseAudiencePoll = () => {
    if (lifelines.audiencePollUsed || isLocked) return;
    sound.playLifeline();
    setLifelines((prev) => ({ ...prev, audiencePollUsed: true }));
    setShowAudiencePoll(true);
  };

  // Lifeline: Expert Advice
  const handleUseExpertHint = () => {
    if (lifelines.expertHintUsed || isLocked) return;
    sound.playLifeline();
    setLifelines((prev) => ({ ...prev, expertHintUsed: true }));
    setShowExpertHint(true);
  };

  // Lifeline: Flip Question
  const handleUseFlip = () => {
    if (lifelines.flipUsed || isLocked || !onFlipQuestion) return;
    sound.playLifeline();
    setLifelines((prev) => ({ ...prev, flipUsed: true }));
    onFlipQuestion();
  };

  const optionLetters = ['A', 'B', 'C', 'D'];
  const potentialWin = currentBet * 2;
  const timePercent = Math.max(0, Math.min(100, (timeLeft / totalTime) * 100));

  return (
    <div
      id="kbc-hotseat-arena"
      className="w-full max-w-4xl mx-auto flex flex-col items-center gap-5 text-white"
    >
      {/* Top Header Bar: Level, Category, Prize, Potential Win */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 bg-slate-900/90 border border-amber-500/40 rounded-2xl px-4 py-3 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 font-black text-sm flex items-center justify-center shadow-lg shadow-amber-500/20">
            {level.id}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold text-amber-300 uppercase tracking-wide">
                {isHi ? `सवाल ${level.id} / 100` : `Question ${level.id} of 100`}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 font-medium">
                {isHi ? question.categoryHi : question.categoryEn}
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              {isHi ? level.difficultyHi : level.difficultyEn}
            </p>
          </div>
        </div>

        {/* Prize & Bet Return */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-amber-400/80 block leading-none">
              {isHi ? 'KBC पड़ाव ईनाम' : 'Milestone Prize'}
            </span>
            <span className="text-base sm:text-lg font-black text-amber-300 font-mono leading-tight">
              {level.prizeTag}
            </span>
          </div>

          <div className="h-8 w-px bg-slate-800" />

          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-emerald-400/80 block leading-none">
              {isHi ? 'शर्त जीत (2X Payout)' : 'Winning Payout'}
            </span>
            <span className="text-base sm:text-lg font-black text-emerald-400 font-mono leading-tight">
              ₹{potentialWin.toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>

      {/* 30-Second Hotseat Countdown Timer */}
      <div className="w-full bg-slate-900/80 border border-slate-800 rounded-2xl p-3 shadow-md">
        <div className="flex items-center justify-between text-xs mb-1.5 px-1">
          <div className="flex items-center gap-1.5 font-bold">
            <Clock className={`w-4 h-4 ${timeLeft <= 5 ? 'text-red-400 animate-spin' : 'text-amber-400'}`} />
            <span className={timeLeft <= 5 ? 'text-red-400 animate-pulse' : 'text-slate-300'}>
              {isHi ? 'टिक-टिक घड़ी (समय सीमा)' : 'Hotseat Timer'}
            </span>
          </div>
          <span
            className={`font-mono text-base font-black px-2.5 py-0.5 rounded-lg border ${
              timeLeft <= 5
                ? 'bg-red-500/20 text-red-300 border-red-500/40 animate-pulse'
                : timeLeft <= 10
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-slate-800 text-sky-300 border-sky-500/30'
            }`}
          >
            {timeLeft.toFixed(1)}s
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800 p-0.5">
          <div
            className={`h-full rounded-full transition-all duration-100 ${
              timeLeft <= 5
                ? 'bg-gradient-to-r from-red-600 to-rose-400 shadow-lg shadow-red-500/50'
                : timeLeft <= 10
                ? 'bg-gradient-to-r from-amber-500 to-yellow-300 shadow-lg shadow-amber-500/40'
                : 'bg-gradient-to-r from-sky-500 to-blue-400'
            }`}
            style={{ width: `${timePercent}%` }}
          />
        </div>
      </div>

      {/* Lifelines Toolbar */}
      <div className="w-full flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
        {/* 50:50 */}
        <button
          id="lifeline-fifty-fifty"
          type="button"
          disabled={lifelines.fiftyFiftyUsed || isLocked || revealedResult !== null}
          onClick={handleUseFiftyFifty}
          className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border shadow-md ${
            lifelines.fiftyFiftyUsed
              ? 'bg-slate-900/40 text-slate-600 border-slate-800 opacity-50 cursor-not-allowed line-through'
              : 'bg-slate-900 hover:bg-slate-800 text-amber-300 border-amber-500/40 hover:border-amber-400 hover:scale-105 active:scale-95'
          }`}
          title={isHi ? 'दो गलत विकल्प हटाएँ' : 'Eliminate 2 wrong choices'}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>50:50</span>
        </button>

        {/* Audience Poll */}
        <button
          id="lifeline-audience-poll"
          type="button"
          disabled={lifelines.audiencePollUsed || isLocked || revealedResult !== null}
          onClick={handleUseAudiencePoll}
          className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border shadow-md ${
            lifelines.audiencePollUsed
              ? 'bg-slate-900/40 text-slate-600 border-slate-800 opacity-50 cursor-not-allowed line-through'
              : 'bg-slate-900 hover:bg-slate-800 text-sky-300 border-sky-500/40 hover:border-sky-400 hover:scale-105 active:scale-95'
          }`}
          title={isHi ? 'जनता की राय (Audience Poll)' : 'Audience Poll'}
        >
          <Users className="w-3.5 h-3.5 text-sky-400" />
          <span>{isHi ? 'ऑडियंस पोल' : 'Audience Poll'}</span>
        </button>

        {/* Expert Advice */}
        <button
          id="lifeline-expert-hint"
          type="button"
          disabled={lifelines.expertHintUsed || isLocked || revealedResult !== null}
          onClick={handleUseExpertHint}
          className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border shadow-md ${
            lifelines.expertHintUsed
              ? 'bg-slate-900/40 text-slate-600 border-slate-800 opacity-50 cursor-not-allowed line-through'
              : 'bg-slate-900 hover:bg-slate-800 text-purple-300 border-purple-500/40 hover:border-purple-400 hover:scale-105 active:scale-95'
          }`}
          title={isHi ? 'विशेषज्ञ की राय' : 'Ask the Expert'}
        >
          <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
          <span>{isHi ? 'विशेषज्ञ सलाह' : 'Expert Hint'}</span>
        </button>

        {/* Flip Question */}
        {onFlipQuestion && (
          <button
            id="lifeline-flip-question"
            type="button"
            disabled={lifelines.flipUsed || isLocked || revealedResult !== null}
            onClick={handleUseFlip}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border shadow-md ${
              lifelines.flipUsed
                ? 'bg-slate-900/40 text-slate-600 border-slate-800 opacity-50 cursor-not-allowed line-through'
                : 'bg-slate-900 hover:bg-slate-800 text-emerald-300 border-emerald-500/40 hover:border-emerald-400 hover:scale-105 active:scale-95'
            }`}
            title={isHi ? 'सवाल बदलो' : 'Flip the Question'}
          >
            <Shuffle className="w-3.5 h-3.5 text-emerald-400" />
            <span>{isHi ? 'सवाल बदलो' : 'Flip Question'}</span>
          </button>
        )}
      </div>

      {/* Audience Poll Overlay Bar Display */}
      {showAudiencePoll && (
        <div
          id="audience-poll-card"
          className="w-full bg-slate-900/95 border-2 border-sky-500/50 rounded-2xl p-4 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
        >
          <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2 text-sky-300 text-xs font-bold">
              <Users className="w-4 h-4" />
              <span>{isHi ? 'ऑडियंस पोल परिणाम (जनता की राय):' : 'Audience Poll Results:'}</span>
            </div>
            <button
              onClick={() => setShowAudiencePoll(false)}
              className="text-xs text-slate-400 hover:text-white px-2 py-0.5 rounded bg-slate-800"
            >
              {isHi ? 'बंद करें' : 'Close'}
            </button>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {question.audiencePollPercentages.map((pct, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <span className="text-xs font-mono font-bold text-sky-300 mb-1">{pct}%</span>
                <div className="w-full bg-slate-950 h-24 rounded-lg flex flex-col justify-end p-1 border border-slate-800">
                  <div
                    className="w-full bg-gradient-to-t from-sky-600 to-cyan-300 rounded-md transition-all duration-700"
                    style={{ height: `${pct}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-slate-200 mt-1.5">
                  {optionLetters[idx]}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Expert Advice Overlay Display */}
      {showExpertHint && (
        <div
          id="expert-hint-card"
          className="w-full bg-slate-900/95 border-2 border-purple-500/50 rounded-2xl p-4 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
        >
          <div className="flex items-center justify-between mb-2 border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2 text-purple-300 text-xs font-bold">
              <HelpCircle className="w-4 h-4" />
              <span>{isHi ? 'विशेषज्ञ की राय (Expert Advice):' : 'Expert Advice:'}</span>
            </div>
            <button
              onClick={() => setShowExpertHint(false)}
              className="text-xs text-slate-400 hover:text-white px-2 py-0.5 rounded bg-slate-800"
            >
              {isHi ? 'बंद करें' : 'Close'}
            </button>
          </div>
          <p className="text-sm text-purple-200 leading-relaxed font-medium">
            "{isHi ? question.expertHintHi : question.expertHintEn}"
          </p>
        </div>
      )}

      {/* KBC Question Hotseat Display Box */}
      <div
        id="kbc-question-box"
        className="w-full relative bg-gradient-to-b from-slate-900 via-indigo-950/80 to-slate-900 border-2 border-amber-500/60 rounded-3xl p-6 sm:p-8 text-center shadow-2xl shadow-indigo-950/50 backdrop-blur-xl"
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold mb-3">
          <Award className="w-3.5 h-3.5 text-amber-400" />
          <span>{isHi ? 'कंप्यूटर जी का सवाल' : 'Hotseat Question'}</span>
        </div>

        {/* Hindi Question */}
        <h2 className="text-lg sm:text-2xl font-black text-white leading-snug tracking-tight mb-2">
          {question.questionHi}
        </h2>

        {/* English Question Subtitle */}
        {question.questionEn && question.questionEn !== question.questionHi && (
          <p className="text-xs sm:text-sm text-slate-300 font-medium italic border-t border-slate-800/80 pt-2 max-w-2xl mx-auto">
            {question.questionEn}
          </p>
        )}
      </div>

      {/* 4 Options Grid (A, B, C, D) */}
      <div
        id="kbc-options-grid"
        className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4"
      >
        {[0, 1, 2, 3].map((index) => {
          const isHidden = lifelines.hiddenOptions.includes(index);
          const isSelected = selectedOption === index;
          const isCorrect = question.correctIndex === index;

          let btnStyle = 'bg-slate-900/90 border-slate-700 hover:border-amber-400 hover:bg-slate-800/90 text-white';
          let letterBg = 'bg-slate-800 text-amber-400 border-slate-700';

          if (isHidden) {
            btnStyle = 'opacity-20 pointer-events-none bg-slate-950 border-slate-900 text-slate-600 line-through';
            letterBg = 'bg-slate-950 text-slate-700 border-slate-900';
          } else if (revealedResult !== null) {
            if (isCorrect) {
              // Highlight correct answer in vibrant green
              btnStyle = 'bg-emerald-950/90 border-emerald-400 text-white shadow-lg shadow-emerald-900/60 ring-2 ring-emerald-400 animate-pulse';
              letterBg = 'bg-emerald-500 text-slate-950 border-emerald-400';
            } else if (isSelected && !isCorrect) {
              // Highlight wrong selected answer in pulsing red
              btnStyle = 'bg-red-950/90 border-red-500 text-red-100 shadow-lg shadow-red-900/60 ring-2 ring-red-400';
              letterBg = 'bg-red-500 text-white border-red-400';
            } else {
              btnStyle = 'opacity-40 bg-slate-950 border-slate-800 text-slate-500';
              letterBg = 'bg-slate-900 text-slate-600 border-slate-800';
            }
          } else if (isLocked && isSelected) {
            // Locked suspense state (flashing amber)
            btnStyle = 'bg-amber-950/90 border-amber-400 text-amber-100 shadow-lg shadow-amber-900/50 ring-2 ring-amber-400 animate-pulse';
            letterBg = 'bg-amber-500 text-slate-950 border-amber-400';
          } else if (isSelected) {
            // Selected active state
            btnStyle = 'bg-amber-950/60 border-amber-400 text-amber-100 shadow-lg shadow-amber-900/40 ring-2 ring-amber-400/80';
            letterBg = 'bg-amber-400 text-slate-950 border-amber-300';
          }

          const optTextHi = question.optionsHi[index];
          const optTextEn = question.optionsEn[index];

          return (
            <button
              key={index}
              id={`kbc-option-btn-${index}`}
              type="button"
              disabled={isHidden || isLocked || revealedResult !== null}
              onClick={() => handleSelectOption(index)}
              className={`w-full min-h-[64px] p-3 sm:p-4 rounded-2xl border-2 flex items-center gap-3 text-left transition-all duration-200 ${btnStyle} relative overflow-hidden group`}
            >
              {/* Option Letter Tag (A, B, C, D) */}
              <div
                className={`w-9 h-9 rounded-xl border-2 flex-shrink-0 flex items-center justify-center font-black text-sm transition-all ${letterBg}`}
              >
                {optionLetters[index]}
              </div>

              {/* Option Text in Hindi & English */}
              <div className="flex-1 min-w-0 pr-1">
                <span className="block text-sm sm:text-base font-bold leading-tight truncate-2-lines">
                  {optTextHi}
                </span>
                {optTextEn && optTextEn !== optTextHi && (
                  <span className="block text-[11px] text-slate-400 font-medium leading-none mt-0.5">
                    {optTextEn}
                  </span>
                )}
              </div>

              {/* Status icon badge */}
              {revealedResult !== null && isCorrect && (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 animate-bounce" />
              )}
              {revealedResult !== null && isSelected && !isCorrect && (
                <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Lock In Answer Action Bar ("क्या इसे लॉक किया जाए?") */}
      <div className="w-full flex flex-col items-center justify-center gap-3 pt-2">
        {selectedOption !== null && !isLocked && revealedResult === null && (
          <div className="w-full max-w-md flex flex-col items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <button
              id="btn-lock-kbc-answer"
              type="button"
              onClick={handleLockAnswer}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-base shadow-xl shadow-amber-500/30 hover:shadow-amber-500/50 active:scale-95 transition-all flex items-center justify-center gap-2 border-2 border-yellow-200 cursor-pointer"
            >
              <ShieldCheck className="w-5 h-5 text-slate-950" />
              <span>
                {isHi
                  ? `विकल्प ${optionLetters[selectedOption]} लॉक करें (Lock Answer)`
                  : `Lock Option ${optionLetters[selectedOption]}`}
              </span>
              <ChevronRight className="w-5 h-5 text-slate-950" />
            </button>
            <p className="text-xs text-amber-300/90 font-medium">
              {isHi
                ? 'कंप्यूटर जी, क्या इस विकल्प को लॉक किया जाए?'
                : 'Computer ji, lock this option?'}
            </p>
          </div>
        )}

        {/* Suspense message when answer is locked */}
        {isLocked && revealedResult === null && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold animate-pulse">
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
            <span>
              {isHi
                ? 'कंप्यूटर जी द्वारा उत्तर की जांच की जा रही है...'
                : 'Verifying with Computer Ji...'}
            </span>
          </div>
        )}

        {/* Explanation Card when answer is revealed */}
        {showExplanation && (
          <div
            id="kbc-explanation-card"
            className="w-full bg-slate-900/95 border border-slate-700 rounded-2xl p-4 text-left animate-in fade-in duration-300 shadow-xl"
          >
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-1">
              <Info className="w-4 h-4" />
              <span>{isHi ? 'उत्तर का विवरण (Explanation):' : 'Answer Explanation:'}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
              {isHi ? question.explanationHi : question.explanationEn}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
