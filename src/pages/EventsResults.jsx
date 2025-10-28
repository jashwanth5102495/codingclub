import React, { useState } from 'react';

export default function EventsResults() {
  const [eventModal, setEventModal] = useState(null);
  const openEventModal = (title, details) => setEventModal({ title, details });
  const closeEventModal = () => setEventModal(null);

  return (
    <main className="events-results" aria-label="Events and Results">
      <section className="section" aria-labelledby="eventsTitle">
        <div className="section-title">
          <h2 id="eventsTitle">Upcoming Events</h2>
          <div className="section-sub">Latest campus tech events and activities.</div>
        </div>
        <div className="cards">
          <article className="card" style={{ color: '#fff', backgroundImage: 'linear-gradient(180deg, rgba(7,7,20,0.45), rgba(7,7,20,0.68)), url("https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=60")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <h3>Technical Quiz — Campus Round</h3>
            <p className="muted">Timed quiz covering DS, Algo, Web and ML. Top performers get team invites.</p>
            <div className="card-actions">
              <button className="btn-primary" onClick={() => openEventModal('Technical Quiz — Campus Round', 'Starts at 2 pm and ends at 4 pm. This event is conducted for shortlisting students for the Innovation Lab (coding club). Expect rounds focused on DS, Algorithms, Web, and ML. Bring your A-game!')}>Event Details</button>
              <button className="btn" onClick={() => document.getElementById('resultsTitle')?.scrollIntoView({ behavior: 'smooth' })}>Results</button>
            </div>
          </article>
          <article className="card" style={{ color: '#fff', backgroundImage: 'linear-gradient(180deg, rgba(7,7,20,0.45), rgba(7,7,20,0.68)), url("https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&w=1200&q=60")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <h3>Gaming</h3>
            <p className="muted">Upcoming in December. Details are not finalized yet — stay tuned.</p>
            <div className="card-actions">
              <button className="btn-primary" onClick={() => openEventModal('Gaming — December', 'This event is upcoming in December. Details are not finalized yet. We will publish the full format, rules, and registration info soon.')}>Event Details</button>
              <button className="btn">Call for Entries</button>
            </div>
          </article>
        </div>
      </section>

      <section className="section" aria-labelledby="resultsTitle">
        <div className="section-title">
          <h2 id="resultsTitle">Results</h2>
          <div className="section-sub">Winners and highlights from recent events.</div>
        </div>
        <div className="cert-grid">
          <div className="cert" tabIndex={0}>
            <img src="/cer1.jpg" alt="Winner Certificate" />
            <div className="cert-title"><strong>Winner Certificate — Sep 2025</strong></div>
          </div>
          <div className="cert" tabIndex={0}>
            <img src="/cer2.jpg" alt="Participation Certificate" />
            <div className="cert-title"><strong>Participation — Aug 2025</strong></div>
          </div>
          <div className="cert" tabIndex={0}>
            <img src="/cer3.jpg" alt="Mentor Certificate" />
            <div className="cert-title"><strong>Mentor Certificate</strong></div>
          </div>
        </div>
      </section>

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
    </main>
  );
}