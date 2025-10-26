import React, { useEffect, useRef } from 'react';
import './Innovation.css';

export default function Innovation() {
  const sparksRef = useRef(null);

  useEffect(() => {
    const container = sparksRef.current;
    if (!container) return;
    for (let i = 0; i < 25; i++) {
      const spark = document.createElement('div');
      spark.classList.add('spark');
      spark.style.width = `${Math.random() * 6 + 4}px`;
      spark.style.height = `${Math.random() * 6 + 4}px`;
      spark.style.top = `${Math.random() * 100}%`;
      spark.style.left = `${Math.random() * 100}%`;
      spark.style.animationDuration = `${Math.random() * 15 + 10}s`;
      container.appendChild(spark);
    }

    const reveals = document.querySelectorAll('.reveal');
    function onScroll() {
      for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const revealTop = reveals[i].getBoundingClientRect().top;
        const revealPoint = 150;
        if (revealTop < windowHeight - revealPoint) {
          reveals[i].classList.add('active');
        } else {
          reveals[i].classList.remove('active');
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToContent = () => {
    const firstSection = document.querySelector('.innovation-section');
    if (firstSection) firstSection.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="innovation-page">
      <div ref={sparksRef} id="sparks-container" />

      <header className="innovation-header">
        <div className="brand">Innovation Lab 2025</div>
        <nav>
          <a href="/">Home</a>
          <a href="/#about">About</a>
          <a href="/#events">Events</a>
          <a href="#top">Innovation</a>
          <a href="/#contact">Contact</a>
        </nav>
      </header>

      <section className="innovation-hero" id="top">
        <h1>Innovation Lab 2025 – The Journey of Team Pratham</h1>
        <h2>A Chronicle of Leadership, Learning, and Innovation</h2>
        <p className="lead">
          The success of Innovation Lab 2025 stands as a shining example of what vision, mentorship, and teamwork can achieve at Akash Global College of Management and Science.
        </p>
        <div className="scroll-down" onClick={scrollToContent}>⇣</div>
      </section>

      <section className="innovation-section reveal">
        <h2>The Beginning of an Idea</h2>
        <p>
          The vision for Innovation Lab 2025 was brought to life by two passionate students — Jashwanth (MCA – 1st Year) and Madhu Sudhan Reddy (BCA – 3rd Year) — who took the bold step of organizing a Hackathon aimed at enhancing students’ technical exposure.
        </p>
        <p>
          Jashwanth and Madhu Sudhan’s initiative was more than a competition — it was a learning movement. They ensured that every student, regardless of prior experience, gained the confidence to build and innovate.
        </p>
      </section>

      <section className="innovation-section reveal">
        <h2>Building the Foundation</h2>
        <p>
          Before the hackathon commenced, participants attended training sessions led by Jashwanth and Madhu Sudhan, where they were introduced to essential web technologies such as HTML, CSS, and JavaScript, along with tools like Git and GitHub.
        </p>
        <p>
          Their effort transformed beginners into confident learners and created a strong sense of community among participants.
        </p>
      </section>

      <section className="innovation-section reveal">
        <h2>Formation of Team Pratham</h2>
        <p>
          After the day of coding, creativity, and collaboration, the Hackathon results were announced on 12th September 2025. From this event, a team of nine talented students emerged — forming Team Pratham, symbolizing “the first step toward excellence.”
        </p>
        <p>
          Team Pratham became a symbol of determination, teamwork, and learning.
        </p>
      </section>

      <section className="innovation-section reveal">
        <h2>Guidance that Made it Possible</h2>
        <p>
          The leadership of Principal Dr. Channaveere Gowda and HOD Mr. Naveen M. V. Gowda played a crucial role in bringing the Innovation Lab to life.
        </p>
        <p>
          Special appreciation goes to Mr. Abhishek and Mr. Shashidhar, the teacher coordinators who stood beside the students at every stage — guiding, mentoring, and ensuring smooth execution of every session and event.
        </p>
      </section>

      <section className="innovation-section reveal">
        <h2>From Campus to Corporate – Learning with Jasnav IT Solutions</h2>
        <p>
          After the successful hackathon, Team Pratham continued their journey by enrolling in a Front-End Beginner Level Course offered by Jasnav IT Solutions.
        </p>
        <p>
          Students completed interactive modules, coding assignments, and four practical projects.
        </p>
      </section>

      <section className="innovation-section reveal">
        <h2>A Legacy of Innovation</h2>
        <p>
          The Innovation Lab 2025 became a landmark event for Akash Global College of Management and Science.
        </p>
        <p style={{textAlign:'center', color:'#00E5FF', fontWeight:700, fontSize:'1.2rem', marginTop:'1rem'}}>
          Innovation Lab 2025 – Where Curiosity Became Code, and Ideas Became Impact.
        </p>
      </section>

      <footer className="innovation-footer">
        © ANVESHAK CLUB — Technical Team • Built with ❤️
      </footer>
    </div>
  );
}