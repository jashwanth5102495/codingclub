import React, { useEffect, useRef, useState } from 'react';
import './ScrollFrames.css';

function pad3(n) {
  return String(n).padStart(3, '0');
}

export default function ScrollFrames({ anchorStart = null, anchorEnd = null, folder = 'bg flow part1', count = 46, fadeEdge = 0.15 }) {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const frameRef = useRef(1);
  const rafRef = useRef(0);
  const dprRef = useRef(window.devicePixelRatio || 1);
  const rangeRef = useRef({ top: 0, bottom: Number.POSITIVE_INFINITY });
  const [isActive, setIsActive] = useState(anchorStart == null && anchorEnd == null);
  const [opacity, setOpacity] = useState(anchorStart == null && anchorEnd == null ? 1 : 0);

  const getSrc = (i) => {
    const base = import.meta.env.BASE_URL || '/';
    const normalizedFolder = folder.startsWith('/') ? folder.slice(1) : folder;
    return `${base}${normalizedFolder}/ezgif-frame-${pad3(i)}.jpg`;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    function computeRange() {
      const startEl = anchorStart ? document.querySelector(anchorStart) : null;
      const endEl = anchorEnd ? document.querySelector(anchorEnd) : null;
      if (startEl && endEl) {
        const startRect = startEl.getBoundingClientRect();
        const endRect = endEl.getBoundingClientRect();
        const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
        rangeRef.current = {
          top: startRect.top + scrollY,
          bottom: endRect.bottom + scrollY,
        };
      } else {
        rangeRef.current = { top: 0, bottom: Number.POSITIVE_INFINITY };
      }
    }

    function setCanvasSize() {
      dprRef.current = window.devicePixelRatio || 1;
      canvas.width = Math.floor(window.innerWidth * dprRef.current);
      canvas.height = Math.floor(window.innerHeight * dprRef.current);
      ctx.setTransform(dprRef.current, 0, 0, dprRef.current, 0, 0);
    }

    function drawFrame(index) {
      const img = imagesRef.current[index - 1];
      if (!img) return;
      const cw = canvas.width / dprRef.current;
      const ch = canvas.height / dprRef.current;
      const iw = img.naturalWidth || img.width;
      const ih = img.naturalHeight || img.height;
      const scale = Math.max(cw / iw, ch / ih);
      const w = iw * scale;
      const h = ih * scale;
      const x = (cw - w) / 2;
      const y = (ch - h) / 2;
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, x, y, w, h);
    }

    function preload() {
      const arr = new Array(count);
      imagesRef.current = arr;
      const first = new Image();
      first.src = getSrc(1);
      first.onload = () => {
        arr[0] = first;
        drawFrame(1);
      };
      for (let i = 2; i <= count; i++) {
        const im = new Image();
        im.src = getSrc(i);
        im.onload = () => {
          arr[i - 1] = im;
          if (frameRef.current === i) drawFrame(i);
        };
      }
    }

    function computeOpacity(progress) {
      if (!anchorStart && !anchorEnd) return 1;
      const f = Math.max(Math.min(fadeEdge, 0.49), 0.01);
      if (progress <= f) return progress / f;
      if (progress >= 1 - f) return (1 - progress) / f;
      return 1;
    }

    function onScroll() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
      const viewportMid = scrollTop + window.innerHeight / 2;
      const { top, bottom } = rangeRef.current;
      const inRange = viewportMid >= top && viewportMid <= bottom;
      setIsActive(inRange);

      const rangeLen = Math.max(bottom - top, 1);
      const progress = Math.min(Math.max((viewportMid - top) / rangeLen, 0), 1);
      setOpacity(computeOpacity(progress));
      const target = Math.min(count, Math.max(1, Math.round(progress * (count - 1)) + 1));
      frameRef.current = target;
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          rafRef.current = 0;
          drawFrame(frameRef.current);
        });
      }
    }

    function onResize() {
      computeRange();
      setCanvasSize();
      drawFrame(frameRef.current);
    }

    setCanvasSize();
    computeRange();
    preload();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [anchorStart, anchorEnd, folder, count, fadeEdge]);

  return (
    <div className={`scroll-frames-wrap ${isActive ? 'active' : 'inactive'}`} aria-hidden="true" style={{ opacity }}>
      <canvas ref={canvasRef} className="scroll-frames-canvas" />
      <div className="scroll-frames-gradient" />
    </div>
  );
}