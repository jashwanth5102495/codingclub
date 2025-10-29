import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function TeamInfo() {
  const navigate = useNavigate();

  return (
    <main style={{ color: '#fff', backgroundColor: '#000', minHeight: '100vh' }}>
      <section className="section" aria-labelledby="teamInfoTitle" style={{ maxWidth: '980px', margin: '0 auto', padding: '24px' }}>
        <div className="section-title" style={{ textAlign: 'center' }}>
          <h2 id="teamInfoTitle">Team Anveshak — Information</h2>
          <div className="section-sub">Project context and contribution details</div>
        </div>

        <div style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))',
          border: '1px solid rgba(255,255,255,0.12)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          borderRadius: '14px',
          boxShadow: '0 16px 40px rgba(0,0,0,0.55)',
          padding: '16px',
          lineHeight: 1.7,
          color: '#e9f1ff',
          fontSize: '14px'
        }}>
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
        </div>

        <div style={{ marginTop: 24 }}>
          <h3>Team Members & Roles</h3>
          <ul className="credits-list" style={{ marginTop: 8, lineHeight: 1.8 }}>
            <li><strong>Team Lead:</strong> Jashwanth (MCA), Madhu Sudhan Reddy (BCA)</li>
            <li><strong>Project Architectural:</strong> Jashwanth</li>
            <li><strong>Base project creation:</strong> Purshottam V, Santhosh Gowda D A</li>
            <li><strong>Modern U.I enhancements and Animations:</strong> Jashwanth</li>
            <li><strong>Data Gathering:</strong> Sai Likitha, Sahana</li>
            <li><strong>Frontend styling:</strong> Aishwarya, Shaik.Thanaaz, Abhishek N</li>
            <li><strong>Deployment:</strong> Madhu Sudhan Reddy, Bharath Chowdary</li>
            <li><strong>Testing:</strong> Bharath Chowdary, Abhishek N, Sahil Irshad</li>
          </ul>
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
          <button className="btn-primary" onClick={() => navigate(-1)}>Back</button>
          <Link className="btn" to="/">Home</Link>
        </div>
      </section>
    </main>
  );
}