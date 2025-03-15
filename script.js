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

  // Toggle the visibility of the contact form
  const toggleFormVisibility = () => {
    const isHidden = form.style.display === 'none' || form.style.display === '';
    form.style.display = isHidden ? 'grid' : 'none';
    toggle.style.display = isHidden ? 'none' : 'block';
  };
  if (toggle && form) {
    toggle.addEventListener('click', toggleFormVisibility);
  }

  // Update the character counter for the message textarea
  if (messageInput && charCount) {
    const updateCharCount = () => {
      const maxLength = messageInput.getAttribute('maxlength');
      charCount.textContent = `Characters left: ${maxLength - messageInput.value.length}`;
    };
    messageInput.addEventListener('input', updateCharCount);
  }

  // Validate the email input
  const validateEmail = () => {
    if (!emailRegex.test(emailInput.value.trim())) {
      if (emailError) {
        emailError.style.display = 'inline';
        emailError.textContent = 'Enter a valid email address.';
      }
      return false;
    }
    if (emailError) {
      emailError.style.display = 'none';
    }
    return true;
  };

  // Validate the message input (at least 10 characters)
  const validateMessage = () => {
    const minLength = 10;
    if (messageInput.value.trim().length < minLength) {
      messageInput.style.borderColor = 'red';
      if (status) {
        status.textContent = `Message must be at least ${minLength} characters.`;
        status.style.color = 'red';
      }
      return false;
    }
    messageInput.style.borderColor = '';
    if (status) {
      status.textContent = '';
    }
    return true;
  };

  // Submit the contact form to Google Forms
  const submitForm = async (event) => {
    event.preventDefault();
    if (!validateEmail() || !validateMessage()) return;

    const formData = new FormData(form);
    try {
      if (!form.action) {
        console.error('Form action is not set.');
        return;
      }
      // Using 'no-cors' as Google Forms doesn't support CORS
      await fetch(form.action, {
        method: 'POST',
        mode: 'no-cors',
        body: formData,
      });
      if (status) {
        status.textContent = 'Thank you for your submission!';
        status.style.color = 'green';
      }
      form.reset();
      if (messageInput) updateCharCount();
    } catch (error) {
      console.error('Network error:', error);
      if (status) {
        status.textContent = 'Network error. Please try again later.';
        status.style.color = 'red';
      }
    }
  };

  if (form) {
    form.addEventListener('submit', submitForm);
  }

  // --- LIVE DEMO PROJECT LOGIC ---
  const liveDemoBtn = document.querySelector('.hero-btn');
  const projectIframe = document.querySelector('.project-iframe');

  // When the live demo button is clicked, ensure the correct URL is loaded in the iframe
  if (liveDemoBtn && projectIframe) {
    liveDemoBtn.addEventListener('click', () => {
      const targetSrc = "https://gestock-orpin.vercel.app";
      // Only update if not already set
      if (projectIframe.src !== targetSrc) {
        projectIframe.src = targetSrc;
      }
    });
  }
});
