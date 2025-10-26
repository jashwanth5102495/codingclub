// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting) e.target.classList.add('show');
  });
}, {threshold:0.12});
revealEls.forEach(el=>observer.observe(el));

// Down arrow scroll
const downArrow = document.getElementById('downArrow');
if (downArrow) {
  downArrow.addEventListener('click', ()=> {
    document.getElementById('about').scrollIntoView({behavior:'smooth', block:'start'});
  });
}

// Certificate modal
function openCert(src){
  const modal = document.getElementById('certModal');
  const img = document.getElementById('certLarge');
  if(!modal || !img) return;
  img.src = src;
  modal.style.display = 'flex';
  modal.setAttribute('aria-hidden', 'false');
}
function closeCert(){
  const modal = document.getElementById('certModal');
  const img = document.getElementById('certLarge');
  if(!modal || !img) return;
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
  img.src = '';
}
// outside click to close
const certModal = document.getElementById('certModal');
if (certModal) {
  certModal.addEventListener('click', (e)=>{
    if(e.target === certModal) closeCert();
  });
}

// Contact form (static demo)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e){
    e.preventDefault();
    const n = document.getElementById('name').value.trim();
    const em = document.getElementById('email').value.trim();
    if(!n || !em){ alert('Please enter name and email'); return; }
    alert('Thanks, '+n+'! Message received (demo).');
    this.reset();
  });
}

// keyboard accessible cert tiles
document.querySelectorAll('.cert').forEach(c=>{
  c.addEventListener('keypress', (ev)=>{
    if(ev.key === 'Enter') c.click();
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('lightningCanvas');
  const ctx = canvas.getContext('2d');
  const overlay = document.getElementById('introOverlay');
  const btn = document.getElementById('enterBtn');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let flashes = [];

  // Generate random lightning
  function lightning() {
    if (Math.random() < 0.03) {
      flashes.push({
        x: Math.random() * canvas.width,
        y: 0,
        length: Math.random() * 250 + 150,
        alpha: 1
      });
    }
  }

  // Draw storm and lightning
  function draw() {
    ctx.fillStyle = 'rgba(0,0,0,0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    flashes.forEach((f, i) => {
      ctx.beginPath();
      ctx.moveTo(f.x, f.y);
      for (let j = 0; j < 10; j++) {
        const x = f.x + (Math.random() - 0.5) * 50;
        const y = f.y + j * (f.length / 10);
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = `rgba(255,255,255,${f.alpha})`;
      ctx.lineWidth = 2;
      ctx.stroke();
      f.alpha -= 0.04;
      if (f.alpha <= 0) flashes.splice(i, 1);
    });

    requestAnimationFrame(draw);
  }

  setInterval(lightning, 50);
  draw();

  // Button click -> thunder lightning from left + reveal site
  btn.addEventListener('click', () => {
    // Flash animation
    overlay.classList.add('flash');

    // Fake thunder sound (optional: can add your thunder.mp3)
    const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-thunder-strike-quick-1940.mp3');
    audio.play();

    // Fade overlay after flash
    setTimeout(() => {
      overlay.style.animation = 'fadeOutOverlay 1.5s forwards';
      setTimeout(() => (overlay.style.display = 'none'), 1600);
    }, 1000);
  });

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
});
// === Thunderstorm Intro Animation ===
const enterBtn = document.getElementById('enterBtn');
const introOverlay = document.getElementById('introOverlay');

enterBtn.addEventListener('click', () => {
  // Zoom + flash effect
  introOverlay.style.transform = 'scale(1.5)';
  introOverlay.style.opacity = '0';
  setTimeout(() => {
    introOverlay.style.display = 'none';
  }, 1200);
});
const toggleBtn = document.getElementById("toggleDoneBy");
const doneBySection = document.getElementById("doneby-section");

toggleBtn.addEventListener("click", () => {
  if (doneBySection.style.display === "block") {
    doneBySection.style.display = "none";
    toggleBtn.innerText = "View Done By";
  } else {
    doneBySection.style.display = "block";
    toggleBtn.innerText = "Hide Done By";
  }
});
