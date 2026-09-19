import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { TimerBar } from './components/TimerBar';
import { BetSelector } from './components/BetSelector';
import { KbcGameBoard } from './components/KbcGameBoard';
import { WinModal } from './components/WinModal';
import { GameOverModal } from './components/GameOverModal';
import { RulesGuideModal } from './components/RulesGuideModal';
import { LevelSelector } from './components/LevelSelector';
import { StatsBar } from './components/StatsBar';
import { AuthScreen } from './components/AuthScreen';
import { PhonePeDepositModal } from './components/PhonePeDepositModal';
import { WithdrawModal } from './components/WithdrawModal';
import { GAME_LEVELS, generateUnique100Levels, getReplacementQuestion } from './utils/kbcQuestions';
import {
  Language,
  LevelConfig,
  GameState,
  GameStats,
  UserAccount,
  DepositRecord,
  WithdrawalRecord,
} from './types';
import { sound } from './utils/audio';

const STORAGE_KEY_USERS = 'kbc_100x_registered_users';
const STORAGE_KEY_ACTIVE_USER = 'kbc_100x_active_user';
const STORAGE_KEY_LANG = 'kbc_100x_lang';
const STORAGE_KEY_SOUND = 'kbc_100x_sound';

// Migration keys for backward compatibility
const LEGACY_STORAGE_KEY_USERS = 'chitra_10x_registered_users';
const LEGACY_STORAGE_KEY_ACTIVE_USER = 'chitra_10x_active_user';

export default function App() {
  // Settings & Preferences
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem(STORAGE_KEY_LANG) as Language) || 'hi';
  });

  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_SOUND);
    return saved !== null ? saved === 'true' : true;
  });

  // User Accounts & Authentication State
  const [registeredUsers, setRegisteredUsers] = useState<UserAccount[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_USERS) || localStorage.getItem(LEGACY_STORAGE_KEY_USERS);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.map((u: UserAccount) => {
            const hasValidLevels =
              Array.isArray(u.activeLevels) &&
              u.activeLevels.length === 100 &&
              u.activeLevels.every((l) => Boolean(l && l.question && l.question.categoryHi));
            if (!hasValidLevels) {
              return {
                ...u,
                activeLevels: generateUnique100Levels(u.seenQuestionIds || []),
              };
            }
            return u;
          });
        }
      } catch {
        // fallback
      }
    }
    return [];
  });

  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    const saved =
      localStorage.getItem(STORAGE_KEY_ACTIVE_USER) || localStorage.getItem(LEGACY_STORAGE_KEY_ACTIVE_USER);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          const hasValidLevels =
            Array.isArray(parsed.activeLevels) &&
            parsed.activeLevels.length === 100 &&
            parsed.activeLevels.every((l: LevelConfig) => Boolean(l && l.question && l.question.categoryHi));
          if (!hasValidLevels) {
            parsed.activeLevels = generateUnique100Levels(parsed.seenQuestionIds || []);
          }
          return parsed;
        }
      } catch {
        // fallback
      }
    }
    return null;
  });

  // Wallet & Progression State (Scoped to current user)
  const [walletBalance, setWalletBalance] = useState<number>(() => {
    return currentUser ? currentUser.walletBalance : 50;
  });

  const [highestUnlockedLevel, setHighestUnlockedLevel] = useState<number>(() => {
    return currentUser ? currentUser.highestUnlockedLevel : 0;
  });

  const [currentLevelIndex, setCurrentLevelIndex] = useState<number>(0);

  // Dynamic 100 Progressive Levels (always 100% unique KBC questions across all 100 levels)
  const [levels, setLevels] = useState<LevelConfig[]>(() => {
    if (
      currentUser?.activeLevels &&
      currentUser.activeLevels.length === 100 &&
      currentUser.activeLevels.every((l) => Boolean(l && l.question && l.question.categoryHi))
    ) {
      return currentUser.activeLevels;
    }
    return generateUnique100Levels(currentUser?.seenQuestionIds || []);
  });

  // Active level config with guaranteed fallback
  const activeLevel: LevelConfig =
    levels[currentLevelIndex]?.question
      ? levels[currentLevelIndex]
      : levels[0]?.question
      ? levels[0]
      : GAME_LEVELS[0];

  // Betting & Game Loop
  const [currentBet, setCurrentBet] = useState<number>(20);
  const [gameState, setGameState] = useState<GameState>('BETTING');
  const [gameOverReason, setGameOverReason] = useState<'wrong' | 'timeout'>('timeout');
  const [timeLeft, setTimeLeft] = useState<number>(30.0);
  const [timeTaken, setTimeTaken] = useState<number>(0);

  // Statistics
  const [stats, setStats] = useState<GameStats>(() => {
    if (currentUser && currentUser.stats) {
      return currentUser.stats;
    }
    return {
      gamesPlayed: 0,
      gamesWon: 0,
      totalWon: 0,
      highestPayout: 0,
      bestTime: 0,
    };
  });

  // Modals
  const [showRulesModal, setShowRulesModal] = useState<boolean>(false);
  const [showDepositModal, setShowDepositModal] = useState<boolean>(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState<boolean>(false);

  // Save registered users list
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  // Sync active user state whenever wallet, level, or stats change
  useEffect(() => {
    if (currentUser) {
      const updatedUser: UserAccount = {
        ...currentUser,
        walletBalance,
        highestUnlockedLevel,
        stats,
        activeLevels: levels,
      };
      localStorage.setItem(STORAGE_KEY_ACTIVE_USER, JSON.stringify(updatedUser));

      // Update in registeredUsers list as well
      setRegisteredUsers((prev) =>
        prev.map((u) => (u.mobile === updatedUser.mobile ? updatedUser : u))
      );
    } else {
      localStorage.removeItem(STORAGE_KEY_ACTIVE_USER);
    }
  }, [walletBalance, highestUnlockedLevel, stats, levels]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_LANG, language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_SOUND, soundEnabled.toString());
    sound.enabled = soundEnabled;
  }, [soundEnabled]);

  // Handle new account registration: gets ₹50 Welcome Bonus and fresh 100 levels
  const handleRegisterAccount = (newUser: UserAccount) => {
    const freshLevels = generateUnique100Levels([]);
    const userWithLevels: UserAccount = {
      ...newUser,
      activeLevels: freshLevels,
      seenQuestionIds: [],
    };
    setRegisteredUsers((prev) => {
      const filtered = prev.filter((u) => u.mobile !== userWithLevels.mobile);
      return [...filtered, userWithLevels];
    });
  };

  // Handle successful login: automatically generate fresh 100 unique levels without repeating questions
  const handleLoginSuccess = (user: UserAccount) => {
    const freshLevels = generateUnique100Levels(user.seenQuestionIds || []);
    setLevels(freshLevels);

    const updatedUser: UserAccount = {
      ...user,
      activeLevels: freshLevels,
    };
    setCurrentUser(updatedUser);
    setWalletBalance(user.walletBalance);
    setHighestUnlockedLevel(user.highestUnlockedLevel);
    setStats(
      user.stats || {
        gamesPlayed: 0,
        gamesWon: 0,
        totalWon: 0,
        highestPayout: 0,
        bestTime: 0,
      }
    );
    setGameState('BETTING');
    setTimeLeft(30.0);
    setCurrentLevelIndex(Math.min(user.highestUnlockedLevel, freshLevels.length - 1));
  };

  // Refresh fresh set of 100 unique levels manually
  const handleRefreshUniqueLevels = () => {
    const freshLevels = generateUnique100Levels(currentUser?.seenQuestionIds || []);
    setLevels(freshLevels);
    if (currentUser) {
      setCurrentUser((prev) => (prev ? { ...prev, activeLevels: freshLevels } : null));
    }
    sound.playClick();
  };

  // Handle logout
  const handleLogout = () => {
    if (gameState === 'PLAYING') {
      sound.playLoss();
    }
    setCurrentUser(null);
    localStorage.removeItem(STORAGE_KEY_ACTIVE_USER);
    setGameState('BETTING');
  };

  // Timer reference & loop
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (gameState === 'PLAYING') {
      const startTime = performance.now();
      const initialTime = 30.0;
      let lastTickSec = 30;

      timerRef.current = window.setInterval(() => {
        const now = performance.now();
        const elapsedSec = (now - startTime) / 1000;
        const remaining = Math.max(0, initialTime - elapsedSec);

        setTimeLeft(remaining);

        // Sound ticks in last 10 seconds
        const currentSec = Math.floor(remaining);
        if (currentSec !== lastTickSec && currentSec <= 10 && currentSec > 0) {
          lastTickSec = currentSec;
          sound.playTick(currentSec <= 5);
        }

        if (remaining <= 0) {
          if (timerRef.current) clearInterval(timerRef.current);
          setTimeLeft(0);
          handleTimeExpired();
        }
      }, 50);

      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, [gameState]);

  // Start the KBC 30s challenge
  const handleStartGame = () => {
    if (walletBalance < currentBet) return;

    sound.playClick();
    // Deduct bet from balance
    setWalletBalance((prev) => prev - currentBet);

    setTimeLeft(30.0);
    setGameState('PLAYING');
  };

  // Handle Answer Submission from KbcGameBoard
  const handleAnswerSubmit = (selectedIndex: number, isCorrect: boolean) => {
    if (timerRef.current) clearInterval(timerRef.current);

    const questionId = activeLevel.question.id;

    // Track seen question so it's never repeated for this user
    if (currentUser) {
      setCurrentUser((prev) => {
        if (!prev) return null;
        const seen = prev.seenQuestionIds || [];
        if (!seen.includes(questionId)) {
          return { ...prev, seenQuestionIds: [...seen, questionId] };
        }
        return prev;
      });
    }

    if (isCorrect) {
      const elapsed = Math.max(0.5, 30.0 - timeLeft);
      setTimeTaken(elapsed);
      const payout = currentBet * 2;

      setWalletBalance((prev) => prev + payout);
      setGameState('WON');

      // Unlock next level
      if (currentLevelIndex >= highestUnlockedLevel && currentLevelIndex < levels.length - 1) {
        setHighestUnlockedLevel(currentLevelIndex + 1);
      }

      // Update stats
      setStats((prev) => ({
        gamesPlayed: prev.gamesPlayed + 1,
        gamesWon: prev.gamesWon + 1,
        totalWon: prev.totalWon + payout,
        highestPayout: Math.max(prev.highestPayout, payout),
        bestTime: prev.bestTime === 0 ? elapsed : Math.min(prev.bestTime, elapsed),
      }));
    } else {
      setGameOverReason('wrong');
      setGameState('LOST');
      setStats((prev) => ({
        ...prev,
        gamesPlayed: prev.gamesPlayed + 1,
      }));
    }
  };

  // Handle 30s timeout
  const handleTimeExpired = () => {
    const questionId = activeLevel.question.id;
    if (currentUser) {
      setCurrentUser((prev) => {
        if (!prev) return null;
        const seen = prev.seenQuestionIds || [];
        if (!seen.includes(questionId)) {
          return { ...prev, seenQuestionIds: [...seen, questionId] };
        }
        return prev;
      });
    }

    setGameOverReason('timeout');
    setGameState('LOST');
    setStats((prev) => ({
      ...prev,
      gamesPlayed: prev.gamesPlayed + 1,
    }));
  };

  // Handle Flip Question lifeline
  const handleFlipQuestion = () => {
    const currentQ = activeLevel.question;
    const tier = currentQ.difficultyTier;
    const excludeIds = [currentQ.id, ...(currentUser?.seenQuestionIds || [])];
    const replacement = getReplacementQuestion(tier, excludeIds);

    // Update level question
    setLevels((prev) =>
      prev.map((lvl, idx) => (idx === currentLevelIndex ? { ...lvl, question: replacement } : lvl))
    );
  };

  // Advance to next level
  const handleNextLevel = () => {
    if (currentLevelIndex < levels.length - 1) {
      setCurrentLevelIndex((prev) => prev + 1);
    }
    setGameState('BETTING');
  };

  // Replay current level
  const handleReplay = () => {
    setGameState('BETTING');
  };

  // Claim free coins bonus
  const handleClaimBonus = () => {
    sound.playWin10X();
    setWalletBalance((prev) => prev + 200);
  };

  // Handle PhonePe deposit completion
  const handleDepositSuccess = (
    amount: number,
    utr: string,
    screenshotUrl?: string,
    screenshotName?: string
  ) => {
    sound.playWin10X();
    setWalletBalance((prev) => {
      const newBal = prev + amount;
      if (currentUser) {
        const newDeposit: DepositRecord = {
          id: `DEP-${Date.now()}`,
          amount,
          utr,
          phonePeNumber: '9981228006',
          upiId: '9981228006-2@axl',
          screenshotUrl,
          screenshotName,
          timestamp: Date.now(),
          status: 'VERIFIED',
        };
        const updatedDeposits = [...(currentUser.deposits || []), newDeposit];
        const updatedUser: UserAccount = {
          ...currentUser,
          walletBalance: newBal,
          deposits: updatedDeposits,
        };
        setCurrentUser(updatedUser);
        localStorage.setItem(STORAGE_KEY_ACTIVE_USER, JSON.stringify(updatedUser));
        setRegisteredUsers((prevUsers) =>
          prevUsers.map((u) => (u.mobile === updatedUser.mobile ? updatedUser : u))
        );
      }
      return newBal;
    });
  };

  // Handle PhonePe / GPay / UPI Withdrawal completion
  const handleWithdrawSuccess = (record: WithdrawalRecord) => {
    setWalletBalance((prev) => {
      const newBal = Math.max(0, prev - record.amount);
      if (currentUser) {
        const updatedWithdrawals = [...(currentUser.withdrawals || []), record];
        const updatedUser: UserAccount = {
          ...currentUser,
          walletBalance: newBal,
          withdrawals: updatedWithdrawals,
        };
        setCurrentUser(updatedUser);
        localStorage.setItem(STORAGE_KEY_ACTIVE_USER, JSON.stringify(updatedUser));
        setRegisteredUsers((prevUsers) =>
          prevUsers.map((u) => (u.mobile === updatedUser.mobile ? updatedUser : u))
        );
      }
      return newBal;
    });
  };

  // Reset progress
  const handleResetProgress = () => {
    if (confirm(language === 'hi' ? 'क्या आप लेवल और आंकड़े रीसेट करना चाहते हैं?' : 'Reset game progress?')) {
      const freshLevels = generateUnique100Levels([]);
      setLevels(freshLevels);
      setHighestUnlockedLevel(0);
      setCurrentLevelIndex(0);
      setWalletBalance(50);
      setGameState('BETTING');
      if (currentUser) {
        setCurrentUser((prev) => (prev ? { ...prev, activeLevels: freshLevels, seenQuestionIds: [] } : null));
      }
    }
  };

  const isHi = language === 'hi';

  // If user is not logged in / registered yet, show the AuthScreen portal
  if (!currentUser) {
    return (
      <AuthScreen
        onLoginSuccess={handleLoginSuccess}
        registeredUsers={registeredUsers}
        onRegisterAccount={handleRegisterAccount}
        language={language}
        onLanguageToggle={() => setLanguage((l) => (l === 'hi' ? 'en' : 'hi'))}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950 font-sans antialiased">
      {/* Navbar */}
      <Navbar
        currentUser={currentUser}
        onLogout={handleLogout}
        walletBalance={walletBalance}
        currentLevelIndex={currentLevelIndex}
        totalLevels={levels.length}
        language={language}
        onLanguageToggle={() => setLanguage((l) => (l === 'hi' ? 'en' : 'hi'))}
        soundEnabled={soundEnabled}
        onSoundToggle={() => setSoundEnabled((s) => !s)}
        onOpenHelp={() => setShowRulesModal(true)}
        onOpenDeposit={() => setShowDepositModal(true)}
        onOpenWithdraw={() => setShowWithdrawModal(true)}
        onClaimBonus={handleClaimBonus}
        onResetProgress={handleResetProgress}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 flex flex-col gap-5">
        {/* Game State Flow */}
        {gameState === 'BETTING' ? (
          <div className="flex flex-col gap-5 animate-in fade-in duration-300">
            {/* Bet Selector */}
            <BetSelector
              currentBet={currentBet}
              onBetChange={setCurrentBet}
              walletBalance={walletBalance}
              level={activeLevel}
              onStartGame={handleStartGame}
              onOpenDeposit={() => setShowDepositModal(true)}
              language={language}
            />

            {/* Level Selector Carousel */}
            <LevelSelector
              levels={levels}
              currentLevelIndex={currentLevelIndex}
              highestUnlockedLevel={highestUnlockedLevel}
              onSelectLevel={(idx) => {
                setCurrentLevelIndex(idx);
              }}
              onRefreshUniqueLevels={handleRefreshUniqueLevels}
              language={language}
            />

            {/* Stats Bar */}
            <StatsBar stats={stats} language={language} />
          </div>
        ) : (
          <div className="flex flex-col gap-4 animate-in fade-in duration-300">
            {/* Active 30-second Timer Bar */}
            <TimerBar timeLeft={timeLeft} totalTime={30.0} language={language} />

            {/* Level & Stake Information Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm">
                  {isHi
                    ? activeLevel.question?.categoryHi || 'सामान्य ज्ञान'
                    : activeLevel.question?.categoryEn || 'General Knowledge'}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-slate-800 text-amber-400 font-mono font-semibold">
                  {activeLevel.prizeTag || '₹1,000'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span>
                  {isHi ? 'शर्त:' : 'Bet:'} <strong className="text-white font-mono">₹{currentBet}</strong>
                </span>
                <span className="text-amber-400 font-bold bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                  {isHi ? '2X जीत: ' : '2X Payout: '}₹{currentBet * 2}
                </span>
              </div>
            </div>

            {/* Interactive KBC Quiz Game Board with 4 Options and Lifelines */}
            <KbcGameBoard
              level={activeLevel}
              timeLeft={timeLeft}
              totalTime={30.0}
              currentBet={currentBet}
              onAnswerSubmit={handleAnswerSubmit}
              onTimeExpired={handleTimeExpired}
              language={language}
              onFlipQuestion={handleFlipQuestion}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-900 bg-slate-950/80 py-4 px-4 text-center text-xs text-slate-500">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            {isHi
              ? 'कौन बनेगा करोड़पति 100X - 100 क्रमिक लेवल, 4 विकल्प, 30 सेकंड टाइमर व PhonePe/GPay निकासी'
              : 'KBC 100X Quiz - 100 Progressive Levels, 4 Options, 30s Timer & PhonePe/GPay Withdrawals'}
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowRulesModal(true)}
              className="text-amber-400/80 hover:text-amber-300 underline cursor-pointer"
            >
              {isHi ? 'गेम के नियम' : 'Rules'}
            </button>
            <span>•</span>
            <button
              onClick={() => setShowWithdrawModal(true)}
              className="text-emerald-400 hover:text-emerald-300 underline cursor-pointer"
            >
              {isHi ? 'पैसे निकालें (PhonePe/GPay)' : 'Withdraw Cash'}
            </button>
            <span>•</span>
            <button
              onClick={handleResetProgress}
              className="text-slate-500 hover:text-slate-400 cursor-pointer"
            >
              {isHi ? 'प्रोग्रेस रीसेट' : 'Reset Data'}
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {gameState === 'WON' && (
        <WinModal
          bet={currentBet}
          timeTaken={timeTaken}
          level={activeLevel}
          hasNextLevel={currentLevelIndex < levels.length - 1}
          onNextLevel={handleNextLevel}
          onReplay={handleReplay}
          onOpenWithdraw={() => setShowWithdrawModal(true)}
          language={language}
        />
      )}

      {gameState === 'LOST' && (
        <GameOverModal
          bet={currentBet}
          walletBalance={walletBalance}
          level={activeLevel}
          reason={gameOverReason}
          onRetry={handleStartGame}
          onBackToBetting={() => setGameState('BETTING')}
          onOpenDeposit={() => setShowDepositModal(true)}
          onClaimBonus={handleClaimBonus}
          language={language}
        />
      )}

      {showRulesModal && (
        <RulesGuideModal
          onClose={() => setShowRulesModal(false)}
          language={language}
        />
      )}

      {/* PhonePe Deposit System Modal */}
      <PhonePeDepositModal
        isOpen={showDepositModal}
        onClose={() => setShowDepositModal(false)}
        currentUser={currentUser}
        onDepositSuccess={handleDepositSuccess}
        language={language}
      />

      {/* PhonePe / GPay / UPI Withdrawal Modal */}
      <WithdrawModal
        isOpen={showWithdrawModal}
        onClose={() => setShowWithdrawModal(false)}
        currentUser={currentUser}
        walletBalance={walletBalance}
        onWithdrawSuccess={handleWithdrawSuccess}
        language={language}
      />
    </div>
  );
}
