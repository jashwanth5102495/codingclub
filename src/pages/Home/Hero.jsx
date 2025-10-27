import React from 'react';

export default function Hero() {
  const scrollToAbout = () => {
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="hero" id="top" aria-label="Hero">
      <div className="hero-left reveal">
        <div className="kicker">ANVESHAK CLUB • Decode.Design.Dominate</div>
        <h1>Welcome to Team Anveshak</h1>
        <h2>Exploring,Innovating, and Evolving through Technology</h2>
        <p className="lead">
          Team Anveshak is the official technical team of Akash Global College of Management and Science, launched on April 11th, 2025, with a mission to inspire innovation and empower students through technology-driven learning.
          Our goal is to create a vibrant platform where creativity meets technology — fostering skills, collaboration, and practical knowledge among students. From technical workshops and certification programs to project showcases and hackathons, Team Anveshak serves as a hub for all tech enthusiasts eager to explore the digital world.
          We believe in learning by doing, encouraging every member to take part in hands-on activities, technical events, and collaborative projects that shape future-ready professionals.
        </p>
        <h3>Join us as we explore, innovate, and lead the way into the world of technology!</h3>
        <div className="actions">
          <a className="btn-primary" href="/#events">View Events</a>
        </div>
        <div className="hero-meta">
          <div className="date-pill">Next Quiz: 29 October, 2025</div>
          <div className="muted">Venue: College Tech Lab • Time: 10:00 AM</div>
        </div>
      </div>

      <aside className="hero-card" aria-hidden="false">
        <div className="hero-card-header">
          <div className="card-title">Quick Stats</div>
          <div className="small">Since 2025</div>
        </div>
        <div className="stat"><div><strong>11</strong><div className="small">Team Members</div></div><div className="muted">Active</div></div>
        <div className="stat"><div><strong>36</strong><div className="small">Projects</div></div><div className="muted">Showcased</div></div>
        <div className="stat"><div><strong>10+</strong><div className="small">Events</div></div><div className="muted">Campus</div></div>
        <div className="hero-card-actions">
          <a className="btn-primary" href="/#about">About Team</a>
          <button className="btn">Volunteer</button>
        </div>
      </aside>

      <div className="hero-arrow-wrap">
        <div className="down-arrow" title="Scroll to About" onClick={scrollToAbout}><i className="arrow"></i></div>
      </div>
    </section>
  );
}