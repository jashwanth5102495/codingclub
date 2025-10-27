import React, { useMemo } from 'react';
import './InfiniteMenu.css';

export default function InfiniteMenu({ items = [], speedSec = 30, itemSize = 160, gap = 16 }) {
  const cleanItems = useMemo(() => (
    (items || []).map((it) => ({
      image: String(it.image || '').replace(/`/g, '').trim(),
      link: String(it.link || '#').replace(/`/g, '').trim(),
      title: it.title || '',
      description: it.description || '',
    }))
  ), [items]);

  // Duplicate items to create a seamless loop
  const loopItems = useMemo(() => [...cleanItems, ...cleanItems], [cleanItems]);

  return (
    <div className="infinite-menu" role="list">
      <div className="menu-track" style={{
        '--duration': `${speedSec}s`,
        '--gap': `${gap}px`,
        '--size': `${itemSize}px`,
      }}>
        {loopItems.map((it, i) => (
          <a key={i} href={it.link} className="menu-item" role="listitem" aria-label={it.title} target="_blank" rel="noreferrer">
            <div className="menu-thumb" style={{ backgroundImage: `url(${it.image})` }} />
            <div className="menu-meta">
              <div className="menu-title">{it.title}</div>
              {it.description ? <div className="menu-desc">{it.description}</div> : null}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}