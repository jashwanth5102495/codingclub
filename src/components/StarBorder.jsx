import React from 'react';
import './StarBorder.css';

export default function StarBorder({
  as: As = 'button',
  className = '',
  color = 'white',
  speed = '6s',
  thickness = 1,
  children,
  style,
  ...rest
}) {
  return (
    <As
      className={`star-border-container ${className}`}
      {...rest}
      style={{
        padding: `${thickness}px 0`,
        ...(style || {})
      }}
    >
      <div
        className="border-gradient-bottom"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed
        }}
      />
      <div
        className="border-gradient-top"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed
        }}
      />
      <div className="inner-content">{children}</div>
    </As>
  );
}