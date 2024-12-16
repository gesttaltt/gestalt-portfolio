	const form = document.getElementById("hiddenForm");
	const toggle = document.getElementById("toggle-btn");
	const formIntoView = document.querySelector('#hiddenForm input[type="email"]');
	const submitBtn = document.getElementById('submit');
	const charCount = document.querySelector('#char-count');
	const formMessage = document.querySelector('#message'); //For real time-interactivity (See below)
	

toggle.addEventListener("click", function() {

		if (form.style.display === "none" || form.style.display === "") {
			form.style.display = "grid";
			formIntoView.scrollIntoView({ behavior: 'smooth', block: 'center' });
			toggle.style.display = "none";} 

		else {form.style.display = "none";
				toggle.style.display = "block";}
			});

//Basic form validation
document.querySelector('#hiddenForm').addEventListener('submit', function (e) {
  const email = document.querySelector('#email');
  if (!email.checkValidity()) {
    e.preventDefault(); // Prevent form submission
    document.querySelector('#email-error').textContent = 'Invalid email address';
  }
});

//Real-time interactivity
	//Resize textarea
formMessage.addEventListener('input', () => {
  formMessage.style.height = 'auto';
  formMessage.style.height = `${formMessage.scrollHeight}px`; 
});
	//Char count
formMessage.addEventListener('input', () => {
  const maxLength = formMessage.getAttribute('maxlength');
  const currentLength = formMessage.value.length;
  charCount.textContent = `Characters left: ${maxLength - currentLength}`;
});
	//Min char count
formMessage.addEventListener('input', () => {
  if (formMessage.value.trim().length < 10) {
    formMessage.style.borderColor = 'red';
    formMessage.setCustomValidity('Message must be at least 10 characters long.');
  } else {
    formMessage.style.borderColor = 'blue';
    formMessage.setCustomValidity('');
  }
});
	//Email regex validation
const emailInput = document.getElementById('email'); 
const emailError = document.getElementById('email-error');

emailInput.addEventListener('input', () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(emailInput.value.trim())) {
    emailError.style.display = 'inline';
  } else {
    emailError.style.display = 'none';
  }
});
	//Email not submitted If is invalid
document.querySelector('#hiddenForm').addEventListener('submit', (event) => {
  if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
    event.preventDefault(); 
    emailError.style.display = 'inline'; 
}});


//Form handler
const status = document.getElementById('my-form-status');
const messageInput = document.getElementById('message');

form.addEventListener('submit', async (event) => {
        event.preventDefault();
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
                form.reset(); 
                charCount.textContent = 'Characters left: 200';
            } else {
                const errorData = await response.json();
                status.textContent = errorData.message || 'Oops! There was a problem submitting the form.';
                status.style.color = 'red';
            }
        } catch (error) {
            status.textContent = 'There was an error submitting the form.';
            status.style.color = 'red';
        }
});
