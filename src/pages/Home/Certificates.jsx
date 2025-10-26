import React, { useState } from 'react';

export default function Certificates() {
  const [modalSrc, setModalSrc] = useState('');

  const openCert = (src) => setModalSrc(src);
  const closeCert = () => setModalSrc('');

  const certs = [
    { src: 'https://dummyimage.com/600x400/222/aaa&text=Cert+1', full: 'https://dummyimage.com/1200x800/111/ddd&text=Certificate+1', title: 'Winner Certificate — Sep 2025' },
    { src: 'https://dummyimage.com/600x400/222/aaa&text=Cert+2', full: 'https://dummyimage.com/1200x800/111/ddd&text=Certificate+2', title: 'Participation — Aug 2025' },
    { src: 'https://dummyimage.com/600x400/222/aaa&text=Cert+3', full: 'https://dummyimage.com/1200x800/111/ddd&text=Certificate+3', title: 'Mentor Certificate' },
    { src: 'https://dummyimage.com/600x400/222/aaa&text=Cert+4', full: 'https://dummyimage.com/1200x800/111/ddd&text=Certificate+4', title: 'Project Showcase' },
  ];

  return (
    <section id="certificates" className="reveal" aria-labelledby="certTitle">
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