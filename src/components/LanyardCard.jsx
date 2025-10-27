import React, { useRef } from 'react';
import './LanyardCard.css';
import logo from '../assets/logo.svg';

export default function LanyardCard({
  name = 'Name',
  role = 'Role',
  department = 'Department',
  photoSrc = null,
  alt = null,
  interactive = true,
  className = '',
}) {
  const src = photoSrc || logo;
  const altText = alt || `${name} photo`;

  const wrapperRef = useRef(null);
  const idRef = useRef(null);

  const handleMove = (e) => {
    if (!interactive || !wrapperRef.current || !idRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const nx = (x / rect.width) * 2 - 1; // -1..1
    const ny = (y / rect.height) * 2 - 1; // -1..1
    const rotY = nx * 10; // degrees
    const rotX = -ny * 10; // degrees
    idRef.current.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  };

  const handleLeave = () => {
    if (!interactive || !idRef.current) return;
    idRef.current.style.transform = '';
  };

  return (
    <div
      className={`lanyard-card${interactive ? ' reactive' : ''} ${className}`}
      role="figure"
      aria-label={`${name} ${role} - ${department}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      ref={wrapperRef}
    >
      <div className="lanyard-strap" />
      <div className="lanyard-ring" />
      <div className={`lanyard-id${interactive ? '' : ' swing'}`} ref={idRef}>
        <div className="lanyard-photo">
          <img src={src} alt={altText} />
        </div>
        <div className="lanyard-info">
          <div className="lanyard-name">{name}</div>
          <div className="lanyard-role">{role}</div>
          <div className="lanyard-dept">{department}</div>
        </div>
      </div>
    </div>
  );
}