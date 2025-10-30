import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Hero() {
  const scrollToAbout = () => {
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  const [showCredits, setShowCredits] = useState(false);
  const navigate = useNavigate();

  const handleTeamIconClick = () => {
    navigate('/team-info');
  };

  return (
    <section className="hero" id="top" aria-label="Hero">
      <img
        src="/team.png"
        alt="Team Anveshak info"
        className="team-icon"
        onClick={handleTeamIconClick}
      />
      {showCredits && (
        <div className="team-credits" role="dialog" aria-modal="true" aria-label="Team credits">
          <button className="cert-close" onClick={() => setShowCredits(false)} aria-label="Close">✕</button>
          <div className="team-credits-inner">
            <p style={{ marginBottom: 8 }}>
              This project was developed within 48 hours as part of a rapid development challenge. The team followed the Agile workflow under the guidance of Mr. Omkareshwar Kori (Professor), ensuring continuous collaboration and iterative progress throughout the process.
            </p>
            <p style={{ marginBottom: 8 }}>
              If any student wishes to contribute, enhance, or be a part of this journey, you are welcome to clone the project repository from the link below and develop further:
              <br/>
              <strong>GitHub Repository:</strong> <a href="https://github.com/InnovationLab2025/Anveshak_web_app.git" target="_blank" rel="noopener noreferrer">InnovationLab2025/Anveshak_web_app</a>
            </p>
            <p style={{ marginBottom: 12 }}>
              For push access or contribution rights, please contact the Team Lead.
            </p>
            <div>Team Lead : Jashwanth (MCA), Madhu Sudhan Reddy (BCA)</div>
            <div>Project Architectural : Jashwanth</div>
            <div>Base project creation : Purshottam V, Santhosh Gowda D A</div>
            <div>Modern U.I enhancements and Animations : Jashwanth</div>
            <div>Data Gathering : Sai Likitha, Sahana</div>
            <div>forntend styling : Aishwarya, Shaik Thanaaz, Abhishek N</div>
            <div>Deployment : Madhu Sudhan Reddy, Bharath Chowdary</div>
            <div>testing : Bharath Chowdary, Abhishek N, Sahil Irshad</div>
          </div>
        </div>
      )}

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
          <Link className="btn-primary" to="/events-results">Events and Results</Link>
        </div>
        <div className="hero-meta">
          {/* Removed Next Quiz and Venue details as requested */}
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