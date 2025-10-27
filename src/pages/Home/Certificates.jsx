import React, { useState } from 'react';

export default function Certificates() {
  const [modalSrc, setModalSrc] = useState('');

  const openCert = (src) => setModalSrc(src);
  const closeCert = () => setModalSrc('');

  const certs = [
    { src: '/cer1.jpg', full: '/cer1.jpg', title: 'Certificate 1' },
    { src: '/cer2.jpg', full: '/cer2.jpg', title: 'Certificate 2' },
    { src: '/cer3.jpg', full: '/cer3.jpg', title: 'Certificate 3' },
    { src: '/cer4.jpg', full: '/cer4.jpg', title: 'Certificate 4' },
    { src: '/cer5.jpg', full: '/cer5.jpg', title: 'Certificate 5' },
  ];

  return (
    <section id="certificates" aria-labelledby="certTitle">
      <div className="section-title">
        <h2 id="certTitle">Certificates</h2>
        <div className="section-sub">Certificates earned by team members and winners. Click to view full certificate.</div>
      </div>

      <div className="cert-grid">
        {certs.map((c) => (
          <div key={c.title} className="cert" tabIndex={0} onClick={() => openCert(c.full)} onKeyPress={(e) => e.key === 'Enter' && openCert(c.full)}>
            <img src={c.src} alt={c.title} />
            <div className="cert-title"><strong>{c.title}</strong></div>
          </div>
        ))}
      </div>

      {modalSrc && (
        <div id="certModal" className="cert-modal" aria-hidden={!modalSrc} onClick={(e) => e.target.id === 'certModal' && closeCert()}>
          <div className="cert-modal-inner" role="dialog" aria-modal="true">
            <button className="cert-close" onClick={closeCert} aria-label="Close">✕</button>
            <img id="certLarge" src={modalSrc} alt="Certificate Large" className="cert-large" />
            <div className="muted" style={{ marginTop: 10 }}>Click outside or ✕ to close</div>
          </div>
        </div>
      )}
    </section>
  );
}