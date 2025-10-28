import React, { useState } from 'react';

export default function Events() {
  const [eventModal, setEventModal] = useState(null);
  const openEventModal = (title, details) => setEventModal({ title, details });
  const closeEventModal = () => setEventModal(null);

  return (
    <section id="events" aria-labelledby="eventsTitle">
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
            <button className="btn-primary" onClick={() => openEventModal('Technical Quiz — Campus Round', 'Starts at 2 pm and ends at 4 pm. This event is conducted for shortlisting students for the Innovation Lab (coding club). Expect rounds focused on DS, Algorithms, Web, and ML. Bring your A-game!')}>Event Details</button>
            <button className="btn" onClick={() => document.getElementById('certTitle')?.scrollIntoView({ behavior: 'smooth' })}>Results</button>
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
          <h3>Gaming</h3>
          <p className="muted">Upcoming in December. Details are not finalized yet — stay tuned.</p>
          <div className="card-actions">
            <button className="btn-primary" onClick={() => openEventModal('Gaming — December', 'This event is upcoming in December. Details are not finalized yet. We will publish the full format, rules, and registration info soon.')}>Event Details</button>
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

      {eventModal && (
        <div id="eventModal" className="cert-modal" aria-hidden={!eventModal} onClick={(e) => e.target.id === 'eventModal' && closeEventModal()}>
          <div className="cert-modal-inner" role="dialog" aria-modal="true">
            <button className="cert-close" onClick={closeEventModal} aria-label="Close">✕</button>
            <h3 style={{ marginBottom: 8 }}>{eventModal.title}</h3>
            <p className="muted" style={{ maxWidth: 640 }}>{eventModal.details}</p>
            <div className="muted" style={{ marginTop: 10 }}>Click outside or ✕ to close</div>
          </div>
        </div>
      )}
    </section>
  );
}