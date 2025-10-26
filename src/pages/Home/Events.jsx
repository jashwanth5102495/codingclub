import React from 'react';

export default function Events() {
  return (
    <section id="events" className="reveal" aria-labelledby="eventsTitle">
      <div className="section-title">
        <h2 id="eventsTitle">UPCOMMING EVENTS</h2>
        <div className="section-sub">
          <h3>🔹 Upcoming Hackathon – Quiz Edition</h3>
          <p>
            Team Anveshak is thrilled to announce its next exciting initiative — a hackathon in the form of a quiz, scheduled for 29th October 2025. Unlike traditional coding challenges, this event will test students' theoretical knowledge, problem-solving skills, and understanding of technical concepts in a fast-paced, competitive environment.
          </p>
          <p>
            The quiz aims to identify and nurture talent, encouraging students to think critically, respond quickly, and apply their knowledge creatively. From all participants, 20 outstanding students will be selected to form Team Sankalp.
          </p>
          <p>
            This event is designed to be more than just a competition. It is a platform for learning, collaboration, and intellectual growth. Get ready to think, compete, and excel!
          </p>
        </div>
      </div>

      <div className="cards">
        <article
          className="card"
          style={{
            backgroundImage:
              'linear-gradient(180deg, rgba(7,7,20,0.45), rgba(7,7,20,0.68)), url("https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=60")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            color: '#fff'
          }}
        >
          <h3>Technical Quiz — Campus Round</h3>
          <p className="muted">Timed quiz covering DS, Algo, Web and ML. Top 3 winners get team invites.</p>
          <div className="card-actions">
            <button className="btn-primary">Event Details</button>
            <button className="btn">Download Syllabus</button>
          </div>
        </article>

        <article
          className="card"
          style={{
            backgroundImage:
              'linear-gradient(180deg, rgba(7,7,20,0.45), rgba(7,7,20,0.68)), url("https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&w=1200&q=60")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            color: '#fff'
          }}
        >
          <h3>Project Showcase</h3>
          <p className="muted">Team members present projects; winners get mentorship and resources.</p>
          <div className="card-actions">
            <button className="btn-primary">View Projects</button>
            <button className="btn">Call for Entries</button>
          </div>
        </article>

        <article
          className="card"
          style={{
            backgroundImage:
              'linear-gradient(180deg, rgba(7,7,20,0.45), rgba(7,7,20,0.68)), url("https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=60")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            color: '#fff'
          }}
        >
          <h3>Workshops & Coding Sessions</h3>
          <p className="muted">Hands-on sessions on Web, ML, Cloud and competitive coding.</p>
          <div className="card-actions">
            <button className="btn-primary">Schedule</button>
            <button className="btn">Speakers</button>
          </div>
        </article>
      </div>
    </section>
  );
}