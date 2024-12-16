document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('hiddenForm');
    const toggle = document.getElementById('toggle-btn');
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('email-error');
    const messageInput = document.getElementById('message');
    const charCount = document.getElementById('char-count');
    const status = document.getElementById('my-form-status');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Added email validation regex as a const variable

    // Show/Hide Form
    toggle.addEventListener('click', () => {
        form.style.display = (form.style.display === 'none' || form.style.display === '') ? 'grid' : 'none';
        toggle.style.display = form.style.display === 'none' ? 'block' : 'none';
    });

    // Real-time Character Count
    messageInput.addEventListener('input', () => {
        const maxLength = messageInput.getAttribute('maxlength');
        charCount.textContent = `Characters left: ${maxLength - messageInput.value.length}`;
    });

    // Form Submit Handler
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission

        // Email Validation
        if (!emailRegex.test(emailInput.value.trim())) {
            emailError.style.display = 'inline';
            emailError.textContent = 'Enter a valid email address.';
            return;
        } else {
            emailError.style.display = 'none';
        }

        // Message Validation
        if (messageInput.value.trim().length < 10) {
            messageInput.style.borderColor = 'red';
            status.textContent = 'Message must be at least 10 characters.';
            status.style.color = 'red';
            return;
        }

        // Submit Form to Formspree
        const data = new FormData(form);
        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: data,
                headers: { 'Accept': 'application/json' },
            });

            if (response.ok) {
                status.textContent = 'Thank you for your submission!';
                status.style.color = 'green';
                form.reset();
                charCount.textContent = 'Characters left: 200';
            } else {
                const errorData = await response.json().catch(() => ({}));
                status.textContent = errorData.message || 'Oops! There was a problem submitting the form.';
                status.style.color = 'red';
            }
        } catch (error) {
            status.textContent = 'There was a network error. Please try again later.';
            status.style.color = 'red';
        }
    });
});
