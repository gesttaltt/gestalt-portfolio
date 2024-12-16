document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('hiddenForm');
    const toggle = document.getElementById('toggle-btn');
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('email-error');
    const messageInput = document.getElementById('message');
    const charCount = document.getElementById('char-count');
    const status = document.getElementById('my-form-status');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Toggle Form Visibility
    const toggleFormVisibility = () => {
        const isHidden = form.style.display === 'none' || form.style.display === '';
        form.style.display = isHidden ? 'grid' : 'none';
        toggle.style.display = isHidden ? 'none' : 'block';
    };
    toggle.addEventListener('click', toggleFormVisibility);

    // Update Character Count in Textarea
    const updateCharCount = () => {
        const maxLength = messageInput.getAttribute('maxlength');
        charCount.textContent = `Characters left: ${maxLength - messageInput.value.length}`;
    };
    messageInput.addEventListener('input', updateCharCount);

    // Form Validation
    const validateEmail = () => {
        if (!emailRegex.test(emailInput.value.trim())) {
            emailError.style.display = 'inline';
            emailError.textContent = 'Enter a valid email address.';
            return false;
        }
        emailError.style.display = 'none';
        return true;
    };

    const validateMessage = () => {
        const minLength = 10;
        if (messageInput.value.trim().length < minLength) {
            messageInput.style.borderColor = 'red';
            status.textContent = `Message must be at least ${minLength} characters.`;
            status.style.color = 'red';
            return false;
        }
        messageInput.style.borderColor = '';
        status.textContent = '';
        return true;
    };

    // Submit Form to Formspree
    const submitForm = async (event) => {
        event.preventDefault();

        // Validate Inputs
        if (!validateEmail() || !validateMessage()) return;
        
        const formData = new FormData(form);
        formData.append('_formspree_key', 'n42mbvh');
        try {
            const response = await fetch('https://formspree.io/f/mrbgwgod', {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' },
            });

            if (response.ok) {
                status.textContent = 'Thank you for your submission!';
                status.style.color = 'green';
                form.reset();
                updateCharCount(); // Reset character count
            } else {
                status.textContent = 'Oops! There was a problem submitting the form.';
                status.style.color = 'red';
            }
        } catch (error) {
            console.error('Network error:', error);
            status.textContent = 'Network error. Please try again later.';
            status.style.color = 'red';
        }
    };

    // Event Listeners
    form.addEventListener('submit', submitForm);
});
