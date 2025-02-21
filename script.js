document.addEventListener('DOMContentLoaded', () => {
    // Actualizamos el ID del formulario y el de la zona de estado
    const form = document.getElementById('contact-form');
    const toggle = document.getElementById('toggle-btn');
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('email-error');
    const messageInput = document.getElementById('message');
    const charCount = document.getElementById('char-count');
    const status = document.getElementById('form-status');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Toggle Form Visibility (si es que aún deseas esta funcionalidad)
    const toggleFormVisibility = () => {
        const isHidden = form.style.display === 'none' || form.style.display === '';
        form.style.display = isHidden ? 'grid' : 'none';
        toggle.style.display = isHidden ? 'none' : 'block';
    };
    if (toggle) {
        toggle.addEventListener('click', toggleFormVisibility);
    }

    // Actualiza el contador de caracteres en el textarea
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

        // Validamos inputs
        if (!validateEmail() || !validateMessage()) return;
        
        const formData = new FormData(form);
        try {
            // Google Forms no permite CORS, por lo que usamos mode 'no-cors'
            await fetch(form.action, {
                method: 'POST',
                mode: 'no-cors',
                body: formData
            });

            // Asumimos éxito ya que no se reciben detalles en no-cors
            status.textContent = 'Thank you for your submission!';
            status.style.color = 'green';
            form.reset();
            updateCharCount(); // Reinicia el contador de caracteres
        } catch (error) {
            console.error('Network error:', error);
            status.textContent = 'Network error. Please try again later.';
            status.style.color = 'red';
        }
    };

    // Listener para el envío del formulario
    form.addEventListener('submit', submitForm);
});
