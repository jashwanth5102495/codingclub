import React, { useEffect, useState } from 'react';

/**
 * Simple typewriter text effect.
 */
export default function TypewriterText({
  text = '',
  speed = 60,
  loop = false,
  className = '',
  style = {},
}) {
  const [shown, setShown] = useState('');

  useEffect(() => {
    let i = 0;
    let cancelled = false;

    function tick() {
      if (cancelled) return;
      if (i <= text.length) {
        setShown(text.slice(0, i));
        i += 1;
        setTimeout(tick, speed);
      } else if (loop) {
        setTimeout(() => { i = 0; tick(); }, 1000);
      }
    }

    setShown('');
    tick();
    return () => { cancelled = true; };
  }, [text, speed, loop]);

  return (
    <span className={className} style={style}>
      {shown}<span className="tw-caret">|</span>
    </span>
  );
}