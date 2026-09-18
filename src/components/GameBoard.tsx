import React, { useState } from 'react';
import { Check, Eye, RotateCw, Sparkles, Lightbulb } from 'lucide-react';
import { PuzzlePiece, LevelConfig, Language } from '../types';
import { sound } from '../utils/audio';

interface GameBoardProps {
  pieces: PuzzlePiece[];
  gridSize: number;
  level: LevelConfig;
  onSwapPieces: (indexA: number, indexB: number) => void;
  onRotatePiece: (pieceId: number) => void;
  onPeekOriginal: () => void;
  language: Language;
  movesCount: number;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  pieces,
  gridSize,
  level,
  onSwapPieces,
  onRotatePiece,
  onPeekOriginal,
  language,
  movesCount,
}) => {
  const isHi = language === 'hi';
  const [selectedPieceIndex, setSelectedPieceIndex] = useState<number | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [hintedPieceId, setHintedPieceId] = useState<number | null>(null);

  // Pieces sorted by their current slot position 0 to (gridSize*gridSize - 1)
  const slotPieces = Array.from({ length: gridSize * gridSize }).map((_, slotIndex) => {
    return pieces.find((p) => p.currentPos === slotIndex)!;
  });

  const correctCount = pieces.filter(
    (p) => p.currentPos === p.id && (!level.hasRotation || p.rotation % 360 === 0)
  ).length;
  const totalPieces = gridSize * gridSize;

  const handleTileClick = (slotIndex: number) => {
    sound.playClick();

    if (selectedPieceIndex === null) {
      setSelectedPieceIndex(slotIndex);
    } else if (selectedPieceIndex === slotIndex) {
      // If clicked again, deselect or rotate if rotation level
      if (level.hasRotation) {
        const piece = slotPieces[slotIndex];
        if (piece) {
          onRotatePiece(piece.id);
        }
      } else {
        setSelectedPieceIndex(null);
      }
    } else {
      // Swap selectedPieceIndex with slotIndex
      onSwapPieces(selectedPieceIndex, slotIndex);
      setSelectedPieceIndex(null);
    }
  };

  const handleRotate = (e: React.MouseEvent, pieceId: number) => {
    e.stopPropagation();
    onRotatePiece(pieceId);
  };

  const handleGiveHint = () => {
    // Find the first misplaced or misrotated piece
    const misplaced = pieces.find(
      (p) => p.currentPos !== p.id || (level.hasRotation && p.rotation % 360 !== 0)
    );
    if (misplaced) {
      sound.playClick();
      setHintedPieceId(misplaced.id);
      setTimeout(() => setHintedPieceId(null), 2000);
    }
  };

  // Drag and drop handlers
  const handleDragStart = (slotIndex: number) => {
    setDraggedIndex(slotIndex);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (targetSlotIndex: number) => {
    if (draggedIndex !== null && draggedIndex !== targetSlotIndex) {
      onSwapPieces(draggedIndex, targetSlotIndex);
      setSelectedPieceIndex(null);
    }
    setDraggedIndex(null);
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Sub-header status and action buttons */}
      <div className="w-full max-w-xl flex items-center justify-between gap-2 px-1 mb-3 text-xs sm:text-sm">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-300 font-semibold">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>
              {isHi ? 'सही स्थिति:' : 'Solved:'}{' '}
              <strong className="text-emerald-400 font-mono">
                {correctCount} / {totalPieces}
              </strong>
            </span>
          </div>
          <span className="hidden sm:inline text-slate-500 text-xs">
            {movesCount} {isHi ? 'चालें' : 'moves'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Peek Original Image */}
          <button
            id="btn-peek-image"
            type="button"
            onClick={onPeekOriginal}
            className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-amber-300 font-semibold transition-colors"
            title={isHi ? 'मूल तस्वीर देखें' : 'Peek Original Image'}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{isHi ? 'असली तस्वीर' : 'Peek'}</span>
          </button>

          {/* Hint button */}
          <button
            id="btn-hint"
            type="button"
            onClick={handleGiveHint}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-sky-400 font-semibold transition-colors"
            title={isHi ? 'संकेत लें' : 'Get Hint'}
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isHi ? 'संकेत' : 'Hint'}</span>
          </button>
        </div>
      </div>

      {/* Main Puzzle Grid Canvas */}
      <div className="relative p-2.5 sm:p-3.5 rounded-3xl bg-slate-900 border-2 border-slate-800 shadow-2xl max-w-xl w-full aspect-square flex items-center justify-center select-none overflow-hidden">
        <div
          className="grid gap-1 sm:gap-1.5 w-full h-full"
          style={{
            gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${gridSize}, minmax(0, 1fr))`,
          }}
        >
          {slotPieces.map((piece, slotIndex) => {
            if (!piece) return null;

            const isSelected = selectedPieceIndex === slotIndex;
            const isCorrect =
              piece.currentPos === piece.id && (!level.hasRotation || piece.rotation % 360 === 0);
            const isHinted = hintedPieceId === piece.id;

            // Mathematical background slice coordinates
            const bgPosX = gridSize > 1 ? (piece.col / (gridSize - 1)) * 100 : 0;
            const bgPosY = gridSize > 1 ? (piece.row / (gridSize - 1)) * 100 : 0;

            return (
              <div
                key={piece.id}
                id={`puzzle-slot-${slotIndex}`}
                draggable
                onDragStart={() => handleDragStart(slotIndex)}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(slotIndex)}
                onClick={() => handleTileClick(slotIndex)}
                className={`relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 group touch-manipulation ${
                  isSelected
                    ? 'ring-4 ring-amber-400 scale-[0.97] z-20 shadow-xl shadow-amber-500/40'
                    : isHinted
                    ? 'ring-4 ring-sky-400 animate-pulse scale-[0.98] z-10'
                    : isCorrect
                    ? 'border border-emerald-500/50 shadow-sm'
                    : 'border border-slate-700/80 hover:border-slate-500'
                }`}
              >
                {/* Rotatable tile inner */}
                <div
                  className="w-full h-full transition-transform duration-200"
                  style={{
                    transform: `rotate(${piece.rotation}deg)`,
                    backgroundImage: `url(${level.imageUrl})`,
                    backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
                    backgroundPosition: `${bgPosX}% ${bgPosY}%`,
                    backgroundRepeat: 'no-repeat',
                  }}
                />

                {/* Status badges */}
                {isCorrect && (
                  <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-emerald-500/90 text-slate-950 flex items-center justify-center shadow-md">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}

                {/* Selection glow indicator */}
                {isSelected && (
                  <div className="absolute inset-0 bg-amber-500/15 pointer-events-none flex items-center justify-center">
                    <span className="text-[10px] font-black uppercase tracking-wider bg-amber-500 text-slate-950 px-2 py-0.5 rounded-md shadow">
                      {isHi ? 'चुना हुआ' : 'Selected'}
                    </span>
                  </div>
                )}

                {/* Rotation Tool Button if level has rotations */}
                {level.hasRotation && (
                  <button
                    type="button"
                    onClick={(e) => handleRotate(e, piece.id)}
                    className={`absolute bottom-1 right-1 p-1.5 rounded-lg text-white backdrop-blur-md transition-all ${
                      piece.rotation % 360 !== 0
                        ? 'bg-amber-500/90 text-slate-950'
                        : 'bg-slate-950/70 hover:bg-slate-900 opacity-80 group-hover:opacity-100'
                    }`}
                    title={isHi ? '90° घुमाएं' : 'Rotate 90°'}
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                  </button>
                )}

                {/* Subtle Tile number for accessibility/clarity */}
                <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-black/40 text-[9px] font-mono text-white/70 pointer-events-none">
                  #{piece.id + 1}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Touch / Interaction Help Guide below board */}
      <div className="max-w-xl w-full mt-3 text-center text-xs text-slate-400 flex flex-wrap items-center justify-center gap-3">
        <span>
          💡{' '}
          {isHi
            ? 'किसी टुकड़े को छूकर दूसरे टुकड़े से बदलें (Tap to Swap / Drag & Drop)'
            : 'Tap piece A then B to swap, or drag & drop directly'}
        </span>
        {level.hasRotation && (
          <span className="text-amber-400 font-medium">
            ↺ {isHi ? 'उल्टे टुकड़े को घुमाने के लिए ↺ आइकन दबाएं' : 'Tap ↺ to rotate inverted piece'}
          </span>
        )}
      </div>
    </div>
  );
};
