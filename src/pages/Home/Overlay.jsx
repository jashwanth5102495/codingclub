import React, { useEffect, useRef } from 'react';
import BlurText from '../../components/BlurText.jsx';

export default function Overlay({ onClose }) {
  const canvasRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const overlay = overlayRef.current;
    if (!canvas || !overlay) return;
    const ctx = canvas.getContext('2d');
    let flashes = [];
    let rafId = 0;
    let intervalId = 0;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();

    function lightning() {
      if (Math.random() < 0.03) {
        flashes.push({ x: Math.random() * canvas.width, y: 0, length: Math.random() * 250 + 150, alpha: 1 });
      }
    }

    function draw() {
      ctx.fillStyle = 'rgba(0,0,0,0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      flashes = flashes.filter(f => f.alpha > 0);
      flashes.forEach((f) => {
        ctx.beginPath();
        ctx.moveTo(f.x, f.y);
        for (let j = 0; j < 10; j++) {
          const x = f.x + (Math.random() - 0.5) * 50;
          const y = f.y + j * (f.length / 10);
          ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(255,255,255,${f.alpha})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        f.alpha -= 0.04;
      });
      rafId = requestAnimationFrame(draw);
    }

    intervalId = setInterval(lightning, 50);
    rafId = requestAnimationFrame(draw);

    function handleResize() { resize(); }
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(rafId);
      clearInterval(intervalId);
    };
  }, []);

  function handleEnter() {
    const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-thunder-strike-quick-1940.mp3');
    audio.play();
    const el = overlayRef.current;
    if (el) {
      el.style.animation = 'fadeOutOverlay 1.5s forwards';
      setTimeout(() => onClose?.(), 1600);
    } else {
      onClose?.();
    }
  };

  return (
    <div id="introOverlay" ref={overlayRef}>
      <canvas id="lightningCanvas" ref={canvasRef} />
      <div className="intro-content">
        <h1>ANVESHAK CLUB</h1>
        <BlurText
          text="Decode•Design•Dominate"
          delay={150}
          animateBy="words"
          direction="top"
          className="intro-blurtext"
        />
        <button id="enterBtn" onClick={handleEnter}>Step Into ANVESHAK ⚡</button>
      </div>
    </div>
  );
}