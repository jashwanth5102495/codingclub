import React, { useState } from 'react';
import './TeamList.css';

export default function TeamList() {
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
                  {team.members.map((member, index) => (
                    <div key={member} className="member-card" style={{ animationDelay: `${index * 60}ms` }}>
                      <div className="member-card-inner">
                        <span className="member-name">{member}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}