export type Language = 'hi' | 'en';

export interface LevelConfig {
  id: number;
  titleHi: string;
  titleEn: string;
  categoryHi: string;
  categoryEn: string;
  gridSize: number; // e.g. 2 for 2x2 (4 pieces), 3 for 3x3 (9 pieces), 4 for 4x4 (16 pieces)
  hasRotation: boolean; // if true, pieces can be scrambled in rotation (0, 90, 180, 270 deg)
  imageUrl: string;
  difficultyHi: string;
  difficultyEn: string;
}

export interface PuzzlePiece {
  id: number; // original index (0 to gridSize*gridSize - 1)
  currentPos: number; // current slot index
  rotation: number; // 0, 90, 180, 270 degrees
  correctPos: number; // target slot index
  row: number; // original row
  col: number; // original col
}

export type GameState = 'BETTING' | 'PLAYING' | 'WON' | 'LOST' | 'PAUSED';

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

export interface UserAccount {
  name: string;
  mobile: string; // Used as ID
  pin: string; // 4-digit number
  registeredAt: number;
  walletBalance: number;
  highestUnlockedLevel: number;
  stats: GameStats;
  deposits?: DepositRecord[];
}

export interface GameStats {
  gamesPlayed: number;
  gamesWon: number;
  totalWon: number;
  highestPayout: number;
  bestTime: number; // in seconds
}
