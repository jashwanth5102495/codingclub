import React, { useState } from 'react';
import './TeamList.css';

export default function TeamList() {
  // Map member names to public image paths
  const memberPhotos = {
    'Purshottam V': '/ab.png',
    'Bharath Chowdary': '/bh.jpg',
    'Santhosh Gowda D A': '/ps.png',
    'Sahana K': '/sa.png',
    'Shaik Thanaaz': '/ta.png',
    'Aishwarya N': '/ash.png',
    'Abhishek N': '/ab1.png',
    'Sahil Irshad': '/ka.png',
    'Mr. Abhishek S R': '/absir.png',
    'Mr. Abhishek S R Faculty Coordinator': '/absir.png',
    'Sai Likitha P V': '/li.png',
    'Jashwanth': '/jashwanth.png',
      'Madhu Sudhan Reddy': '/md.png',
      // Unmapped names will fallback to initials
  };

  // Detailed profiles for selected members
  const profiles = {
    'Sahana K': (
      <div>
        <p>Hey there, I am Sahana! A passionate and purpose-driven BCA (Data Science) student at Akash Global College of Management and Science, with a strong foundation in programming, web development, and data science.</p>
        <p>Inspired by real-world stories of transformation through technology, I am committed to using my skills to create meaningful impact—especially in underserved communities. I thrive in collaborative environments, embrace challenges, and am always eager to explore emerging technologies like Artificial Intelligence and Machine Learning.</p>
        <h4 style={{marginTop:12}}>Technical Skills</h4>
        <ul>
          <li>Programming: Python, HTML, CSS, JavaScript (basic)</li>
          <li>Web Development: Responsive website design, front-end projects</li>
          <li>Cloud & DevOps: AWS basics</li>
          <li>Prompt Engineering: JSON-based prompt design, structured prompt workflows</li>
          <li>Data Science: Kaggle (certified), data analysis, ML basics</li>
          <li>Tools & Platforms: GitHub, Excel, Visual Studio Code</li>
          <li>Soft Skills: Communication, teamwork, time management</li>
        </ul>
        <h4 style={{marginTop:12}}>Education</h4>
        <ul>
          <li>BCA – Specialization in Data Science (Akash Global College of Management and Science)</li>
          <li>Front-End Development – Currently pursuing specialized training</li>
        </ul>
        <h4 style={{marginTop:12}}>Certifications</h4>
        <ul>
          <li>Data Science – Kaggle</li>
          <li>Python – Coursera</li>
          <li>AI & ML Fundamentals – Self-paced learning and project-based experience</li>
        </ul>
        <h4 style={{marginTop:12}}>Projects & Experiences</h4>
        <ul>
          <li>GREEN STREAK – Ideated and led a project during the IKP EDEN Ideathon to raise awareness about carbon footprints and their impact on rural healthcare.</li>
          <li>Arogya Seva x MIT Bootcamp – Collaborated on climate-health tech solutions, enhancing communication and cross-disciplinary teamwork.</li>
          <li>Website Development – Built multiple responsive websites as part of coursework and personal projects.</li>
        </ul>
        <h4 style={{marginTop:12}}>Hackathons & Events</h4>
        <ul>
          <li>IIT Bombay E-Summit – Participated in national-level tech discussions and innovation showcases.</li>
          <li>IKP EDEN Hackathon – Ideated and executed a socially impactful tech solution.</li>
          <li>College Tech Events – Active participant and volunteer in various tech fests and coding competitions.</li>
        </ul>
        <h4 style={{marginTop:12}}>Core Strengths</h4>
        <ul>
          <li>Deep curiosity for emerging technologies and their societal impact</li>
          <li>Resilience in the face of challenges and a proactive learner</li>
          <li>Strong organizational and planning skills with a methodical approach</li>
        </ul>
        <h4 style={{marginTop:12}}>Contact</h4>
        <ul>
          <li>Email: gksahana0@gmail.com</li>
          <li>LinkedIn: Sahana Konangi</li>
        </ul>
      </div>
    ),
    'Santhosh Gowda D A': (
      <div>
        <p>Santhosh Gowda D A — Aspiring Cybersecurity Analyst | SOC Analyst | Tech Enthusiast</p>
        <p>Akash Global College of Management and Science, affiliated with Bangalore City University, Bengaluru</p>
        <h4 style={{marginTop:12}}>Profile Summary</h4>
        <p>I’m a dedicated BCA student specializing in Cybersecurity and Ethical Hacking, passionate about protecting digital systems and exploring advanced security solutions. Curious by nature and detail-oriented, I’m driven to build a strong foundation in Security Operations (SOC) and threat analysis.</p>
        <p>I aim to grow into a cybersecurity professional capable of detecting, analyzing, and mitigating evolving cyber threats through innovation and ethical practices.</p>
        <h4 style={{marginTop:12}}>Technical Skills</h4>
        <ul>
          <li>Programming Languages: C, Python</li>
          <li>Web Technologies: HTML, CSS</li>
          <li>Cybersecurity Tools: Nmap, Wireshark, Burp Suite, Kali Linux</li>
          <li>Operating Systems: Windows, Linux</li>
          <li>Other Skills: Networking Basics, SOC Monitoring, Git & GitHub</li>
        </ul>
        <h4 style={{marginTop:12}}>Strengths</h4>
        <ul>
          <li>Analytical thinker with strong logical and problem-solving abilities</li>
          <li>Quick learner with adaptability to new technologies</li>
          <li>Effective communicator and collaborative team player</li>
          <li>Strong sense of discipline and attention to detail</li>
          <li>Passionate about continuous learning and cyber defense</li>
        </ul>
        <h4 style={{marginTop:12}}>Achievements & Certifications</h4>
        <ul>
          <li>NPTEL: Cybersecurity and Privacy (2025)</li>
          <li>Jasnav Frontend Beginners Course (In progress)</li>
          <li>Innovation Lab Member: Contributed to multiple real-world tech projects</li>
          <li>Hackathon Participation: Engaged in cybersecurity and AI-based challenges</li>
        </ul>
        <h4 style={{marginTop:12}}>Education</h4>
        <ul>
          <li>BCA — Cybersecurity & Ethical Hacking Specialization</li>
          <li>Akash Global College of Management and Science (Affiliated with Bangalore City University)</li>
        </ul>
        <h4 style={{marginTop:12}}>Interests</h4>
        <ul>
          <li>Security Operations and Incident Response</li>
          <li>Threat Detection and Analysis</li>
          <li>Cyber defense automation</li>
          <li>Web development and front-end projects</li>
        </ul>
        <h4 style={{marginTop:12}}>Contact</h4>
        <ul>
          <li>Phone: 9986797021</li>
          <li>Email: santhoshgowdada@gmail.com</li>
        </ul>
      </div>
    ),
    'Purshottam V': (
      <div>
        <h3>BCA Student ¦ Aspiring Developer ¦ AI & Frontend Enthusiast</h3>
        <h4 style={{marginTop:12}}>Introduction</h4>
        <p>I’m Purshottam V, a passionate BCA student with a deep interest in Artificial Intelligence and Frontend Development. I enjoy blending creativity with technology to build intelligent, user-friendly, and impactful solutions. I’m constantly learning and experimenting with modern tools like prompt engineering and AI-based interfaces to push the limits of innovation. With a curious and growth-oriented mindset, I believe in continuous learning through hands-on experience and collaboration. My goal is to develop scalable, efficient, and smart solutions that create real-world impact.</p>
        <h4 style={{marginTop:12}}>Technical Skills</h4>
        <ul>
          <li>AI Tools & Prompt Engineering: Claude AI CLI, Prompt Engineering, JSON Prompts, Frontend with Prompt Integration</li>
          <li>AI Art & Image Generation: Image generation with accuracy and control</li>
          <li>Cloud & OS Basics: AWS basics, Linux commands</li>
          <li>Web Development: HTML, CSS, JavaScript (exploring advanced frameworks)</li>
        </ul>
        <h4 style={{marginTop:12}}>Soft Skills</h4>
        <ul>
          <li>Strong communication and teamwork</li>
          <li>Creative problem-solving and analytical thinking</li>
          <li>Adaptability and continuous learning</li>
          <li>Effective time and project management</li>
          <li>Leadership and initiative in technical collaboration</li>
        </ul>
        <h4 style={{marginTop:12}}>Achievements & Activities</h4>
        <ul>
          <li>Certified in Generative AI Fundamentals</li>
          <li>Active hackathon participant, developing innovative AI-based ideas</li>
          <li>Contributor to college tech initiatives and collaborative student projects</li>
          <li>Exploring AI-driven web solutions using prompt engineering and automation</li>
        </ul>
        <h4 style={{marginTop:12}}>Education</h4>
        <ul>
          <li>BCA (AI-ML Specialisation)</li>
          <li>Jasnav Frontend Beginners Course (In progress)</li>
        </ul>
        <h4 style={{marginTop:12}}>Beyond Tech</h4>
        <ul>
          <li>Reading thought-provoking books and articles</li>
          <li>Experimenting with design and UI concepts</li>
          <li>Listening to music for inspiration and relaxation</li>
          <li>Exploring psychology and human behavior</li>
        </ul>
        <h4 style={{marginTop:12}}>Contact</h4>
        <ul>
          <li>Email: vcpurshotham@gmail.com</li>
          <li>LinkedIn: Purshottam V</li>
        </ul>
      </div>
    ),
    'Aishwarya N': (
      <div>
        <h3>BCA Student | Aspiring Developer | AI & Frontend Enthusiast</h3>
        <h4 style={{marginTop:12}}>Introduction</h4>
        <p>Hi! I’m Aishwarya N., a passionate BCA 2nd-year student who loves exploring technology and coding. I enjoy understanding how things work behind the screen and transforming ideas into real, working projects. I believe in learning by doing — every small project helps me grow a little more. I adapt quickly, enjoy challenges, and value teamwork as much as individual growth.</p>
        <h4 style={{marginTop:12}}>Technical Interests & Skills</h4>
        <ul>
          <li>Programming Languages: C, Python</li>
          <li>Frontend Tools (in progress): HTML, CSS, JavaScript</li>
          <li>Areas of Interest: Artificial Intelligence, creative coding, and building simple user-focused applications</li>
        </ul>
        <h4 style={{marginTop:12}}>Technical Skills (under progress)</h4>
        <ul>
          <li>Cloud & Infra: AWS (Lambda, S3, ECS), Terraform, serverless automation with Claudia.js</li>
          <li>AI & ML Systems: Edge-AI orchestration, model distillation/quantization, explainable AI, vector DBs (Pinecone, Weaviate)</li>
          <li>Agent & Prompt Engineering: Multi-step AI agents using LangChain and AutoGPT</li>
          <li>DevOps & Security: Kubernetes operators, container hardening (Trivy, Falco), DevSecOps workflows</li>
          <li>Linux & Command Line: Bash/Zsh scripting, regex engineering, JSON/jq-based automation</li>
          <li>Reverse Engineering & Network Analysis: Exploring Ghidra, gdb, eBPF scripting, packet decoding</li>
          <li>Synthetic Data & Automation: Designing synthetic data pipelines and semantic search systems</li>
        </ul>
        <h4 style={{marginTop:12}}>Achievements & Activities</h4>
        <ul>
          <li>Certified in: AI with Python</li>
          <li>Hackathons: Actively participated in college hackathons, experimenting with AI-based solutions</li>
          <li>Tech Team Member: Active contributor to college tech team and events</li>
          <li>Academic Standing: Consistent performance with good academic results</li>
        </ul>
        <h4 style={{marginTop:12}}>Personal Qualities</h4>
        <ul>
          <li>Clear, confident communicator — comfortable sharing ideas and explaining concepts</li>
          <li>Balanced leadership and collaboration — guides teams and supports peers</li>
          <li>Fast learner with adaptability to new tasks and environments</li>
          <li>Positive, organized, and open to feedback</li>
        </ul>
        <h4 style={{marginTop:12}}>Beyond Tech</h4>
        <ul>
          <li>Dancing — favorite way to express and refresh</li>
          <li>Reading — books that inspire imagination and learning</li>
          <li>Watching classic films — drawn to timeless stories</li>
          <li>Learning piano — currently most excited about!</li>
        </ul>
        <h4 style={{marginTop:12}}>Contact</h4>
        <ul>
          <li>Email: siyaadya119@gmail.com</li>
        </ul>
      </div>
    ),
    'Abhishek N': (
      <div>
        <h3>Hey, I’m Abhishek!</h3>
        <p>I’m a curious creator and tech explorer passionate about building intelligent, secure, and beautifully designed digital experiences. Technology isn’t just something I study — it’s how I express ideas and solve real-world problems. I enjoy blending programming, AI, ML, and design thinking to create tools that make everyday life smarter, faster, and more meaningful.</p>
        <p>Currently, I’m pursuing a BCA in Artificial Intelligence &amp; Machine Learning at Akash Institute (BNU), where I’m sharpening my skills in coding, design, and automation. Alongside my studies, I’m completing the Jasnav Frontend Beginners Course, mastering the fundamentals of HTML, CSS, JavaScript, Python and responsive web design to strengthen my foundation as a full-stack developer.</p>
        <p>My long-term goal is to build a tech solutions company that brings together innovation, design, and security — shaping technology that works for people, not just with them.</p>
        <h4 style={{marginTop:12}}>Technical Skills</h4>
        <h5>Frontend &amp; Web Development</h5>
        <ul>
          <li>HTML5, CSS3, JavaScript (ES6+)</li>
          <li>Canvas (Basics) – Interactive graphics and animations</li>
          <li>Responsive Web Design &amp; Modern UI Principles</li>
          <li>UI/UX Design – Color Psychology, Wireframing, Layout Strategy</li>
          <li>Figma (Basics) – Prototyping and design workflows</li>
          <li>JSON (Basics) – Data structuring and API integration</li>
        </ul>
        <h5>Programming &amp; AI Basics</h5>
        <ul>
          <li>C, C++, Python – Fundamental programming and problem-solving</li>
          <li>NumPy – Efficient numerical computations and data manipulation</li>
          <li>Prompt Engineering – Designing and optimizing AI/LLM prompts</li>
          <li>Basics of Training LLMs – Understanding datasets, fine-tuning, and prompt optimization</li>
        </ul>
        <h4 style={{marginTop:12}}>System &amp; Tools</h4>
        <ul>
          <li>Basics of Linux – Command-line navigation and file handling</li>
          <li>Git &amp; GitHub – Version control and collaboration</li>
          <li>AWS (Basics) – Cloud deployment and hosting fundamentals</li>
          <li>VS Code – Development and debugging</li>
          <li>Web Hosting – Deploying sites using free and paid services</li>
        </ul>
        <h4 style={{marginTop:12}}>Core Strengths</h4>
        <ul>
          <li>Analytical, creative, and adaptable mindset</li>
          <li>Quick learner with a passion for innovation</li>
          <li>Strong communication and collaboration skills</li>
          <li>Balanced focus on aesthetics, usability, and functionality</li>
        </ul>
        <h4 style={{marginTop:12}}>Education &amp; Certifications</h4>
        <ul>
          <li>BCA (AI &amp; ML) — Bengaluru North University</li>
          <li>Jasnav Frontend Beginners Course (In Progress)</li>
          <li>Active participant in tech events, hackathons, and innovation workshops</li>
        </ul>
        <h4 style={{marginTop:12}}>Beyond Code</h4>
        <ul>
          <li>Researching watches and automobiles</li>
          <li>Exploring psychology, finance, and Vedic astrology</li>
          <li>Listening to inspiring music and learning new skills daily</li>
          <li>Thinking deeply regarding innovation</li>
        </ul>
        <h4 style={{marginTop:12}}>Contact</h4>
        <ul>
          <li>Email: <a href="mailto:abhishek27127@gmail.com">abhishek27127@gmail.com</a></li>
        </ul>
      </div>
    ),
    'Sahil Irshad': (
      <div>
        <h3>Crafting Ideas, Shaping the Digital Future</h3>
        <p>Hailing from Srinagar, Kashmir</p>
        <h4 style={{marginTop:12}}>Professional Summary</h4>
        <p>Curious and creative tech enthusiast with advanced Python skills, passionate about blending AI, frontend development, and UI/UX design to build intelligent, user-centered digital experiences. Dedicated to turning innovative ideas into practical digital solutions, combining creativity, technical expertise, and attention to detail.</p>
        <h4 style={{marginTop:12}}>Education</h4>
        <ul>
          <li>Bachelor of Computer Applications (BCA) – Specialization in Artificial Intelligence and Machine Learning</li>
          <li>Akash Institute of Management and Science – Devanahalli, Bangalore 562110</li>
        </ul>
        <h4 style={{marginTop:12}}>Key Interests</h4>
        <ul>
          <li>Frontend Development</li>
          <li>Artificial Intelligence & Machine Learning</li>
          <li>Web Design & UI/UX</li>
          <li>Data Analytics</li>
        </ul>
        <h4 style={{marginTop:12}}>Technical Skills</h4>
        <ul>
          <li>Python (Proficient) – Advanced programming, data analysis, automation, and scripting</li>
          <li>C, C++ – Fundamental programming and problem-solving</li>
          <li>AI/ML Tools: TensorFlow (basic), Scikit-learn, Pandas, NumPy</li>
          <li>HTML5, CSS3, JavaScript (ES6+)</li>
          <li>Canvas API – Interactive graphics, animations, and visualizations</li>
          <li>Responsive Web Design & Modern UI Principles</li>
          <li>UI/UX Design – Color Psychology, Wireframing, Layout Strategy</li>
          <li>Figma (Basics) – Prototyping and design-to-code workflows</li>
          <li>JSON – Data structuring and API integration</li>
        </ul>
        <h4 style={{marginTop:12}}>System & Tools</h4>
        <ul>
          <li>VS Code – Development, debugging, and project management</li>
          <li>Git & GitHub – Version control and collaboration</li>
          <li>macOS Proficiency – Navigating, managing, and optimizing workflows</li>
        </ul>
        <h4 style={{marginTop:12}}>Certifications</h4>
        <ul>
          <li>Pursuing Frontend Development Course – Jasnav.co.in (In Progress)</li>
        </ul>
        <h4 style={{marginTop:12}}>Projects</h4>
        <ul>
          <li>Anonymous Polling System – Secure, anonymous voting for 100+ users with real-time result analysis</li>
          <li>Face Detection App – Real-time face detection using OpenCV and Python</li>
          <li>Weather Website – Interactive web app fetching real-time data from open APIs</li>
          <li>Slideshow Maker – Responsive slideshow generator for visually engaging displays</li>
        </ul>
        <h4 style={{marginTop:12}}>Personal Qualities / Core Strengths</h4>
        <ul>
          <li>Innovative mindset with strong analytical and creative problem-solving skills</li>
          <li>Quick learner with a growth-oriented attitude</li>
          <li>Excellent communication and teamwork abilities</li>
          <li>Detail-focused and organized with a passion for high-quality execution</li>
        </ul>
        <h4 style={{marginTop:12}}>Beyond Tech</h4>
        <ul>
          <li>Represented Srinagar U-19 Cricket Team at the state level</li>
          <li>Sneaker culture enthusiast – tracking latest trends and collections</li>
          <li>Grooming & personal style – polished and professional appearance</li>
          <li>Avid music listener who finds creativity in rhythm and melody</li>
          <li>Believes in balance — coding with focus, living with purpose</li>
        </ul>
        <h4 style={{marginTop:12}}>Contact</h4>
        <ul>
          <li>Email: shahsahil607u@gmail.com</li>
        </ul>
      </div>
    ),
    'Shaik Thanaaz': (
      <div>
        <h3>BCA Student | Aspiring Developer | AI & Frontend Enthusiast</h3>
        <h4 style={{marginTop:12}}>Introduction</h4>
        <p>I’m Shaik Thanaaz, a passionate BCA 2nd-year student and enthusiastic learner specializing in Artificial Intelligence and Machine Learning. I’m deeply interested in exploring how technology can be applied to build intelligent, efficient, and impactful solutions. Curious and motivated by nature, I believe in continuous growth through learning and hands-on experience. I value creativity, innovation, and dedication, and I’m always eager to expand my knowledge in technology.</p>
        <p>My goal is to build a strong technical foundation and apply my learning to innovative, real-world projects that make a difference. I’m a detail-oriented and self-driven individual, committed to lifelong learning and growth in the tech domain.</p>
        <h4 style={{marginTop:12}}>Technical Interests & Skills</h4>
        <ul>
          <li>Programming Languages: C, Python</li>
          <li>Frontend Development: HTML, CSS, JavaScript (currently exploring), portfoliocanvas (basics)</li>
          <li>Soft Skills: Communication, Teamwork, Time Management, Presentation skills</li>
          <li>Technical & Cloud Basics: AWS Basics, Basic Linux commands, Git and GitHub</li>
          <li>Areas of Interest: Artificial Intelligence, Web Development, Responsive Website Design, Front-End Projects</li>
          <li>Artificial Intelligence & Prompt Engineering: Claude AI CLI, Front-end with Prompt Engineering</li>
          <li>Web Hosting: Deploying websites using free and paid hosting services</li>
        </ul>
        <h4 style={{marginTop:12}}>Strengths</h4>
        <ul>
          <li>Quick learner and adaptable to new technologies</li>
          <li>Strong analytical and logical thinking</li>
          <li>Good problem-solving abilities</li>
          <li>Self-motivated and goal-oriented</li>
          <li>Positive attitude with a passion for learning</li>
          <li>Effective time management and organizational skills</li>
        </ul>
        <h4 style={{marginTop:12}}>Achievements & Activities</h4>
        <ul>
          <li>Certified in: The Fundamentals of Generative AI (by GUVI)</li>
          <li>Azure AI Magic (by Microsoft Learn)</li>
          <li>Hackathon Participation: Actively participated in college hackathons, experimenting with AI-based solutions</li>
          <li>Tech Team Member: Active contributor to the college tech team, collaborating on technical and event-based initiatives</li>
        </ul>
        <h4 style={{marginTop:12}}>Education</h4>
        <ul>
          <li>BCA (AI-ML Specialisation)</li>
          <li>Jasnav Frontend Beginners course (In progress)</li>
        </ul>
        <h4 style={{marginTop:12}}>Beyond Tech</h4>
        <ul>
          <li>Reading books — stories and ideas that expand perspective and spark imagination</li>
          <li>Exploring new things — places, concepts, skills; discovering the unknown</li>
          <li>Listening to music — a way to relax, reflect, and stay inspired</li>
          <li>Interest in psychology — fascinated by how the mind works and how emotions shape who we are</li>
        </ul>
        <h4 style={{marginTop:12}}>Contact</h4>
        <ul>
          <li>Email: skthanaaz@gmail.com</li>
          <li>LinkedIn: Thanaaz Shaik</li>
        </ul>
      </div>
    ),
    'Jashwanth': (
      <div>
        <h3>Student Coordinator | Tech Enthusiast | Startup Builder</h3>
        <p>Hey there, I'm Jashwanth! I’m a passionate tech enthusiast driven by curiosity, creativity, and innovation. I love exploring the latest technologies from OpenAI, NVIDIA, Amazon, Google, and Meta, and staying up to date with new AI tools.</p>
        <p>I’m deeply fascinated by Artificial Intelligence — I explore, build, and experiment with AI agents that simplify life and make everyday routines more efficient. I actively use AI to automate my daily workflow and enhance productivity wherever possible.</p>
        <p>I currently own and manage two startups, continuously building, experimenting, and learning something new every day.</p>
        <h4 style={{marginTop:12}}>Skills &amp; Expertise</h4>
        <ul>
          <li>Vibe Coding — blending creativity with clean, powerful code</li>
          <li>DevOps Tools — automation, CI/CD, and deployment workflows</li>
          <li>Networking Tools — Wireshark, Nmap</li>
          <li>Penetration Testing Tools — ethical hacking, vulnerability assessment</li>
          <li>Cisco Packet Tracer — network simulation and configuration</li>
        </ul>
        <h4 style={{marginTop:12}}>Personal Qualities</h4>
        <ul>
          <li>Strong leadership and team collaboration</li>
          <li>Quick learner with an adaptive mindset</li>
          <li>Excellent communication and interpersonal skills</li>
        </ul>
        <h4 style={{marginTop:12}}>Certifications</h4>
        <ul>
          <li>Ethical Hacking — Cisco Networking Academy</li>
          <li>ISC2 Candidate</li>
          <li>Cybersecurity Job Simulation — Mastercard (via Forage)</li>
          <li>Introduction to Cybersecurity — Cisco</li>
        </ul>
        <h4 style={{marginTop:12}}>Activities</h4>
        <p>I actively participate in workshops at Indian institutions and often organize technical events at my college to share knowledge, inspire innovation, and help others grow.</p>
        <h4 style={{marginTop:12}}>Contact</h4>
        <ul>
          <li>Email: <a href="mailto:jashwanth5012495@gmail.com">jashwanth5012495@gmail.com</a></li>
        </ul>
        <h4 style={{marginTop:12}}>Beyond Tech</h4>
        <ul>
          <li>Swimming</li>
          <li>Skating</li>
          <li>Playing tennis and badminton</li>
          <li>Listening to Hollywood pop music</li>
          <li>Building cool things with good vibes and positive energy</li>
        </ul>
      </div>
    ),
    'Madhu Sudhan Reddy': (
      <div>
        <h3>MADHU SUDHAN REDDY — Debugging Limits. Deploying Dreams.</h3>
        <p>I am Madhu Sudhan Reddy, a passionate and result-oriented technology enthusiast with strong interests in Artificial Intelligence, Data Analytics, Web Development, and Marketing. I thrive on transforming ideas into impactful solutions through creativity, logic, and innovation. With a drive for continuous learning and a keen eye for efficiency, I aim to bridge the gap between data, design, and decision-making.</p>
        <h4 style={{marginTop:12}}>Skills &amp; Tools</h4>
        <h5>Programming &amp; Development</h5>
        <ul>
          <li>Python, HTML, CSS, JavaScript, React JS</li>
          <li>Frontend Development using AI prompts, Vibe Coding</li>
        </ul>
        <h5>Data &amp; Visualization</h5>
        <ul>
          <li>Power BI, MS Excel</li>
          <li>Basic Automation, Logical Thinking</li>
        </ul>
        <h5>Software &amp; Platforms</h5>
        <ul>
          <li>VS Code, MS Office Suite</li>
          <li>Basic Linux, Git/GitHub</li>
        </ul>
        <h5>AI Tools &amp; Prompt Engineering</h5>
        <ul>
          <li>ChatGPT, Gemini, Perplexity, GitHub Copilot</li>
          <li>Prompt Engineering, JSON Prompts</li>
          <li>AI Integration using APIs, Image Generation using AI tools</li>
        </ul>
        <h5>Project &amp; Design Skills</h5>
        <ul>
          <li>SRS Document Preparation, Pitch Deck Creation</li>
          <li>Startup Structuring, Designing UI</li>
        </ul>
        <h4 style={{marginTop:12}}>Personal Qualities</h4>
        <p>A quick learner with strong leadership and time management skills. Recognized for creativity, efficient use of technology, and the ability to handle complex tasks with focus and precision.</p>
        <h4 style={{marginTop:12}}>Certifications</h4>
        <ul>
          <li>Data Visualization using Python – Coursera</li>
          <li>Data Science Foundation – Coursera</li>
          <li>Kali Linux – Skill Up</li>
          <li>Operating System – Great Learning</li>
          <li>Python for Data Science – Great Learning</li>
        </ul>
        <h4 style={{marginTop:12}}>Projects &amp; Achievements</h4>
        <ul>
          <li>Participated and won college-level hackathons; competed in an international-level hackathon</li>
          <li>Analyzed over 10 datasets and achieved a top 1000 Kaggle ranking</li>
          <li>Volunteered in conducting and managing technical events at college</li>
          <li>Currently researching Solar Energy and Hydroponic Farming</li>
          <li>Working on two innovative projects: Club Connect and Class Fit</li>
        </ul>
        <h4 style={{marginTop:12}}>Beyond Tech</h4>
        <p>When I’m not exploring new technologies or working on projects, you’ll find me doing the things that recharge my energy and creativity. I’m passionate about cricket, where I learn teamwork and strategy. I enjoy management and leadership roles, organizing events, and motivating others. I also keep up with marketing trends and love exploring how creativity and technology can blend to inspire people. I believe in maintaining a positive, balanced lifestyle — coding with focus, working with passion, and living with vibe.</p>
        <h4 style={{marginTop:12}}>Connect</h4>
        <ul>
          <li>Email: <a href="mailto:iammsreddy223@gmail.com">iammsreddy223@gmail.com</a></li>
          <li>Phone: +91 8792195795</li>
        </ul>
      </div>
    )
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
        'Shaik Thanaaz',
        'Sai Likitha P V',
        'Aishwarya N',
        'Abhishek N',
        'Sahil Irshad',
        'Madhu Sudhan Reddy'
      ]
    },
    { id: 2, name: 'team 2', members: [] },
    { id: 3, name: 'team 3', members: [] },
    { id: 4, name: 'team 4', members: [] },
    { id: 5, name: 'team 5', members: [] },
    { id: 6, name: 'Faculty Coordinators', members: ['Mr. Abhishek S R'] },
    { id: 7, name: 'Student Coordinators', members: ['Jashwanth'] }
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

            {team.id === expandedTeamId && (
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
                    const profile = profiles[member] || null;
                    return (
                      <div
                        key={member}
                        className="member-card"
                        style={{ animationDelay: `${index * 60}ms` }}
                        onClick={() => setSelectedMember({ name: member, photo, initials, profile })}
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
          <div
            className="cert-modal-inner"
            role="dialog"
            aria-modal="true"
            style={{ display: 'flex', gap: 16, alignItems: 'flex-start', position: 'relative', width: 'min(92vw, 980px)' }}
          >
            <button className="cert-close" onClick={() => setSelectedMember(null)} aria-label="Close" style={{ position: 'absolute', top: 8, right: 8 }}>✕</button>

            {/* Left: Fixed image + name */}
            <div style={{ flex: '0 0 320px' }}>
              {selectedMember.photo ? (
                <img
                  src={selectedMember.photo}
                  alt={`${selectedMember.name} photo`}
                  style={{ width: 320, height: 240, objectFit: 'cover', borderRadius: 12 }}
                />
              ) : (
                <div
                  style={{
                    width: 320,
                    height: 240,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 12
                  }}
                >
                  <span style={{ fontSize: 48, fontWeight: 800, color: '#fff' }}>{selectedMember.initials}</span>
                </div>
              )}
              <div className="muted" style={{ marginTop: 10, fontWeight: 700, textAlign: 'center' }}>{selectedMember.name}</div>
            </div>

            {/* Right: Scrollable profile content */}
            <div style={{ flex: '1 1 auto', maxHeight: '70vh', overflowY: 'auto', color: '#e6e6e6', paddingRight: 4 }}>
              {selectedMember.profile ? (
                <div>
                  {selectedMember.profile}
                </div>
              ) : (
                <div className="muted" style={{ marginTop: 6 }}>Click outside or ✕ to close</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}