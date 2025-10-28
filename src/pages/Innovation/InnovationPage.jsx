import React from 'react';
import './InnovationPage.css';
import Orb from './Orb.jsx';
import FuzzyText from '../../components/FuzzyText.jsx';
import LanyardCard from '../../components/LanyardCard.jsx';
import ScrollFloat from '../../components/ScrollFloat.jsx';
import TargetCursor from '../../components/TargetCursor.jsx';

import ScrambledText from '../../components/ScrambledText.jsx';
import TeamList from '../../components/TeamList.jsx';

export default function InnovationPage() {
  const items = [
    {
      image: 'https://picsum.photos/300/300?grayscale',
      link: 'https://google.com/',
      title: 'Item 1',
      description: 'This is pretty cool, right?'
    },
    {
      image: 'https://picsum.photos/400/400?grayscale',
      link: 'https://google.com/',
      title: 'Item 2',
      description: 'This is pretty cool, right?'
    },
    {
      image: 'https://picsum.photos/500/500?grayscale',
      link: 'https://google.com/',
      title: 'Item 3',
      description: 'This is pretty cool, right?'
    },
    {
      image: 'https://picsum.photos/600/600?grayscale',
      link: 'https://google.com/',
      title: 'Item 4',
      description: 'This is pretty cool, right?'
    }
  ];
  return (
    <div className="innovation-page innovation-page--new">
      <TargetCursor spinDuration={2} hideDefaultCursor={true} />
      <section className="innovation-welcome" aria-label="Welcome to Innovation Lab">
        <div className="innovation-hero-bg" style={{ position: 'relative', width: '100%', height: '100%' }}>
          <Orb hoverIntensity={0.5} rotateOnHover={true} hue={0} forceHoverState={false} />
          <div className="hyperspeed-overlay">
            <FuzzyText className="welcome-text" fontWeight={900} enableHover={true} baseIntensity={0.2} hoverIntensity={0.5} fontFamily="Figtree">
              Welcome To Innovation Lab
            </FuzzyText>
          </div>
        </div>
      </section>

      <section className="orb-info-section" aria-label="About Innovation Lab">
        <div className="orb-info-left">
          <p>
            The journey of Innovation Lab 2025 began with the visionary support and encouragement of Mr. Naveen, Head of the Department, and the dedicated faculty members who believed in creating a platform where students could explore, learn, and grow beyond traditional academics. Their continuous motivation and guidance laid the foundation for a space that nurtures innovation, collaboration, and technical excellence.
          </p>
          <p>
            Under the guidance of faculty coordinators Mr. Shashidhar, Mr. Abhishek  S R and , the initiative gained strong direction and structure, ensuring that every idea was supported with the right mentorship and resources. Their efforts played a vital role in shaping the lab into a hub of creativity and learning.
          </p>
          <p>
            Inspired by this vision, two passionate students — Jashwanth (MCA – 1st Year) and Madhu Sudhan Reddy (BCA – 3rd Year) — took the initiative to bring the idea to life. They organized a Hackathon designed to enhance students’ technical exposure and ignite their creative potential.
          </p>
          <p>
            What began as a single event soon evolved into a learning movement, where every participant, regardless of their experience level, gained the confidence to code, build, and innovate. Jashwanth and Madhu Sudhan’s dedication, combined with the unwavering support of the faculty, coordinators, and HOD, gave birth to what we now proudly call Innovation Lab 2025 — a true hub for future innovators and problem-solvers.
          </p>
        </div>
        <div className="orb-info-right">
          <LanyardCard className="cursor-target" name="Mr. Shashidhar" role="Faculty Coordinator" department="Innovation Lab" photoSrc="/sh.png" />
          <LanyardCard className="cursor-target" name="Mr. Abhishek S R" role="Faculty Coordinator" department="Innovation Lab" />
          <LanyardCard className="cursor-target" name="Jashwanth" role="Student Coordinator" department="Innovation Lab" photoSrc="/jashwanth.png" />
          <LanyardCard className="cursor-target" name="Madhu Sudhan Reddy" role="Volunteer" department="Innovation Lab" photoSrc="/md.png" />
        </div>
      </section>

      <section className="team-section" aria-label="Team Pratham">
        <div className="team-header">
          <ScrambledText
            className="scrambled-team"
            radius={100}
            duration={1.2}
            speed={0.5}
            scrambleChars=":."
          >
            Team Pratham
          </ScrambledText>
        </div>
        <div className="team-content">
          <div className="team-left centered">
            <p className="team-text">
              After the day of coding, creativity, and collaboration, the Hackathon results were announced on 12th September 2025. From this event, a team of nine talented students emerged — forming Team Pratham, symbolizing “the first step toward excellence.”
            </p>
            <p className="team-text">
              Team Pratham became a symbol of determination, teamwork, and learning. Under the mentorship of Jashwanth and Madhu Sudhan, the team held sessions every Monday and Wednesday, learning to write clean code, debug efficiently, and collaborate effectively on projects.
            </p>
            <TeamList />
          </div>
        </div>
      </section>
    </div>
  );
}