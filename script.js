// ===== Mobile menu toggle =====
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

menuBtn.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', isOpen);
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  });
});

// ===== Theme toggle (dark/light) with localStorage =====
const themeToggle = document.getElementById('themeToggle');
const htmlEl = document.documentElement;

function applyTheme(theme) {
  htmlEl.setAttribute('data-theme', theme);
  themeToggle.setAttribute('aria-pressed', theme === 'dark');
}

(function initTheme() {
  try {
    const saved = localStorage.getItem('sprout-theme');
    if (saved) {
      applyTheme(saved);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      applyTheme('dark');
    }
  } catch (e) {
    // localStorage unavailable — fall back to default light theme
  }
})();

themeToggle.addEventListener('click', () => {
  const next = htmlEl.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  try { localStorage.setItem('sprout-theme', next); } catch (e) {}
});

// ===== FAQ accordion =====
document.querySelectorAll('.faq-item').forEach(item => {
  const btn = item.querySelector('.faq-q');
  const answer = item.querySelector('.faq-a');

  btn.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');

    // close any other open item
    document.querySelectorAll('.faq-item.open').forEach(openItem => {
      if (openItem !== item) {
        openItem.classList.remove('open');
        openItem.querySelector('.faq-a').style.maxHeight = null;
        openItem.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      }
    });

    if (isOpen) {
      item.classList.remove('open');
      answer.style.maxHeight = null;
      btn.setAttribute('aria-expanded', 'false');
    } else {
      item.classList.add('open');
      answer.style.maxHeight = answer.scrollHeight + 'px';
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

// ===== Testimonial carousel =====
const reviews = document.querySelectorAll('.review');
const dotsWrap = document.getElementById('carouselDots');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let current = 0;

reviews.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.className = 'dot';
  dot.setAttribute('aria-label', `Go to review ${i + 1}`);
  dot.addEventListener('click', () => showReview(i));
  dotsWrap.appendChild(dot);
});
const dots = dotsWrap.querySelectorAll('.dot');

function showReview(index) {
  reviews.forEach(r => r.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));
  current = (index + reviews.length) % reviews.length;
  reviews[current].classList.add('active');
  dots[current].classList.add('active');
}

prevBtn.addEventListener('click', () => showReview(current - 1));
nextBtn.addEventListener('click', () => showReview(current + 1));
showReview(0);

// ===== Modal =====
const modalOverlay = document.getElementById('modalOverlay');
const openModalBtn = document.getElementById('openModalBtn');
const modalClose = document.getElementById('modalClose');
const modalCta = document.getElementById('modalCta');

function openModal() {
  modalOverlay.classList.add('open');
}
function closeModal() {
  modalOverlay.classList.remove('open');
}

openModalBtn.addEventListener('click', openModal);
modalClose.addEventListener('click', closeModal);
modalCta.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// ===== Signup form validation =====
const form = document.getElementById('signupForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const formSuccess = document.getElementById('formSuccess');

function setError(input, errorId, message) {
  document.getElementById(errorId).textContent = message;
  input.closest('.field').classList.toggle('invalid', Boolean(message));
}

function validateName() {
  if (!nameInput.value.trim()) {
    setError(nameInput, 'nameError', 'Please enter your name.');
    return false;
  }
  setError(nameInput, 'nameError', '');
  return true;
}

function validateEmail() {
  const value = emailInput.value.trim();
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!value) {
    setError(emailInput, 'emailError', 'Please enter your email.');
    return false;
  }
  if (!pattern.test(value)) {
    setError(emailInput, 'emailError', 'Please enter a valid email address.');
    return false;
  }
  setError(emailInput, 'emailError', '');
  return true;
}

function validateMessage() {
  if (!messageInput.value.trim()) {
    setError(messageInput, 'messageError', 'Tell us a little about your space.');
    return false;
  }
  setError(messageInput, 'messageError', '');
  return true;
}

nameInput.addEventListener('blur', validateName);
emailInput.addEventListener('blur', validateEmail);
messageInput.addEventListener('blur', validateMessage);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  formSuccess.textContent = '';

  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isMessageValid = validateMessage();

  if (isNameValid && isEmailValid && isMessageValid) {
    formSuccess.textContent = `Thanks, ${nameInput.value.trim()} — we'll email your plant matches soon.`;
    form.reset();
  }
});
