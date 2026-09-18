import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { TimerBar } from './components/TimerBar';
import { BetSelector } from './components/BetSelector';
import { GameBoard } from './components/GameBoard';
import { WinModal } from './components/WinModal';
import { GameOverModal } from './components/GameOverModal';
import { ImagePreviewModal } from './components/ImagePreviewModal';
import { RulesGuideModal } from './components/RulesGuideModal';
import { LevelSelector } from './components/LevelSelector';
import { StatsBar } from './components/StatsBar';
import { AuthScreen } from './components/AuthScreen';
import { PhonePeDepositModal } from './components/PhonePeDepositModal';
import { GAME_LEVELS } from './utils/levels';
import { Language, LevelConfig, PuzzlePiece, GameState, GameStats, UserAccount, DepositRecord } from './types';
import { sound } from './utils/audio';

const STORAGE_KEY_USERS = 'chitra_10x_registered_users';
const STORAGE_KEY_ACTIVE_USER = 'chitra_10x_active_user';
const STORAGE_KEY_LANG = 'chitra_10x_lang';
const STORAGE_KEY_SOUND = 'chitra_10x_sound';

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
    const saved = localStorage.getItem(STORAGE_KEY_USERS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return [];
  });

  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_ACTIVE_USER);
    if (saved) {
      try {
        return JSON.parse(saved);
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
  const [customLevel, setCustomLevel] = useState<LevelConfig | null>(null);

  // Betting & Game Loop
  const [currentBet, setCurrentBet] = useState<number>(20);
  const [gameState, setGameState] = useState<GameState>('BETTING');
  const [timeLeft, setTimeLeft] = useState<number>(30.0);
  const [timeTaken, setTimeTaken] = useState<number>(0);
  const [movesCount, setMovesCount] = useState<number>(0);
  const [pieces, setPieces] = useState<PuzzlePiece[]>([]);

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
  const [showPeekModal, setShowPeekModal] = useState<boolean>(false);
  const [showRulesModal, setShowRulesModal] = useState<boolean>(false);
  const [showDepositModal, setShowDepositModal] = useState<boolean>(false);

  // Active level config
  const activeLevel: LevelConfig = customLevel || GAME_LEVELS[currentLevelIndex] || GAME_LEVELS[0];

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
      };
      localStorage.setItem(STORAGE_KEY_ACTIVE_USER, JSON.stringify(updatedUser));

      // Update in registeredUsers list as well
      setRegisteredUsers((prev) =>
        prev.map((u) => (u.mobile === updatedUser.mobile ? updatedUser : u))
      );
    } else {
      localStorage.removeItem(STORAGE_KEY_ACTIVE_USER);
    }
  }, [walletBalance, highestUnlockedLevel, stats]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_LANG, language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_SOUND, soundEnabled.toString());
    sound.enabled = soundEnabled;
  }, [soundEnabled]);

  // Handle new account registration
  const handleRegisterAccount = (newUser: UserAccount) => {
    setRegisteredUsers((prev) => {
      const filtered = prev.filter((u) => u.mobile !== newUser.mobile);
      return [...filtered, newUser];
    });
  };

  // Handle successful login
  const handleLoginSuccess = (user: UserAccount) => {
    setCurrentUser(user);
    setWalletBalance(user.walletBalance);
    setHighestUnlockedLevel(user.highestUnlockedLevel);
    setStats(user.stats || {
      gamesPlayed: 0,
      gamesWon: 0,
      totalWon: 0,
      highestPayout: 0,
      bestTime: 0,
    });
    setGameState('BETTING');
    setTimeLeft(30.0);
    setCurrentLevelIndex(Math.min(user.highestUnlockedLevel, GAME_LEVELS.length - 1));
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

  // Generate scrambled puzzle pieces
  const generatePieces = useCallback((level: LevelConfig): PuzzlePiece[] => {
    const total = level.gridSize * level.gridSize;
    const initial: PuzzlePiece[] = [];

    for (let i = 0; i < total; i++) {
      initial.push({
        id: i,
        currentPos: i,
        correctPos: i,
        rotation: 0,
        row: Math.floor(i / level.gridSize),
        col: i % level.gridSize,
      });
    }

    // Shuffle slot positions
    const positions = Array.from({ length: total }, (_, idx) => idx);
    let isSame = true;

    // Ensure at least 80% pieces are misplaced
    while (isSame) {
      for (let i = positions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [positions[i], positions[j]] = [positions[j], positions[i]];
      }
      let matches = 0;
      for (let i = 0; i < total; i++) {
        if (positions[i] === i) matches++;
      }
      if (matches <= Math.floor(total * 0.25)) {
        isSame = false;
      }
    }

    // Assign positions and random rotations if level has rotation
    const rotationOptions = [0, 90, 180, 270];

    return initial.map((p, idx) => {
      let rot = 0;
      if (level.hasRotation) {
        rot = rotationOptions[Math.floor(Math.random() * rotationOptions.length)];
      }
      return {
        ...p,
        currentPos: positions[idx],
        rotation: rot,
      };
    });
  }, []);

  // Check victory condition
  const checkWin = useCallback(
    (currentPieces: PuzzlePiece[], level: LevelConfig) => {
      const allCorrect = currentPieces.every(
        (p) => p.currentPos === p.id && (!level.hasRotation || p.rotation % 360 === 0)
      );

      if (allCorrect) {
        const elapsed = Math.max(0.5, 30.0 - timeLeft);
        setTimeTaken(elapsed);
        const payout = currentBet * 2;

        setWalletBalance((prev) => prev + payout);
        setGameState('WON');

        // Unlock next level
        if (currentLevelIndex >= highestUnlockedLevel && currentLevelIndex < GAME_LEVELS.length - 1) {
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
      }
    },
    [currentBet, timeLeft, currentLevelIndex, highestUnlockedLevel]
  );

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

        // Sound ticks
        const currentSec = Math.floor(remaining);
        if (currentSec !== lastTickSec && currentSec <= 10 && currentSec > 0) {
          lastTickSec = currentSec;
          sound.playTick(currentSec <= 5);
        }

        if (remaining <= 0) {
          if (timerRef.current) clearInterval(timerRef.current);
          setTimeLeft(0);
          setGameState('LOST');
          setStats((prev) => ({
            ...prev,
            gamesPlayed: prev.gamesPlayed + 1,
          }));
        }
      }, 50);

      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, [gameState]);

  // Start the 30s challenge
  const handleStartGame = () => {
    if (walletBalance < currentBet) return;

    sound.playClick();
    // Deduct bet from balance
    setWalletBalance((prev) => prev - currentBet);

    const newPieces = generatePieces(activeLevel);
    setPieces(newPieces);
    setTimeLeft(30.0);
    setMovesCount(0);
    setGameState('PLAYING');
  };

  // Swap pieces between two grid slot indices
  const handleSwapPieces = (slotIndexA: number, slotIndexB: number) => {
    if (gameState !== 'PLAYING') return;

    setPieces((prev) => {
      const pieceA = prev.find((p) => p.currentPos === slotIndexA);
      const pieceB = prev.find((p) => p.currentPos === slotIndexB);

      if (!pieceA || !pieceB) return prev;

      sound.playSwap();
      setMovesCount((m) => m + 1);

      const updated = prev.map((p) => {
        if (p.id === pieceA.id) {
          return { ...p, currentPos: slotIndexB };
        }
        if (p.id === pieceB.id) {
          return { ...p, currentPos: slotIndexA };
        }
        return p;
      });

      // If either piece is placed correctly, chime!
      const aIsCorrect = pieceA.id === slotIndexB && (!activeLevel.hasRotation || pieceA.rotation % 360 === 0);
      const bIsCorrect = pieceB.id === slotIndexA && (!activeLevel.hasRotation || pieceB.rotation % 360 === 0);
      if (aIsCorrect || bIsCorrect) {
        sound.playCorrectTile();
      }

      // Check win condition
      checkWin(updated, activeLevel);
      return updated;
    });
  };

  // Rotate piece by 90 degrees
  const handleRotatePiece = (pieceId: number) => {
    if (gameState !== 'PLAYING') return;

    sound.playRotate();
    setPieces((prev) => {
      const updated = prev.map((p) => {
        if (p.id === pieceId) {
          return { ...p, rotation: (p.rotation + 90) % 360 };
        }
        return p;
      });

      const rotatedPiece = updated.find((p) => p.id === pieceId);
      if (rotatedPiece && rotatedPiece.currentPos === rotatedPiece.id && rotatedPiece.rotation === 0) {
        sound.playCorrectTile();
      }

      checkWin(updated, activeLevel);
      return updated;
    });
  };

  // Advance to next level
  const handleNextLevel = () => {
    if (currentLevelIndex < GAME_LEVELS.length - 1) {
      setCurrentLevelIndex((prev) => prev + 1);
      setCustomLevel(null);
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

  // Reset progress
  const handleResetProgress = () => {
    if (confirm(language === 'hi' ? 'क्या आप लेवल और आंकड़े रीसेट करना चाहते हैं?' : 'Reset game progress?')) {
      setHighestUnlockedLevel(0);
      setCurrentLevelIndex(0);
      setWalletBalance(500);
      setCustomLevel(null);
      setGameState('BETTING');
    }
  };

  // Upload custom picture
  const handleCustomImageUpload = (dataUrl: string) => {
    const customConfig: LevelConfig = {
      id: 999,
      titleHi: 'मेरी कस्टम तस्वीर',
      titleEn: 'My Custom Picture',
      categoryHi: 'अपलोड की गई फोटो',
      categoryEn: 'Uploaded Photo',
      gridSize: 3,
      hasRotation: true,
      difficultyHi: '3x3 + उल्टे टुकड़े ↺',
      difficultyEn: '3x3 + Rotations ↺',
      imageUrl: dataUrl,
    };
    setCustomLevel(customConfig);
    setGameState('BETTING');
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
        totalLevels={GAME_LEVELS.length}
        language={language}
        onLanguageToggle={() => setLanguage((l) => (l === 'hi' ? 'en' : 'hi'))}
        soundEnabled={soundEnabled}
        onSoundToggle={() => setSoundEnabled((s) => !s)}
        onOpenHelp={() => setShowRulesModal(true)}
        onOpenDeposit={() => setShowDepositModal(true)}
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
              levels={GAME_LEVELS}
              currentLevelIndex={customLevel ? -1 : currentLevelIndex}
              highestUnlockedLevel={highestUnlockedLevel}
              onSelectLevel={(idx) => {
                setCurrentLevelIndex(idx);
                setCustomLevel(null);
              }}
              onCustomImageUpload={handleCustomImageUpload}
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
                  {isHi ? activeLevel.titleHi : activeLevel.titleEn}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-slate-800 text-amber-400 font-mono font-semibold">
                  {activeLevel.gridSize}x{activeLevel.gridSize} ({activeLevel.gridSize * activeLevel.gridSize} {isHi ? 'टुकड़े' : 'pcs'})
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span>{isHi ? 'शर्त:' : 'Bet:'} <strong className="text-white font-mono">₹{currentBet}</strong></span>
                <span className="text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/30">
                  {isHi ? '10X जीत: ' : '10X Payout: '}₹{currentBet * 10}
                </span>
              </div>
            </div>

            {/* Interactive Puzzle Grid */}
            <GameBoard
              pieces={pieces}
              gridSize={activeLevel.gridSize}
              level={activeLevel}
              onSwapPieces={handleSwapPieces}
              onRotatePiece={handleRotatePiece}
              onPeekOriginal={() => setShowPeekModal(true)}
              language={language}
              movesCount={movesCount}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-900 bg-slate-950/80 py-4 px-4 text-center text-xs text-slate-500">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            {isHi
              ? 'चित्र पहेली 10X - 30 सेकंड में चित्र सही करने पर शर्त का सीधा 2 गुना जीतें'
              : 'Chitra Paheli 10X - Solve picture puzzles in 30 seconds & win 2X!'}
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
          hasNextLevel={currentLevelIndex < GAME_LEVELS.length - 1}
          onNextLevel={handleNextLevel}
          onReplay={handleReplay}
          language={language}
        />
      )}

      {gameState === 'LOST' && (
        <GameOverModal
          bet={currentBet}
          walletBalance={walletBalance}
          level={activeLevel}
          onRetry={handleStartGame}
          onBackToBetting={() => setGameState('BETTING')}
          onOpenDeposit={() => setShowDepositModal(true)}
          onClaimBonus={handleClaimBonus}
          language={language}
        />
      )}

      {showPeekModal && (
        <ImagePreviewModal
          level={activeLevel}
          onClose={() => setShowPeekModal(false)}
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
    </div>
  );
}
