import React from 'react';
import './InnovationPage.css';
import Orb from './Orb.jsx';
import FuzzyText from '../../components/FuzzyText.jsx';
import LanyardCard from '../../components/LanyardCard.jsx';
import ScrollFloat from '../../components/ScrollFloat.jsx';
import InfiniteMenu from '../../components/InfiniteMenu.jsx';
import ScrambledText from '../../components/ScrambledText.jsx';

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
            The foundation of Innovation Lab 2025 was made possible through the visionary guidance of Mr. Naveen, Head of the Department, and the constant support of the dedicated faculty members, who encouraged the creation of a platform that empowers students to explore and innovate. Inspired by their mentorship, Jashwanth (MCA – 1st Year) and Madhu Sudhan Reddy (BCA – 3rd Year) transformed this vision into reality by organizing a Hackathon aimed at enhancing students’ technical exposure and creativity. Their initiative went beyond competition—it ignited a learning culture that inspired students to build confidently, collaborate effectively, and embrace innovation.
          </p>
        </div>
        <div className="orb-info-right">
          <LanyardCard name="Student Coordinator" role="Coordinator" department="Innovation Lab" />
          <LanyardCard name="Volunteer" role="Volunteer" department="Innovation Lab" />
        </div>
      </section>

      <section className="team-section" aria-label="Team Parthum">
        <div className="team-header">
          <ScrambledText
            className="scrambled-team"
            radius={100}
            duration={1.2}
            speed={0.5}
            scrambleChars=".:"
          >
            Team Parthum
          </ScrambledText>
        </div>
        <div className="team-content">
          <div className="team-left">
            <ScrambledText
              className="scrambled-paragraph"
              radius={90}
              duration={1.1}
              speed={0.6}
              scrambleChars=".:,;+-="
            >
              After the day of coding, creativity, and collaboration, the Hackathon results were announced on 12th September 2025. From this event, a team of nine talented students emerged — forming Team Pratham, symbolizing “the first step toward excellence.”
            </ScrambledText>
            <ScrambledText
              className="scrambled-paragraph"
              radius={90}
              duration={1.1}
              speed={0.6}
              scrambleChars=".:,;+-="
            >
              Team Pratham became a symbol of determination, teamwork, and learning. Under the mentorship of Jashwanth and Madhu Sudhan, the team held sessions every Monday and Wednesday, learning to write clean code, debug efficiently, and collaborate effectively on projects.
            </ScrambledText>
          </div>
          <div className="team-right">
            <div style={{ height: '600px', position: 'relative' }}>
              <InfiniteMenu items={items} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}