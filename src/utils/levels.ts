import { LevelConfig } from '../types';

export const GAME_LEVELS: LevelConfig[] = [
  {
    id: 1,
    titleHi: 'शाही मोर (Royal Peacock)',
    titleEn: 'Royal Peacock',
    categoryHi: 'पक्षी एवं वन्यजीव',
    categoryEn: 'Wildlife & Birds',
    gridSize: 2, // 2x2 = 4 pieces
    hasRotation: false,
    difficultyHi: 'सरल (2x2 ग्रिड - 4 टुकड़े)',
    difficultyEn: 'Easy (2x2 Grid - 4 Pieces)',
    imageUrl: 'https://images.unsplash.com/photo-1579202673506-ca3ce28943ef?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    titleHi: 'रॉयल बंगाल टाइगर (Bengal Tiger)',
    titleEn: 'Royal Bengal Tiger',
    categoryHi: 'वन्यजीव',
    categoryEn: 'Wildlife',
    gridSize: 3, // 3x3 = 9 pieces
    hasRotation: false,
    difficultyHi: 'मध्यम (3x3 ग्रिड - 9 टुकड़े)',
    difficultyEn: 'Medium (3x3 Grid - 9 Pieces)',
    imageUrl: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    titleHi: 'भव्य ताजमहल (Taj Mahal)',
    titleEn: 'Majestic Taj Mahal',
    categoryHi: 'धरोहर एवं वास्तुकला',
    categoryEn: 'Heritage & Architecture',
    gridSize: 3, // 3x3 with rotation
    hasRotation: true,
    difficultyHi: 'कठिन (3x3 + उल्टे टुकड़े ↺)',
    difficultyEn: 'Challenging (3x3 + Rotated Pieces ↺)',
    imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    titleHi: 'स्वर्ण मंदिर (Golden Temple)',
    titleEn: 'Golden Temple, Amritsar',
    categoryHi: 'धरोहर',
    categoryEn: 'Heritage',
    gridSize: 4, // 4x4 = 16 pieces
    hasRotation: false,
    difficultyHi: 'तेज दिमाग (4x4 ग्रिड - 16 टुकड़े)',
    difficultyEn: 'Fast Mind (4x4 Grid - 16 Pieces)',
    imageUrl: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 5,
    titleHi: 'हिमालय हिमशिखर (Himalayan Peaks)',
    titleEn: 'Himalayan Snow Peaks',
    categoryHi: 'प्रकृति एवं पर्वत',
    categoryEn: 'Nature & Mountains',
    gridSize: 4, // 4x4 with rotation
    hasRotation: true,
    difficultyHi: 'अति कठिन (4x4 + उल्टे टुकड़े ↺)',
    difficultyEn: 'Very Hard (4x4 + Rotated Pieces ↺)',
    imageUrl: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 6,
    titleHi: 'कॉस्मिक नेबुला (Cosmic Galaxy)',
    titleEn: 'Cosmic Nebula Galaxy',
    categoryHi: 'अंतरिक्ष व खगोल',
    categoryEn: 'Space & Astronomy',
    gridSize: 5, // 5x5 = 25 pieces
    hasRotation: false,
    difficultyHi: 'मास्टर लेवल (5x5 ग्रिड - 25 टुकड़े)',
    difficultyEn: 'Master Level (5x5 Grid - 25 Pieces)',
    imageUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 7,
    titleHi: 'लाल रंग की फेरारी (Red Supercar)',
    titleEn: 'Red Sports Supercar',
    categoryHi: 'ऑटोमोबाइल',
    categoryEn: 'Automobile',
    gridSize: 5, // 5x5 with rotation
    hasRotation: true,
    difficultyHi: 'अल्टीमेट चैंपियन (5x5 + उल्टे टुकड़े ↺)',
    difficultyEn: 'Ultimate Champion (5x5 + Rotated Pieces ↺)',
    imageUrl: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80',
  }
];

// Fallback high quality patterned SVG in case an external image cannot load
export function createFallbackPatternSvg(title: string, color1: string = '#f59e0b', color2: string = '#b45309'): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${color1}" />
        <stop offset="100%" stop-color="${color2}" />
      </linearGradient>
      <pattern id="pat" width="40" height="40" patternUnits="userSpaceOnUse">
        <circle cx="20" cy="20" r="10" fill="rgba(255,255,255,0.15)" />
        <path d="M 0 0 L 40 40 M 40 0 L 0 40" stroke="rgba(255,255,255,0.1)" stroke-width="2" />
      </pattern>
    </defs>
    <rect width="600" height="600" fill="url(#grad)" />
    <rect width="600" height="600" fill="url(#pat)" />
    <circle cx="300" cy="300" r="160" fill="rgba(255,255,255,0.2)" stroke="#fff" stroke-width="6" />
    <circle cx="300" cy="300" r="100" fill="none" stroke="rgba(255,255,255,0.4)" stroke-dasharray="8 8" stroke-width="4" />
    <text x="300" y="305" font-size="28" font-family="sans-serif" font-weight="bold" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">${title}</text>
    <text x="300" y="345" font-size="18" font-family="sans-serif" fill="rgba(255,255,255,0.9)" text-anchor="middle">30s Puzzle Challenge</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
