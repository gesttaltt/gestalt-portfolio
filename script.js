document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const toggle = document.getElementById('toggle-btn');
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('email-error');
    const messageInput = document.getElementById('message');
    const charCount = document.getElementById('char-count');
    const status = document.getElementById('form-status');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Toggle de visibilidad del formulario
    const toggleFormVisibility = () => {
        const isHidden = form.style.display === 'none' || form.style.display === '';
        form.style.display = isHidden ? 'grid' : 'none';
        toggle.style.display = isHidden ? 'none' : 'block';
    };
    toggle.addEventListener('click', toggleFormVisibility);

    // Actualizar el contador de caracteres en el textarea
    const updateCharCount = () => {
        const maxLength = messageInput.getAttribute('maxlength');
        charCount.textContent = `Characters left: ${maxLength - messageInput.value.length}`;
    };
    messageInput.addEventListener('input', updateCharCount);

    // Validación del email
    const validateEmail = () => {
        if (!emailRegex.test(emailInput.value.trim())) {
            emailError.style.display = 'inline';
            emailError.textContent = 'Enter a valid email address.';
            return false;
        }
        emailError.style.display = 'none';
        return true;
    };

    // Validación del mensaje (mínimo 10 caracteres)
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

    // Envío del formulario a Google Forms
    const submitForm = async (event) => {
        event.preventDefault();

        // Validar inputs
        if (!validateEmail() || !validateMessage()) return;

        const formData = new FormData(form);
        try {
            // Debido a que Google Forms no admite CORS, se utiliza 'no-cors'
            await fetch(form.action, {
                method: 'POST',
                mode: 'no-cors',
                body: formData,
            });

            status.textContent = 'Thank you for your submission!';
            status.style.color = 'green';
            form.reset();
            updateCharCount();
        } catch (error) {
            console.error('Network error:', error);
            status.textContent = 'Network error. Please try again later.';
            status.style.color = 'red';
        }
    };

    form.addEventListener('submit', submitForm);
});
