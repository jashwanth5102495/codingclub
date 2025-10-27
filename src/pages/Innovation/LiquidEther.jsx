import React, { useEffect, useRef } from 'react';
import './LiquidEther.css';

/**
 * Lightweight cursor-reactive "liquid" ether background.
 * Canvas 2D implementation (no THREE dependency) with soft radial gradients.
 * Props are accepted to match the requested API shape; not all are used.
 */
export default function LiquidEther({
  colors = ['#5227FF', '#FF9FFC', '#B19EEF'],
  mouseForce = 20,
  cursorSize = 100,
  autoDemo = true,
  autoSpeed = 0.5,
  autoIntensity = 2.2,
  takeoverDuration = 0.25,
  autoResumeDelay = 3000,
  autoRampDuration = 0.6,
  style = {},
  className = '',
}) {
  const mountRef = useRef(null);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0, active: false });
  const lastMoveAtRef = useRef(Date.now());
  const rafRef = useRef(0);
  const sizeRef = useRef({ w: 0, h: 0 });
  const colorIndexRef = useRef(0);
  const autoPhaseRef = useRef(0);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Create canvas
    const canvas = document.createElement('canvas');
    canvasRef.current = canvas;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    mount.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    ctxRef.current = ctx;

    function resize() {
      const rect = mount.getBoundingClientRect();
      sizeRef.current.w = Math.max(1, Math.floor(rect.width));
      sizeRef.current.h = Math.max(1, Math.floor(rect.height));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(sizeRef.current.w * dpr);
      canvas.height = Math.floor(sizeRef.current.h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();

    const onPointerMove = (e) => {
      const rect = mount.getBoundingClientRect();
      pointerRef.current.x = e.clientX - rect.left;
      pointerRef.current.y = e.clientY - rect.top;
      pointerRef.current.active = true;
      lastMoveAtRef.current = Date.now();
    };
    const onPointerLeave = () => {
      pointerRef.current.active = false;
    };

    mount.addEventListener('pointermove', onPointerMove, { passive: true });
    mount.addEventListener('pointerleave', onPointerLeave, { passive: true });
    window.addEventListener('resize', resize);

    function step(t) {
      const ctx = ctxRef.current;
      if (!ctx) return;
      const { w, h } = sizeRef.current;

      // Gentle fade to create trails
      ctx.fillStyle = 'rgba(10,16,25,0.12)';
      ctx.fillRect(0, 0, w, h);

      // Determine target pointer (auto or user)
      let px = pointerRef.current.x;
      let py = pointerRef.current.y;
      const now = Date.now();
      const idle = autoDemo && (!pointerRef.current.active || now - lastMoveAtRef.current > autoResumeDelay);
      if (idle) {
        autoPhaseRef.current += autoSpeed * 0.03;
        const phase = autoPhaseRef.current;
        const rx = (Math.sin(phase * 0.9) * 0.4 + 0.5) * w;
        const ry = (Math.cos(phase * 0.7) * 0.4 + 0.5) * h;
        px = rx;
        py = ry;
      }

      const radius = Math.max(cursorSize, 140);
      const grad = ctx.createRadialGradient(px, py, 0, px, py, radius);
      // Cycle through colors
      const c1 = colors[colorIndexRef.current % colors.length];
      const c2 = colors[(colorIndexRef.current + 1) % colors.length];
      const c3 = colors[(colorIndexRef.current + 2) % colors.length];
      grad.addColorStop(0, hexToRgba(c1, Math.min(0.95, 0.5 + mouseForce / 80)));
      grad.addColorStop(0.5, hexToRgba(c2, Math.min(0.8, 0.35 + mouseForce / 100)));
      grad.addColorStop(1, hexToRgba(c3, 0.0));

      ctx.globalCompositeOperation = 'lighter';
      ctx.beginPath();
      ctx.arc(px, py, radius, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.globalCompositeOperation = 'source-over';

      // progress color cycling subtly
      colorIndexRef.current += 0.015 * autoIntensity;

      rafRef.current = requestAnimationFrame(step);
    }
    rafRef.current = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      mount.removeEventListener('pointermove', onPointerMove);
      mount.removeEventListener('pointerleave', onPointerLeave);
      if (canvas && canvas.parentNode === mount) mount.removeChild(canvas);
    };
  }, [colors, mouseForce, cursorSize, autoDemo, autoSpeed, autoIntensity, autoResumeDelay]);

  return (
    <div ref={mountRef} className={`liquid-ether-container ${className}`} style={style} />
  );
}

function hexToRgba(hex, a = 1) {
  const h = hex.replace('#', '');
  const bigint = parseInt(h.length === 3 ? h.split('').map(x => x + x).join('') : h, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}