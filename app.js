/* ===== HERO SLIDER ===== */
let currentSlide = 0, sliderTimer;
function initSlider() {
  const track = document.getElementById('slider-track');
  const dotsWrap = document.getElementById('slider-dots');
  const slides = CLUB_DATA.heroSlides;
  slides.forEach((s, i) => {
    const div = document.createElement('div');
    div.className = 'slide' + (i === 0 ? ' active' : '');
    div.innerHTML = `<img src="${s.image}" alt="${s.label}" />`;
    track.appendChild(div);
    const dot = document.createElement('button');
    dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });
  document.getElementById('slider-prev').addEventListener('click', () => goTo(currentSlide - 1));
  document.getElementById('slider-next').addEventListener('click', () => goTo(currentSlide + 1));
  sliderTimer = setInterval(() => goTo(currentSlide + 1), 5000);
}
function goTo(n) {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.slider-dot');
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');
  currentSlide = (n + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
  clearInterval(sliderTimer);
  sliderTimer = setInterval(() => goTo(currentSlide + 1), 5000);
}

/* ===== NAVBAR ===== */
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', scrollY > 50);
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  const sections = document.querySelectorAll('section[id]');
  sections.forEach(s => {
    if (scrollY >= s.offsetTop - 80) {
      const a = document.querySelector(`.nav-link[href="#${s.id}"]`);
      if (a) { document.querySelectorAll('.nav-link').forEach(x => x.classList.remove('active')); a.classList.add('active'); }
    }
  });
});
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('nav-links').classList.toggle('open');
});

/* ===== COUNTER ===== */
function animateCount(el) {
  const target = +el.dataset.count;
  let val = 0;
  const step = Math.ceil(target / 60);
  const t = setInterval(() => {
    val = Math.min(val + step, target);
    el.textContent = val.toLocaleString();
    if (val >= target) clearInterval(t);
  }, 20);
}

/* ===== INTERSECTION OBSERVER ===== */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      e.target.querySelectorAll('[data-count]').forEach(animateCount);
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });

/* ===== RENDER HELPERS ===== */
function icon(name) { return `<i data-lucide="${name}"></i>`; }

function renderProjects() {
  const g = document.getElementById('projects-grid');
  if (!g) return;
  g.innerHTML = CLUB_DATA.projects.map(p => `
    <div class="project-card">
      <div class="vismis-icon">${icon(p.icon)}</div>
      <h3>${p.title}</h3>
      <p>${p.description}</p>
      <ul class="project-features">${p.features.map(f => `<li>${icon('check-circle')}<span>${f}</span></li>`).join('')}</ul>
    </div>`).join('');
}

function renderAchievements() {
  const g = document.getElementById('achievements-grid');
  if (!g) return;
  g.innerHTML = CLUB_DATA.achievements.map(a => `
    <div class="ach-item">${icon('star')}<span>${a}</span></div>`).join('');
}

function renderActivities() {
  const g = document.getElementById('activities-grid');
  if (!g) return;
  g.innerHTML = CLUB_DATA.activities.map(a => `
    <div class="activity-card">
      <div class="activity-icon">${icon(a.icon)}</div>
      <p>${a.text}</p>
    </div>`).join('');
}

function renderOutreach() {
  const g = document.getElementById('outreach-list');
  if (!g) return;
  g.innerHTML = CLUB_DATA.outreach.map(o => `<li>${icon('check-circle')}<span>${o}</span></li>`).join('');
  const vg = document.getElementById('values-grid');
  if (vg) vg.innerHTML = CLUB_DATA.coreValues.map(v => `<div class="value-chip">${v}</div>`).join('');
}

function renderTeam() {
  const g = document.getElementById('team-grid');
  if (!g) return;
  g.innerHTML = CLUB_DATA.team.map(m => {
    const initials = m.name.split(' ').map(w => w[0]).join('').substring(0, 2);
    const photo = m.photo ? `<img src="${m.photo}" alt="${m.name}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'" /><span class="team-initials" style="display:none">${initials}</span>` : `<span class="team-initials">${initials}</span>`;
    return `<div class="team-card"><div class="team-photo">${photo}</div><div class="team-name">${m.name}</div><p class="team-bio">${m.bio}</p></div>`;
  }).join('');
  const dg = document.getElementById('dept-grid');
  if (dg) dg.innerHTML = CLUB_DATA.departments.map(d => `<div class="dept-card"><div class="activity-icon">${icon(d.icon)}</div><span>${d.name}</span></div>`).join('');
}

function renderGallery() {
  const g = document.getElementById('gallery-grid');
  if (!g) return;
  g.innerHTML = CLUB_DATA.gallery.map(item => `
    <div class="gallery-item" data-src="${item.image}" data-caption="${item.caption}">
      <img src="${item.image}" alt="${item.caption}" onerror="this.parentElement.classList.add('no-img')" />
      <div class="gallery-overlay"><span class="gallery-caption">${item.caption}</span></div>
    </div>`).join('');
  g.querySelectorAll('.gallery-item').forEach(el => {
    el.addEventListener('click', () => {
      document.getElementById('lightbox').classList.add('open');
      document.getElementById('lightbox-img').src = el.dataset.src;
      document.getElementById('lightbox-caption').textContent = el.dataset.caption;
    });
  });
  document.getElementById('lightbox-close').addEventListener('click', () => {
    document.getElementById('lightbox').classList.remove('open');
  });
  document.getElementById('lightbox').addEventListener('click', e => {
    if (e.target === e.currentTarget) e.currentTarget.classList.remove('open');
  });
}

function renderBenefits() {
  const g = document.getElementById('benefits-grid');
  if (!g) return;
  g.innerHTML = CLUB_DATA.benefits.map(b => `
    <div class="benefit-card">
      <div class="benefit-icon">${icon(b.icon)}</div>
      <p>${b.text}</p>
    </div>`).join('');
}

function renderSocials() {
  const html = CLUB_DATA.socials.map(s => `<a href="${s.url}" target="_blank" rel="noopener" class="social-btn">${icon(s.icon)}<span>${s.platform}</span></a>`).join('');
  const sl = document.getElementById('social-links');
  if (sl) sl.innerHTML = html;
  const fs = document.getElementById('footer-socials');
  if (fs) fs.innerHTML = CLUB_DATA.socials.map(s => `<a href="${s.url}" target="_blank" rel="noopener" class="footer-social-link">${icon(s.icon)}<span>${s.handle}</span></a>`).join('');
}

/* ===== CONTACT FORM ===== */
document.getElementById('contact-form').addEventListener('submit', async e => {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('button[type="submit"]');
  const originalText = btn.innerHTML;
  
  if (!CLUB_DATA.googleSheetUrl) {
    alert("Please add your Google Apps Script Web App URL to data.js first.");
    return;
  }
  
  btn.innerHTML = `<span>Sending...</span>`;
  btn.disabled = true;
  
  try {
    const formData = new FormData(form);
    const data = {
      name: formData.get('Name'),
      email: formData.get('Email'),
      subject: formData.get('Subject'),
      message: formData.get('Message'),
      date: new Date().toLocaleString(),
      timestamp: new Date().toISOString()
    };

    await fetch(CLUB_DATA.googleSheetUrl, { 
      method: 'POST', 
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(data) 
    });
    
    document.getElementById('form-success').classList.add('show');
    form.reset();
    setTimeout(() => document.getElementById('form-success').classList.remove('show'), 4000);
  } catch (error) {
    console.error('Error!', error.message);
    alert("There was an error sending your message. Please try again.");
  } finally {
    btn.innerHTML = originalText;
    btn.disabled = false;
    lucide.createIcons();
  }
});

/* ===== INIT ===== */
function init() {
  initSlider();
  renderProjects();
  renderAchievements();
  renderActivities();
  renderOutreach();
  renderTeam();
  renderGallery();
  renderBenefits();
  renderSocials();
  lucide.createIcons();
  document.querySelectorAll('.section, .hero-stats, .vismis-card, .project-card, .ach-item, .team-card, .benefit-card, .activity-card').forEach(el => {
    el.setAttribute('data-animate', '');
    io.observe(el);
  });
}
document.addEventListener('DOMContentLoaded', init);
