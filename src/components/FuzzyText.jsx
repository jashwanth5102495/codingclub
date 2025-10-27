import React, { useEffect, useRef } from 'react';
import './FuzzyText.css';

/**
 * FuzzyText — canvas-based scanline jitter effect for text.
 * Props mirror the provided API but implemented in plain React/JS.
 */
const FuzzyText = ({
  children,
  fontSize = 'clamp(2rem, 8vw, 8rem)',
  fontWeight = 900,
  fontFamily = 'inherit',
  color = '#fff',
  enableHover = true,
  baseIntensity = 0.18,
  hoverIntensity = 0.5,
  className = '',
  style = {},
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let animationFrameId = 0;
    let isHovering = false;

    const init = async () => {
      try { if (document.fonts?.ready) await document.fonts.ready; } catch {}
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const computedFontFamily = fontFamily === 'inherit'
        ? (window.getComputedStyle(canvas).fontFamily || 'sans-serif')
        : fontFamily;
      const fontSizeStr = typeof fontSize === 'number' ? `${fontSize}px` : fontSize;

      const text = typeof children === 'string'
        ? children
        : React.Children.toArray(children).join('');

      // Measure approximate font size using a temporary element
      const temp = document.createElement('span');
      temp.style.fontSize = fontSizeStr;
      temp.style.fontFamily = computedFontFamily;
      temp.style.fontWeight = String(fontWeight);
      temp.textContent = text;
      temp.style.position = 'absolute';
      temp.style.visibility = 'hidden';
      document.body.appendChild(temp);
      const numericFontSize = parseFloat(window.getComputedStyle(temp).fontSize);
      document.body.removeChild(temp);

      // Offscreen text rendering
      const offscreen = document.createElement('canvas');
      const offCtx = offscreen.getContext('2d');
      if (!offCtx) return;

      offCtx.font = `${fontWeight} ${fontSizeStr} ${computedFontFamily}`;
      offCtx.textBaseline = 'alphabetic';
      offCtx.fillStyle = color;
      const metrics = offCtx.measureText(text);

      const actualLeft = metrics.actualBoundingBoxLeft || 0;
      const actualRight = metrics.actualBoundingBoxRight || metrics.width;
      const actualAscent = metrics.actualBoundingBoxAscent || numericFontSize;
      const actualDescent = metrics.actualBoundingBoxDescent || numericFontSize * 0.2;

      const textBoundingWidth = Math.ceil(actualLeft + actualRight);
      const tightHeight = Math.ceil(actualAscent + actualDescent);

      const extraWidthBuffer = 12;
      offscreen.width = textBoundingWidth + extraWidthBuffer;
      offscreen.height = tightHeight;

      const xOffset = extraWidthBuffer / 2;
      offCtx.font = `${fontWeight} ${fontSizeStr} ${computedFontFamily}`;
      offCtx.textBaseline = 'alphabetic';
      offCtx.fillStyle = color;
      offCtx.clearRect(0, 0, offscreen.width, offscreen.height);
      offCtx.fillText(text, xOffset - actualLeft, actualAscent);

      // Main canvas sizing
      const horizontalMargin = 50;
      const verticalMargin = 0;
      const canvasWidth = offscreen.width + horizontalMargin * 2;
      const canvasHeight = offscreen.height + verticalMargin * 2;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      canvas.style.width = `${canvasWidth}px`;
      canvas.style.height = `${canvasHeight}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.translate(horizontalMargin, verticalMargin);

      const interactiveLeft = horizontalMargin + xOffset;
      const interactiveTop = verticalMargin;
      const interactiveRight = interactiveLeft + textBoundingWidth;
      const interactiveBottom = interactiveTop + tightHeight;

      const fuzzRange = 30;

      const run = () => {
        ctx.clearRect(-fuzzRange, -fuzzRange, offscreen.width + 2 * fuzzRange, tightHeight + 2 * fuzzRange);
        const intensity = isHovering ? hoverIntensity : baseIntensity;
        for (let j = 0; j < tightHeight; j++) {
          const dx = Math.floor(intensity * (Math.random() - 0.5) * fuzzRange);
          ctx.drawImage(offscreen, 0, j, offscreen.width, 1, dx, j, offscreen.width, 1);
        }
        animationFrameId = window.requestAnimationFrame(run);
      };
      run();

      const isInsideTextArea = (x, y) => x >= interactiveLeft && x <= interactiveRight && y >= interactiveTop && y <= interactiveBottom;

      const onMouseMove = (e) => {
        if (!enableHover) return;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        isHovering = isInsideTextArea(x, y);
      };

      const onMouseLeave = () => { isHovering = false; };

      const onTouchMove = (e) => {
        if (!enableHover) return;
        e.preventDefault();
        const rect = canvas.getBoundingClientRect();
        const t = e.touches[0];
        const x = t.clientX - rect.left;
        const y = t.clientY - rect.top;
        isHovering = isInsideTextArea(x, y);
      };

      const onTouchEnd = () => { isHovering = false; };

      if (enableHover) {
        canvas.addEventListener('mousemove', onMouseMove);
        canvas.addEventListener('mouseleave', onMouseLeave);
        canvas.addEventListener('touchmove', onTouchMove, { passive: false });
        canvas.addEventListener('touchend', onTouchEnd);
      }

      const cleanup = () => {
        window.cancelAnimationFrame(animationFrameId);
        if (enableHover) {
          canvas.removeEventListener('mousemove', onMouseMove);
          canvas.removeEventListener('mouseleave', onMouseLeave);
          canvas.removeEventListener('touchmove', onTouchMove);
          canvas.removeEventListener('touchend', onTouchEnd);
        }
      };
      canvas.cleanupFuzzyText = cleanup;

      return cleanup;
    };

    let cleanup;
    (async () => { cleanup = await init(); })();

    return () => {
      if (cleanup) cleanup();
      const c = canvasRef.current;
      if (c && c.cleanupFuzzyText) {
        try { c.cleanupFuzzyText(); } catch {}
      }
    };
  }, [children, fontSize, fontWeight, fontFamily, color, enableHover, baseIntensity, hoverIntensity]);

  return (
    <canvas
      ref={canvasRef}
      className={`fuzzy-text-canvas ${className || ''}`}
      style={{ fontFamily, fontWeight, fontSize, color, ...style }}
    />
  );
};

export default FuzzyText;