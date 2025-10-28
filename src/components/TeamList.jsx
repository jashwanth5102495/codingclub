import React, { useState } from 'react';
import './TeamList.css';

export default function TeamList() {
  // Map member names to public image paths
  const memberPhotos = {
    'Purshottam V': '/ab.png',
    'Bharath Chowdary': '/bh.jpg',
    'Santhosh Gowda D A': '/ps.png',
    'Sahana K': '/sa.png',
    'Shaik Thannaz': '/ta.png',
    'Aishwarya N': '/ash.png',
    // Unmapped names will fallback to initials
  };

  const teams = [
    {
      id: 1,
      name: 'team 1 Pratham',
      members: [
        'Purshottam V',
        'Bharath Chowdary',
        'Santhosh Gowda D A',
        'Sahana K',
        'Shaik Thannaz',
        'Sai Likitha P V',
        'Aishwarya N',
        'Abhishek N',
        'Sahil Irshad'
      ]
    },
    { id: 2, name: 'team 2', members: [] },
    { id: 3, name: 'team 3', members: [] },
    { id: 4, name: 'team 4', members: [] },
    { id: 5, name: 'team 5', members: [] }
  ];

  const [expandedTeamId, setExpandedTeamId] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);

  const toggleExpand = (id) => {
    setExpandedTeamId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="team-list" aria-label="Animated team list">
      <ul className="animated-list" role="list">
        {teams.map((team) => (
          <li key={team.id} className={`animated-list-item ${expandedTeamId === team.id ? 'active' : ''}`}>
            <button
              className="animated-list-button"
              onClick={() => toggleExpand(team.id)}
              aria-expanded={expandedTeamId === team.id}
              aria-controls={`team-panel-${team.id}`}
            >
              <span className="list-bullet" aria-hidden="true">•</span>
              <span className="list-label">{team.name}</span>
            </button>

            {team.id === 1 && (
              <div
                id={`team-panel-${team.id}`}
                className={`expand-panel ${expandedTeamId === team.id ? 'open' : ''}`}
                role="region"
                aria-live="polite"
                aria-label={`${team.name} members`}
              >
                <div className="members-grid">
                  {team.members.map((member, index) => {
                    const photo = memberPhotos[member] || null;
                    const initials = member
                      .split(' ')
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join('')
                      .toUpperCase();
                    return (
                      <div
                        key={member}
                        className="member-card"
                        style={{ animationDelay: `${index * 60}ms` }}
                        onClick={() => setSelectedMember({ name: member, photo, initials })}
                      >
                        <div className="member-card-inner">
                          {photo ? (
                            <img className="member-photo" src={photo} alt={`${member} photo`} />
                          ) : (
                            <div className="member-photo placeholder" aria-hidden="true">{initials}</div>
                          )}
                          <span className="member-name">{member}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>

      {selectedMember && (
        <div
          id="memberModal"
          className="cert-modal"
          aria-hidden={!selectedMember}
          onClick={(e) => e.target.id === 'memberModal' && setSelectedMember(null)}
        >
          <div className="cert-modal-inner" role="dialog" aria-modal="true">
            <button className="cert-close" onClick={() => setSelectedMember(null)} aria-label="Close">✕</button>
            {selectedMember.photo ? (
              <img
                src={selectedMember.photo}
                alt={`${selectedMember.name} photo`}
                style={{ width: 320, height: 320, objectFit: 'cover', borderRadius: 0 }}
              />
            ) : (
              <div
                style={{
                  width: 320,
                  height: 320,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                <span style={{ fontSize: 48, fontWeight: 800, color: '#fff' }}>{selectedMember.initials}</span>
              </div>
            )}
            <div className="muted" style={{ marginTop: 10, fontWeight: 700 }}>{selectedMember.name}</div>
            <div className="muted" style={{ marginTop: 6 }}>Click outside or ✕ to close</div>
          </div>
        </div>
      )}
    </div>
  );
}