import React from 'react';
import './LanyardCard.css';
import logo from '../assets/logo.svg';

export default function LanyardCard({ name = 'Name', role = 'Role', department = 'Department', photoSrc = null, alt = null }) {
  const src = photoSrc || logo;
  const altText = alt || `${name} photo`;
  return (
    <div className="lanyard-card" role="figure" aria-label={`${name} ${role} - ${department}`}>
      <div className="lanyard-strap" />
      <div className="lanyard-ring" />
      <div className="lanyard-id swing">
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