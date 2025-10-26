import React, { useEffect, useState, useMemo } from 'react';
import Overlay from './Overlay.jsx';
import Hero from './Hero.jsx';
import About from './About.jsx';
import Events from './Events.jsx';
import Certificates from './Certificates.jsx';
import ScrollFrames from '../../components/ScrollFrames.jsx';

import ImageTrail from '../../components/ImageTrail.jsx';
import ASCIIText from '../../components/ASCIIText.jsx';

function Contact(){
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [message,setMessage] = useState('');
  const onSubmit = (e)=>{e.preventDefault();alert('Thanks! We will reach you on college channels.')}
  return (
    <section id="contact" className="reveal" aria-labelledby="contactTitle">
      <div className="section-title">
        <h2 id="contactTitle">🔹 Contact & Connect</h2>
        <div className="section-sub">We’d love to hear from you! Whether you have questions, suggestions, or want to join Team Anveshak, feel free to reach out</div>
      </div>

      <div className="contact-grid">
        <form className="contact-form" onSubmit={onSubmit}>
          <div className="field"><label>Name</label><input type="text" id="name" placeholder="Your name" required value={name} onChange={(e)=>setName(e.target.value)} /></div>
          <div className="field"><label>Email</label><input type="email" id="email" placeholder="anveshak@akashcollege.edu.in" required value={email} onChange={(e)=>setEmail(e.target.value)} /></div>
          <div className="field"><label>Message</label><textarea id="message" placeholder="Tell us how we can help..." value={message} onChange={(e)=>setMessage(e.target.value)} /></div>
          <div className="contact-actions">
            <button className="btn-primary" type="submit">Send Message</button>
            <div className="muted">We will reply on college contact channels.</div>
          </div>
        </form>

        <aside className="contact-aside" aria-label="Join WhatsApp via QR">
          <div className="qr-card">
            <h3>Join WhatsApp</h3>
            <img
              src="/background-flow/whqr.png"
              alt="WhatsApp group join QR code"
              className="qr-img"
              loading="lazy"
            />
            <p className="muted" style={{ marginTop: 8 }}>
              Scan to join the Anveshak WhatsApp group.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      © ANVESHAK CLUB — Technical Team • Built with ❤️
    </footer>
  );
}

export default function Home() {
  const [overlayVisible, setOverlayVisible] = useState(true);
  const [framesActive, setFramesActive] = useState(false);

  useEffect(() => {
    const revealEls = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('show');
      });
    }, { threshold: 0.12 });
    revealEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const galleryItems = useMemo(() => [
    'https://picsum.photos/id/287/300/300',
    'https://picsum.photos/id/1001/300/300',
    'https://picsum.photos/id/1025/300/300',
    'https://picsum.photos/id/1026/300/300',
    'https://picsum.photos/id/1027/300/300',
    'https://picsum.photos/id/1028/300/300',
    'https://picsum.photos/id/1029/300/300',
    'https://picsum.photos/id/1030/300/300',
  ], []);

  useEffect(() => {
    const hero = document.getElementById('top');
    const about = document.getElementById('about');
    const flags = { top: false, about: false };
    const update = () => setFramesActive(flags.top || flags.about);
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        const id = e.target.id;
        if (id === 'top') flags.top = e.isIntersecting;
        if (id === 'about') flags.about = e.isIntersecting;
      });
      update();
    }, { threshold: 0.25 });
    if (hero) obs.observe(hero);
    if (about) obs.observe(about);
    update();
    return () => obs.disconnect();
  }, []);

  return (
    <main>
      {framesActive && <ScrollFrames />}
      {overlayVisible && <Overlay onClose={() => setOverlayVisible(false)} />}
      <Hero />
      <About />

      <section id="gallery" className="reveal gallery-section">
        <div className="section-title" style={{ textAlign: 'center' }}>
          <h2>Our Gallery</h2>
        </div>
        <div className="gallery-box glass-box" style={{ position: 'relative', height: '520px', overflow: 'hidden' }}>
          <ImageTrail items={galleryItems} variant={1} />
          <div className="hover-prompt" aria-hidden="false">
            <h1>Hover Me.</h1>
            <div className="variant">Variant 1</div>
          </div>
        </div>
      </section>

      {/* Introducing section with ASCII text effect (centered) */}
      <section id="introducing" className="reveal" aria-labelledby="introducingTitle">
        <div className="section-title" style={{ textAlign: 'center' }}>
          <h2 id="introducingTitle">Introducing</h2>
          <div className="section-sub">ASCII-styled headline inspired by your reference.</div>
        </div>
        <div className="gallery-box ascii-wrap">
          <ASCIIText text="Hey!" enableWaves={true} asciiFontSize={8} />
        </div>
      </section>

      {/* Innovation Lab below the Introducing section */}
      <section id="innovation" className="reveal" aria-labelledby="innovationTitle">
        <div className="section-title" style={{ textAlign: 'center' }}>
          <h2 id="innovationTitle">Innovation Lab</h2>
          <div className="section-sub">Explore prototypes and experiments from the team.</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <a href="/innovation.html" className="btn-primary">Open Innovation Lab</a>
        </div>
      </section>

      {/* Removed Upcoming Events section as requested */}
      {/* <Events /> */}
      <Certificates />
      <Contact />
      <Footer />
    </main>
  );
}