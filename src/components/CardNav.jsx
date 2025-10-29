import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { GoArrowUpRight } from 'react-icons/go';
import { FaHome } from 'react-icons/fa';
import './CardNav.css';

const CardNav = ({
  logo,
  logoAlt = 'Logo',
  items = [],
  className = '',
  ease = 'power3.out',
  baseColor = '#fff',
  menuColor = '#000',
  buttonBgColor = '#111',
  buttonTextColor = '#fff',
}) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef(null);
  const cardsRef = useRef([]);
  const tlRef = useRef(null);

  // Make navbar background more opaque after scrolling
  useEffect(() => {
    const onScroll = () => setIsScrolled((window.scrollY || 0) > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Sync a body class to blur page content when nav expands
  useEffect(() => {
    const cls = 'nav-blur';
    const body = document.body;
    if (isExpanded) body.classList.add(cls); else body.classList.remove(cls);
    return () => body.classList.remove(cls);
  }, [isExpanded]);

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 260;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
      const contentEl = navEl.querySelector('.card-nav-content');
      if (contentEl) {
        const wasVisible = contentEl.style.visibility;
        const wasPointerEvents = contentEl.style.pointerEvents;
        const wasPosition = contentEl.style.position;
        const wasHeight = contentEl.style.height;

        contentEl.style.visibility = 'visible';
        contentEl.style.pointerEvents = 'auto';
        contentEl.style.position = 'static';
        contentEl.style.height = 'auto';

        contentEl.offsetHeight; // force reflow

        const topBar = 60;
        const padding = 16;
        const contentHeight = contentEl.scrollHeight;

        contentEl.style.visibility = wasVisible;
        contentEl.style.pointerEvents = wasPointerEvents;
        contentEl.style.position = wasPosition;
        contentEl.style.height = wasHeight;

        return topBar + contentHeight + padding;
      }
    }
    return 260;
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;

    gsap.set(navEl, { height: 60, overflow: 'hidden', backgroundColor: baseColor });
    gsap.set(cardsRef.current, { y: 40, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(navEl, { height: calculateHeight, duration: 0.4, ease });

    tl.to(cardsRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.35,
      ease,
      stagger: 0.08,
    }, '-=0.1');

    return tl;
  };

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;
    return () => {
      tl?.kill();
      tlRef.current = null;
    };
  }, [ease, items, baseColor]);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return;
      if (isExpanded) {
        const newHeight = calculateHeight();
        gsap.set(navRef.current, { height: newHeight });
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) { newTl.progress(1); tlRef.current = newTl; }
      } else {
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) { tlRef.current = newTl; }
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isExpanded]);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play(0);
    } else {
      setIsHamburgerOpen(false);
      tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
      tl.reverse();
    }
  };

  const setCardRef = (i) => (el) => { if (el) cardsRef.current[i] = el; };

  return (
    <div className={`card-nav-container ${className}`}>
      {/* Backdrop overlay to blur page when menu is expanded */}
      <div
        className={`card-nav-backdrop ${isExpanded ? 'visible' : ''}`}
        onClick={toggleMenu}
        aria-hidden={!isExpanded}
      />

      <nav ref={navRef} className={`card-nav ${isExpanded ? 'open' : ''}`} style={{ backgroundColor: isScrolled ? 'rgba(7,7,20,0.92)' : baseColor }}>
        <div className="card-nav-top">
          <div
            className={`hamburger-menu ${isHamburgerOpen ? 'open' : ''}`}
            onClick={toggleMenu}
            role="button"
            aria-label={isExpanded ? 'Close menu' : 'Open menu'}
            tabIndex={0}
            style={{ color: isScrolled ? '#fff' : (menuColor || '#000') }}
          >
            <div className="hamburger-line" />
            <div className="hamburger-line" />
            <div className="hamburger-line" />
          </div>

          {/* Center brand text */}
          <div className="logo-container" aria-label="Brand">
            <div className="site-title">Decode.Design.Dominate</div>
          </div>

          {/* Top-right control: Home icon */}
          <div className="top-right">
            <a href="/" className="card-nav-home-icon" aria-label="Home">
              <FaHome size={18} />
            </a>
          </div>
        </div>

        <div className="card-nav-content">
          {items.map((item, i) => (
            <div
              key={item.label}
              ref={setCardRef(i)}
              className="nav-card"
              style={item.bgImage ? {
                backgroundImage: `linear-gradient(180deg, rgba(7,7,20,0.45), rgba(7,7,20,0.68)), url("${item.bgImage}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                color: item.textColor,
              } : { backgroundColor: item.bgColor, color: item.textColor }}
            >
              <div className="nav-card-label">
                {item.label}
              </div>
              <div className="nav-card-links">
                {(item.links || []).map((link) => (
                  <a
                    key={link.label}
                    className="nav-card-link"
                    href={link.href || '#'}
                    aria-label={link.ariaLabel || link.label}
                    style={{ color: item.textColor }}
                  >
                    <GoArrowUpRight /> {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default CardNav;