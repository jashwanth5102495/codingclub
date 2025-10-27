import React, { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import './TargetCursor.css';

export default function TargetCursor({ targetSelector = '.cursor-target', spinDuration = 2, hideDefaultCursor = true }) {
  const cursorRef = useRef(null);
  const cornersRef = useRef([]);
  const spinTl = useRef(null);
  const dotRef = useRef(null);

  const constants = { borderWidth: 3, cornerSize: 12, parallaxStrength: 0.08 };

  const moveCursor = useCallback((x, y) => {
    if (!cursorRef.current) return;
    gsap.to(cursorRef.current, { x, y, duration: 0.12, ease: 'power3.out' });
  }, []);

  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;

    const originalCursor = document.body.style.cursor;
    if (hideDefaultCursor) document.body.style.cursor = 'none';

    gsap.set(el, { xPercent: -50, yPercent: -50, x: window.innerWidth / 2, y: window.innerHeight / 2 });

    const createSpin = () => {
      if (spinTl.current) spinTl.current.kill();
      spinTl.current = gsap.timeline({ repeat: -1 }).to(el, { rotation: '+=360', duration: spinDuration, ease: 'none' });
    };
    createSpin();

    const corners = el.querySelectorAll('.target-cursor-corner');
    cornersRef.current = corners;
    dotRef.current = el.querySelector('.target-cursor-dot');

    let activeTarget = null;
    let handlerMoveOnTarget = null;
    let handlerLeaveOnTarget = null;

    const cleanupTarget = (tgt) => {
      if (!tgt) return;
      if (handlerMoveOnTarget) tgt.removeEventListener('mousemove', handlerMoveOnTarget);
      if (handlerLeaveOnTarget) tgt.removeEventListener('mouseleave', handlerLeaveOnTarget);
      handlerMoveOnTarget = null;
      handlerLeaveOnTarget = null;
    };

    const placeCorners = (target, mouseX, mouseY) => {
      const rect = target.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (mouseX - cx) * constants.parallaxStrength;
      const dy = (mouseY - cy) * constants.parallaxStrength;

      const [tl, tr, br, bl] = cornersRef.current;
      if (!tl || !tr || !br || !bl) return;

      gsap.set(tl, { x: rect.left - constants.borderWidth + dx, y: rect.top - constants.borderWidth + dy });
      gsap.set(tr, { x: rect.right + constants.borderWidth - constants.cornerSize + dx, y: rect.top - constants.borderWidth + dy });
      gsap.set(br, { x: rect.right + constants.borderWidth - constants.cornerSize + dx, y: rect.bottom + constants.borderWidth - constants.cornerSize + dy });
      gsap.set(bl, { x: rect.left - constants.borderWidth + dx, y: rect.bottom + constants.borderWidth - constants.cornerSize + dy });
    };

    const windowMove = (e) => moveCursor(e.clientX, e.clientY);
    window.addEventListener('mousemove', windowMove);

    const down = () => {
      if (dotRef.current) gsap.to(dotRef.current, { scale: 0.7, duration: 0.2 });
      gsap.to(el, { scale: 0.9, duration: 0.2 });
    };
    const up = () => {
      if (dotRef.current) gsap.to(dotRef.current, { scale: 1, duration: 0.2 });
      gsap.to(el, { scale: 1, duration: 0.2 });
    };
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);

    const enter = (e) => {
      const t = e.target.closest(targetSelector);
      if (!t || t === activeTarget) return;
      if (activeTarget) cleanupTarget(activeTarget);
      activeTarget = t;

      spinTl.current?.pause();
      gsap.set(el, { rotation: 0 });
      gsap.to(cornersRef.current, { autoAlpha: 1, duration: 0.15 });

      handlerMoveOnTarget = (ev) => {
        const x = ev.clientX;
        const y = ev.clientY;
        placeCorners(activeTarget, x, y);
      };
      handlerLeaveOnTarget = () => {
        cleanupTarget(activeTarget);
        activeTarget = null;
        gsap.to(cornersRef.current, { autoAlpha: 0, duration: 0.15 });
        spinTl.current?.resume();
      };

      t.addEventListener('mousemove', handlerMoveOnTarget);
      t.addEventListener('mouseleave', handlerLeaveOnTarget);
      const mouseX = gsap.getProperty(el, 'x');
      const mouseY = gsap.getProperty(el, 'y');
      placeCorners(t, Number(mouseX), Number(mouseY));
    };

    window.addEventListener('mouseover', enter);

    const onScroll = () => {
      if (!activeTarget) return;
      const mouseX = Number(gsap.getProperty(el, 'x'));
      const mouseY = Number(gsap.getProperty(el, 'y'));
      const under = document.elementFromPoint(mouseX, mouseY);
      const stillOver = under && (under === activeTarget || under.closest(targetSelector) === activeTarget);
      if (!stillOver && handlerLeaveOnTarget) handlerLeaveOnTarget();
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      document.body.style.cursor = originalCursor;
      window.removeEventListener('mousemove', windowMove);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
      window.removeEventListener('mouseover', enter);
      window.removeEventListener('scroll', onScroll);
      cleanupTarget(activeTarget);
      spinTl.current?.kill();
    };
  }, [moveCursor, targetSelector, spinDuration, hideDefaultCursor]);

  return (
    <div className="target-cursor" ref={cursorRef} aria-hidden="true">
      <div className="target-cursor-dot" />
      <div className="target-cursor-corner tl" />
      <div className="target-cursor-corner tr" />
      <div className="target-cursor-corner br" />
      <div className="target-cursor-corner bl" />
    </div>
  );
}