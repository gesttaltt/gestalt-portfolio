document.addEventListener('DOMContentLoaded', () => {
  // --- CONTACT FORM LOGIC ---
  const form = document.getElementById('contact-form');
  const toggle = document.getElementById('toggle-btn');
  const emailInput = document.getElementById('email');
  const emailError = document.getElementById('email-error');
  const messageInput = document.getElementById('message');
  const charCount = document.getElementById('char-count');
  const status = document.getElementById('form-status');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // --- ARROW FLECHA LOGIC ---
  const arrowSvg = document.getElementById('arrow-line');
  const startEl = document.getElementById('arrow-start');
  const endEl = document.getElementById('arrow-end');

  const updateArrow = () => {
    if (!arrowSvg || !startEl || !endEl) return;

    const toggleStyle = getComputedStyle(toggle);
    if (toggleStyle.display === 'none') {
      arrowSvg.style.display = 'none';
      return;
    } else {
      arrowSvg.style.display = 'block';
    }

    const start = startEl.getBoundingClientRect();
    const end = endEl.getBoundingClientRect();

    arrowSvg.setAttribute("width", window.innerWidth);
    arrowSvg.setAttribute("height", window.innerHeight);

    const x1 = start.left + start.width / 2;
    const y1 = start.top + start.height / 2 + window.scrollY;
    const x2 = end.left + end.width / 2;
    const y2 = end.top + end.height / 2 + window.scrollY;

    arrowSvg.innerHTML = `
      <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" 
        stroke="#c99cff" stroke-width="2.5" 
        stroke-dasharray="400" stroke-dashoffset="400" 
        style="animation: drawLine 1.3s ease-out forwards;" />
      <circle cx="${x2}" cy="${y2}" r="5" fill="#c99cff" 
        style="transform: scale(0); animation: popCircle 0.6s ease-out forwards 1s;" />
    `;
  };

  // ⏱️ Debounced safe update (solo si elementos están visibles)
  const safeUpdateArrow = () => {
    requestAnimationFrame(() => {
      const startVisible = startEl && startEl.offsetParent !== null;
      const endVisible = endEl && endEl.offsetParent !== null;
      if (startVisible && endVisible) {
        updateArrow();
      }
    });
  };

  // Observador para cuando el sobre aparece
  if (endEl) {
    const observer = new ResizeObserver(safeUpdateArrow);
    observer.observe(endEl);
  }

  // --- Mostrar/Ocultar formulario ---
  const toggleFormVisibility = () => {
    const isHidden = form.style.display === 'none' || form.style.display === '';
    form.style.display = isHidden ? 'grid' : 'none';
    toggle.style.display = isHidden ? 'none' : 'block';

    // Actualiza la flecha cuando el sobre reaparece
    if (!isHidden) {
      safeUpdateArrow();
    }
  };

  toggle?.addEventListener('click', toggleFormVisibility);

  // --- Char counter ---
  if (messageInput && charCount) {
    const updateCharCount = () => {
      const maxLength = messageInput.getAttribute('maxlength') || 400;
      charCount.textContent = `Characters left: ${maxLength - messageInput.value.length}`;
    };
    messageInput.addEventListener('input', updateCharCount);
  }

  // --- Validaciones ---
  const validateEmail = () => {
    const valid = emailRegex.test(emailInput.value.trim());
    emailError.style.display = valid ? 'none' : 'inline';
    emailError.textContent = valid ? '' : 'Enter a valid email address.';
    return valid;
  };

  const validateMessage = () => {
    const minLength = 10;
    const valid = messageInput.value.trim().length >= minLength;
    messageInput.style.borderColor = valid ? '' : 'red';
    status.textContent = valid ? '' : `Message must be at least ${minLength} characters.`;
    status.style.color = valid ? '' : 'red';
    return valid;
  };

  // --- Submit ---
  const submitForm = async (event) => {
    event.preventDefault();
    if (!validateEmail() || !validateMessage()) return;

    const formData = new FormData(form);
    try {
      if (!form.action) {
        console.error('Form action is not set.');
        return;
      }
      await fetch(form.action, {
        method: 'POST',
        mode: 'no-cors',
        body: formData,
      });7
      status.textContent = 'Thank you for your submission!';
      status.style.color = 'green';
      form.reset();
      messageInput && charCount && (charCount.textContent = '');
    } catch (error) {
      console.error('Network error:', error);
      status.textContent = 'Network error. Please try again later.';
      status.style.color = 'red';
    }
  };

  form?.addEventListener('submit', submitForm);

  // --- LIVE DEMO PROJECT LOGIC ---
  const liveDemoBtn = document.querySelector('.hero-btn');
  const projectIframe = document.querySelector('.project-iframe');

  liveDemoBtn?.addEventListener('click', () => {
    const targetSrc = "https://gestock-orpin.vercel.app";
    if (projectIframe.src !== targetSrc) {
      projectIframe.src = targetSrc;
    }
  });

  // Listeners de ventana
  window.addEventListener('resize', safeUpdateArrow);
  window.addEventListener('load', safeUpdateArrow);
});
