export type Language = 'hi' | 'en';

export type KbcDifficultyTier = 'basic' | 'intermediate' | 'advanced' | 'expert' | 'grandmaster';

export interface KbcQuestion {
  id: string; // Unique question identifier
  questionHi: string;
  questionEn: string;
  optionsHi: [string, string, string, string]; // [Option A, Option B, Option C, Option D]
  optionsEn: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3; // 0=A, 1=B, 2=C, 3=D
  explanationHi: string;
  explanationEn: string;
  categoryHi: string;
  categoryEn: string;
  difficultyTier: KbcDifficultyTier;
  kbcPrizeTag: string; // e.g. "₹5,000", "₹1,60,000", "₹25,00,000", "₹1 करोड़", "₹7 करोड़"
  audiencePollPercentages: [number, number, number, number]; // Percentages for [A, B, C, D]
  expertHintHi: string;
  expertHintEn: string;
}

export interface LevelConfig {
  id: number; // Level 1 to 100
  question: KbcQuestion;
  difficultyHi: string;
  difficultyEn: string;
  prizeTag: string;
}

export type GameState = 'BETTING' | 'PLAYING' | 'LOCKED' | 'WON' | 'LOST';

export interface LifelineState {
  fiftyFiftyUsed: boolean;
  audiencePollUsed: boolean;
  expertHintUsed: boolean;
  flipUsed: boolean;
  hiddenOptions: number[]; // Indices of options hidden by 50:50 (e.g. [1, 3])
}

export interface DepositRecord {
  id: string;
  amount: number;
  utr: string;
  phonePeNumber: string;
  upiId?: string;
  screenshotUrl?: string;
  screenshotName?: string;
  timestamp: number;
  status: 'PENDING_VERIFICATION' | 'VERIFIED' | 'SUCCESS';
}

export type PayoutMethod = 'phonepe' | 'gpay' | 'upi';

export interface WithdrawalRecord {
  id: string;
  amount: number;
  method: PayoutMethod;
  accountTarget: string; // Mobile number (10 digits) or UPI ID
  utr: string;
  timestamp: number;
  status: 'SUCCESS' | 'PROCESSING';
}

export interface UserAccount {
  name: string;
  mobile: string; // Used as ID
  pin: string; // 4-digit number
  registeredAt: number;
  walletBalance: number;
  highestUnlockedLevel: number;
  stats: GameStats;
  deposits?: DepositRecord[];
  withdrawals?: WithdrawalRecord[];
  seenQuestionIds?: string[]; // Array of unique question IDs seen/completed
  activeLevels?: LevelConfig[]; // Personalized 100 levels generated for this user
}

export interface GameStats {
  gamesPlayed: number;
  gamesWon: number;
  totalWon: number;
  highestPayout: number;
  bestTime: number; // in seconds
}
