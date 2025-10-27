import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import './ScrambledText.css';

gsap.registerPlugin(ScrambleTextPlugin);

export default function ScrambledText({
  radius = 100,
  duration = 1.2,
  speed = 0.5,
  scrambleChars = '.:',
  className = '',
  style = {},
  children,
}) {
  const rootRef = useRef(null);
  const charsRef = useRef([]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const p = root.querySelector('p');
    if (!p) return;

    // Split text into spans (avoid GSAP SplitText dependency)
    const text = p.textContent || '';
    p.innerHTML = '';
    const spans = [];
    for (let i = 0; i < text.length; i++) {
      const ch = text[i] === ' ' ? '\u00A0' : text[i];
      const span = document.createElement('span');
      span.className = 'char';
      span.textContent = ch;
      // store original content for scramble target
      span.setAttribute('data-content', ch);
      span.style.display = 'inline-block';
      spans.push(span);
      p.appendChild(span);
    }
    charsRef.current = spans;

    const handleMove = (e) => {
      for (const c of charsRef.current) {
        const rect = c.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.hypot(dx, dy);
        if (dist < radius) {
          gsap.to(c, {
            overwrite: true,
            duration: duration * (1 - dist / radius),
            scrambleText: {
              text: c.getAttribute('data-content') || '',
              chars: scrambleChars,
              speed,
            },
            ease: 'none',
          });
        }
      }
    };

    root.addEventListener('pointermove', handleMove);
    return () => {
      root.removeEventListener('pointermove', handleMove);
      // kill any running tweens
      for (const c of charsRef.current) gsap.killTweensOf(c);
      charsRef.current = [];
    };
  }, [radius, duration, speed, scrambleChars]);

  return (
    <div ref={rootRef} className={`text-block ${className}`} style={style}>
      <p>{children}</p>
    </div>
  );
}