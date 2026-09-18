import React, { useEffect, useRef } from 'react';

interface CoinShowerProps {
  durationMs?: number;
}

interface Coin {
  x: number;
  y: number;
  radius: number;
  vy: number;
  vx: number;
  rotation: number;
  vRot: number;
  flipAngle: number;
  vFlip: number;
  opacity: number;
}

export const CoinShower: React.FC<CoinShowerProps> = ({ durationMs = 5000 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const startTime = Date.now();

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Generate 45 initial coins spread out above and across viewport
    const coins: Coin[] = [];
    const count = Math.min(50, Math.floor(window.innerWidth / 20));

    for (let i = 0; i < count; i++) {
      coins.push({
        x: Math.random() * canvas.width,
        y: -30 - Math.random() * (canvas.height * 0.9),
        radius: 14 + Math.random() * 12,
        vy: 3.5 + Math.random() * 4.5,
        vx: (Math.random() - 0.5) * 1.8,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.08,
        flipAngle: Math.random() * Math.PI * 2,
        vFlip: 0.04 + Math.random() * 0.08,
        opacity: 0.9 + Math.random() * 0.1,
      });
    }

    const drawCoin = (coin: Coin) => {
      ctx.save();
      ctx.translate(coin.x, coin.y);
      ctx.rotate(coin.rotation);

      // 3D tumble projection using flipAngle
      const scaleX = Math.cos(coin.flipAngle);
      ctx.scale(Math.abs(scaleX) < 0.08 ? 0.08 : scaleX, 1);

      const r = coin.radius;

      // Outer drop shadow glow
      ctx.shadowColor = 'rgba(245, 158, 11, 0.4)';
      ctx.shadowBlur = 8;

      // Outer gold rim
      const rimGrad = ctx.createLinearGradient(-r, -r, r, r);
      rimGrad.addColorStop(0, '#fef08a'); // gold-200
      rimGrad.addColorStop(0.3, '#f59e0b'); // amber-500
      rimGrad.addColorStop(0.7, '#d97706'); // amber-600
      rimGrad.addColorStop(1, '#78350f'); // amber-900

      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.fillStyle = rimGrad;
      ctx.fill();

      // Coin inner body
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;

      const innerGrad = ctx.createRadialGradient(-r * 0.3, -r * 0.3, r * 0.1, 0, 0, r * 0.85);
      innerGrad.addColorStop(0, '#fef9c3'); // bright shine
      innerGrad.addColorStop(0.4, '#fbbf24'); // gold
      innerGrad.addColorStop(0.85, '#d97706'); // dark gold
      innerGrad.addColorStop(1, '#b45309');

      ctx.beginPath();
      ctx.arc(0, 0, r * 0.84, 0, Math.PI * 2);
      ctx.fillStyle = innerGrad;
      ctx.fill();

      // Inner beaded ring
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.72, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(254, 240, 138, 0.5)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Embossed "₹" symbol
      ctx.fillStyle = '#78350f';
      ctx.font = `bold ${Math.round(r * 0.95)}px "Arial", sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      // Subtle 3D shadow for rupee text
      ctx.fillText('₹', 0.8, 0.8);

      ctx.fillStyle = '#fef08a';
      ctx.fillText('₹', 0, 0);

      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const elapsed = Date.now() - startTime;
      const progress = elapsed / durationMs;

      coins.forEach((coin) => {
        coin.y += coin.vy;
        coin.x += coin.vx;
        coin.rotation += coin.vRot;
        coin.flipAngle += coin.vFlip;

        // Wrap or respawn while active
        if (coin.y > canvas.height + 40) {
          if (progress < 0.75) {
            coin.y = -30 - Math.random() * 50;
            coin.x = Math.random() * canvas.width;
          }
        }

        drawCoin(coin);
      });

      if (progress < 1.0) {
        animId = requestAnimationFrame(render);
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [durationMs]);

  return (
    <canvas
      ref={canvasRef}
      id="coin-shower-canvas"
      className="fixed inset-0 pointer-events-none z-40 w-full h-full"
    />
  );
};
