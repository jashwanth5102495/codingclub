import React from 'react';

export default function About() {
  return (
    <section id="about" className="reveal" aria-labelledby="aboutTitle">
      <div className="section-title">
        <h2 id="aboutTitle">About ANVESHAK CLUB</h2>
        <div className="section-sub">We learn new tech, build projects and run competitive quizzes to discover talent.</div>
      </div>

      <div className="about-grid">
        <div>
          <p className="muted">
            <strong>Who We Are</strong><br/>
            Team Anveshak is a vibrant community of innovators, learners, and tech enthusiasts at Akash Global College of Management and Science. Formed with the vision of creating a space where ideas come to life, the team strives to inspire curiosity, encourage experimentation, and empower students to push the boundaries of technology.
            <br/>
            <br/>
            <strong>Our Purpose</strong><br/>
            We aim to bridge the gap between theory and practice by encouraging students to apply their knowledge through real-world technical experiences. Team Anveshak focuses on nurturing technical skills, leadership qualities, and teamwork among its members.
            <br/>
            <br/>
            <strong>Our Impact</strong><br/>
            Through our initiatives, students gain exposure to emerging technologies, collaborate on meaningful projects, and develop a mindset ready for the digital future. We take pride in fostering a community that learns, grows, and leads together.
            <br/>
            <br/>
            FOUNDER: Principal sir - Dr. Channaveere Gowda B N and HOD - MR. Naveen M V
            <br/>
            <br/>
            COORDINATORS: Shashidhar sir, Abhishek sir
            <br/>
            <br/>
            STUDENT COORDINATORS: Jashwanth (MCA 1st year), MadhuSudhan Reddy (BCA 3rd year)
          </p>

          <h3>What we learn</h3>
          <div className="skills">
            <div className="skill">Data Structures</div>
            <div className="skill">Algorithms</div>
            <div className="skill">Web Development</div>
            <div className="skill">Machine Learning</div>
            <div className="skill">Frontend development</div>
            <div className="skill">Mobile Apps</div>
          </div>
        </div>

        <aside className="about-aside">
          <h3>Join the Next Quiz</h3>
          <p className="muted">No registration here — coordinate with your department or the event coordinators on college notice board.</p>
          <h4>Contact Lead</h4>
          <div className="muted">Email: jashwanth5012495@gmail.com</div>
          <div className="follow">
            <br/>
            <strong>Follow</strong>
            <br/>
            <div className="socials">
              <a href="https://www.instagram.com/anveshakscienceforum/?igsh=MnQzZW1hODZtMWw1&utm_source=ig_contact_invite#" target="_blank" className="muted" rel="noreferrer">Instagram</a>
              <br/>
              <br/>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}