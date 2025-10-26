import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './ImageTrail.css';

function getLocalPointerPos(e, rect) {
  let clientX = 0, clientY = 0;
  if ('touches' in e && e.touches.length > 0) {
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;
  } else if ('clientX' in e) {
    clientX = e.clientX;
    clientY = e.clientY;
  }
  return { x: clientX - rect.left, y: clientY - rect.top };
}

function getMouseDistance(p1, p2) {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  return Math.hypot(dx, dy);
}

export default function ImageTrail({ items = [], variant = 1 }) {
  const wrapRef = useRef(null);
  const imgRefs = useRef([]);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const zRef = useRef(1);
  const idxRef = useRef(0);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const rect = () => wrap.getBoundingClientRect();

    imgRefs.current.forEach((el) => {
      if (!el) return;
      gsap.set(el, { scale: 0.8, opacity: 0, x: 0, y: 0 });
    });

    function showAt(pos) {
      const i = idxRef.current % imgRefs.current.length;
      const el = imgRefs.current[i];
      if (!el) return;
      idxRef.current++;
      const w = el.offsetWidth; const h = el.offsetHeight;
      const x = pos.x - w / 2; const y = pos.y - h / 2;
      gsap.killTweensOf(el);
      gsap.set(el, { x, y, zIndex: zRef.current++, rotate: gsap.utils.random(-8, 8) });
      gsap.to(el, { opacity: 1, scale: 1, duration: 0.25, ease: 'power2.out' });
      gsap.to(el, { opacity: 0, scale: 0.9, duration: 0.6, ease: 'power2.in', delay: 0.3 });
    }

    function onMove(e) {
      const p = getLocalPointerPos(e, rect());
      const dist = getMouseDistance(p, lastPosRef.current);
      if (dist > 60) {
        lastPosRef.current = p;
        showAt(p);
      }
    }

    function onLeave() {
      imgRefs.current.forEach((el) => {
        gsap.to(el, { opacity: 0, duration: 0.25 });
      });
    }

    wrap.addEventListener('pointermove', onMove, { passive: true });
    wrap.addEventListener('mouseleave', onLeave);
    wrap.addEventListener('touchend', onLeave);

    return () => {
      wrap.removeEventListener('pointermove', onMove);
      wrap.removeEventListener('mouseleave', onLeave);
      wrap.removeEventListener('touchend', onLeave);
    };
  }, [items, variant]);

  return (
    <div ref={wrapRef} className="image-trail" aria-hidden="true">
      {items.map((src, i) => (
        <div
          key={i}
          ref={(el) => { imgRefs.current[i] = el; }}
          className="content__img"
          style={{ willChange: 'transform, opacity' }}
        >
          <div className="content__img-inner" style={{ backgroundImage: `url(${String(src).replace(/`/g, '')})` }} />
        </div>
      ))}
    </div>
  );
}