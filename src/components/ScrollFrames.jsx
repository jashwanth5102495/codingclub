import React, { useEffect, useRef, useState } from 'react';
import './ScrollFrames.css';

// Scroll-driven frame animation using sequence of JPGs
// Frames served from Vite public folder: /public/background-flow/ezgif-frame-001.jpg ... 067.jpg

const FRAME_COUNT = 145;

function pad3(n) {
  return String(n).padStart(3, '0');
}

function getSrc(i) {
  const base = import.meta.env.BASE_URL || '/';
  return `${base}background-flow/flow2/ezgif-frame-${pad3(i)}.jpg`;
}

export default function ScrollFrames({ anchorStart = null, anchorEnd = null }) {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const frameRef = useRef(1); // current frame index 1..FRAME_COUNT
  const rafRef = useRef(0);
  const dprRef = useRef(window.devicePixelRatio || 1);
  const rangeRef = useRef({ top: 0, bottom: Number.POSITIVE_INFINITY });
  const [isActive, setIsActive] = useState(anchorStart == null && anchorEnd == null);

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
      if (!img) return; // not loaded yet
      const cw = canvas.width / dprRef.current;
      const ch = canvas.height / dprRef.current;
      const iw = img.naturalWidth || img.width;
      const ih = img.naturalHeight || img.height;
      // cover-fit scaling to fill the viewport like before
      const scale = Math.max(cw / iw, ch / ih);
      const w = iw * scale;
      const h = ih * scale;
      const x = (cw - w) / 2;
      const y = (ch - h) / 2;
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, x, y, w, h);
    }

    function preload() {
      const arr = new Array(FRAME_COUNT);
      imagesRef.current = arr;
      // eager-load first frame for quick paint
      const first = new Image();
      first.src = getSrc(1);
      first.onload = () => {
        arr[0] = first;
        drawFrame(1);
      };
      // lazy-load remaining
      for (let i = 2; i <= FRAME_COUNT; i++) {
        const im = new Image();
        im.src = getSrc(i);
        im.onload = () => {
          arr[i - 1] = im;
          // If the newly loaded image is our current target frame, repaint
          if (frameRef.current === i) drawFrame(i);
        };
      }
    }

    function onScroll() {
      // Map scroll progress to frame index within the scoped range (if provided)
      const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
      const viewportMid = scrollTop + window.innerHeight / 2;
      const { top, bottom } = rangeRef.current;
      const inRange = viewportMid >= top && viewportMid <= bottom;
      setIsActive(inRange);

      const rangeLen = Math.max(bottom - top, 1);
      const progress = Math.min(Math.max((viewportMid - top) / rangeLen, 0), 1);
      const target = Math.min(
        FRAME_COUNT,
        Math.max(1, Math.round(progress * (FRAME_COUNT - 1)) + 1)
      );
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
  }, [anchorStart, anchorEnd]);

  return (
    <div className={`scroll-frames-wrap ${isActive ? 'active' : 'inactive'}`} aria-hidden="true">
      <canvas ref={canvasRef} className="scroll-frames-canvas" />
      <div className="scroll-frames-gradient" />
    </div>
  );
}