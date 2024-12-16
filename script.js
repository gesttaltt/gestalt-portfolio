document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('hiddenForm');
    const toggle = document.getElementById('toggle-btn');
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('email-error');
    const messageInput = document.getElementById('message');
    const charCount = document.getElementById('char-count');
    const status = document.getElementById('my-form-status');

    // Show/Hide Form
    toggle.addEventListener('click', () => {
        if (form.style.display === 'none' || form.style.display === '') {
            form.style.display = 'grid';
            form.scrollIntoView({ behavior: 'smooth', block: 'center' });
            toggle.style.display = 'none';
        } else {
            form.style.display = 'none';
            toggle.style.display = 'block';
        }
    });

    // Real-time Character Count for Message
    messageInput.addEventListener('input', () => {
        const maxLength = messageInput.getAttribute('maxlength');
        const currentLength = messageInput.value.length;
        charCount.textContent = `Characters left: ${maxLength - currentLength}`;
    });

    // Auto-resize Textarea
    messageInput.addEventListener('input', () => {
        messageInput.style.height = 'auto';
        messageInput.style.height = `${messageInput.scrollHeight}px`;
    });

    // Email Validation with HTML5 and Custom Error Message
    emailInput.addEventListener('input', () => {
        if (!emailInput.validity.valid) {
            emailError.style.display = 'inline';
            emailError.textContent = 'Enter a valid email address.';
        } else {
            emailError.style.display = 'none';
        }
    });

    // Form Submit Handler
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission

        // Check Email Validity
        if (!emailInput.validity.valid) {
            emailError.style.display = 'inline';
            emailError.textContent = 'Enter a valid email address.';
            return; // Stop submission if email is invalid
        }

        // Check Message Length
        if (messageInput.value.trim().length < 10) {
            messageInput.style.borderColor = 'red';
            messageInput.setCustomValidity('Message must be at least 10 characters long.');
            messageInput.reportValidity();
            return;
        } else {
            messageInput.style.borderColor = '';
            messageInput.setCustomValidity('');
        }

        // Submit the Form to Formspree
        const data = new FormData(form);
        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json',
                },
            });

            if (response.ok) {
                status.textContent = 'Thank you for your submission!';
                status.style.color = 'green';
                form.reset(); // Reset form fields
                charCount.textContent = 'Characters left: 200'; // Reset character count
                messageInput.style.height = 'auto'; // Reset textarea height
                emailError.style.display = 'none'; // Hide any lingering errors
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
