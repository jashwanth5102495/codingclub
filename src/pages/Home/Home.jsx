import React, { useEffect, useMemo, useState } from 'react';
import Hero from './Hero.jsx';
import About from './About.jsx';
import Events from './Events.jsx';
import Certificates from './Certificates.jsx';
import ScrollFrames from '../../components/ScrollFrames.jsx';

import ImageTrail from '../../components/ImageTrail.jsx';
import GlitchText from '../../components/GlitchText.jsx';
import StarBorder from '../../components/StarBorder.jsx';
import { Link } from 'react-router-dom';

function Contact(){
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [message,setMessage] = useState('');
  const onSubmit = (e)=>{e.preventDefault();alert('Thanks! We will reach you on college channels.')}
  return (
    <section id="contact" aria-labelledby="contactTitle">
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
    '/1.jpg',
    '/2.jpg',
    '/3.jpg',
    '/4.jpg',
    '/5.jpg',
    '/6.jpg',
    '/7.jpg',
    '/8.jpg',
    '/9.jpg',
  ], []);

  return (
    <main style={{ color: '#fff', backgroundColor: '#000' }}>
      <ScrollFrames folder="background-flow/flow2" count={100} anchorStart="#top" anchorEnd="#about" />
      <ScrollFrames folder="bg flow part1" count={46} anchorStart="#about" anchorEnd="#intro-glitch" />
      <Hero />
      <About />

      <section id="intro-glitch" className="section" style={{ backgroundColor: '#000' }}>
        <div className="section-title" style={{ textAlign: 'center' }}>
          <h2>Introducing</h2>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '8px' }}>
          <GlitchText speed={0.6} enableShadows={true} enableOnHover={false} className="glitch-xl">Innovation Lab</GlitchText>
        </div>
        <div className="intro-copy" style={{ marginTop: '16px', maxWidth: '900px', margin: '16px auto', lineHeight: 1.6 }}>
          <p>
            Innovation Lab, founded on September 8, 2025, is a dynamic coding club created to bridge the gap between academic learning and real-world technological skills. The main motto of this club is to train students in trending and emerging technologies, empowering them to become industry-ready professionals capable of excelling in top companies.
          </p>
          <p>
            Students are shortlisted through competitive events such as hackathons, coding challenges, and tech quizzes, ensuring that only the most passionate and talented individuals earn their place in the club. Once selected, members undergo specialized training sessions, workshops, and real-time project experiences guided by mentors and industry experts.
          </p>
          <p>
            The Innovation Lab serves as a hub of creativity, innovation, and collaboration — a place where ideas are transformed into impactful solutions, and students grow into confident technologists ready to shape the future.
          </p>
          <div style={{ textAlign: 'center', marginTop: '12px' }}>
              <StarBorder as={Link} to="/innovation-page" className="custom-class" color="cyan" speed="5s" thickness={1}>
                Click here
              </StarBorder>
            </div>
        </div>
      </section>

      <section id="gallery" className="gallery-section">
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

      {/* Removed Upcoming Events section as requested */}
      {/* <Events /> */}
      <Certificates />
      <Contact />
      <Footer />
    </main>
  );
}