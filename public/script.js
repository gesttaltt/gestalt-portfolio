	const form = document.getElementById("hiddenForm");
	const toggle = document.getElementById("toggle-btn");
	const formIntoView = document.querySelector('#hiddenForm input[type="email"]');
	const submitBtn = document.getElementById('submit');

	const formMessage = document.querySelector('#message');
	const charCount = document.querySelector('#char-count');

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

formMessage.addEventListener('input', () => {
  formMessage.style.height = 'auto'; // Reset the height
  formMessage.style.height = `${formMessage.scrollHeight}px`; // Adjust to content
});

formMessage.addEventListener('input', () => {
  const maxLength = formMessage.getAttribute('maxlength');
  const currentLength = formMessage.value.length;
  charCount.textContent = `Characters left: ${maxLength - currentLength}`;
});

formMessage.addEventListener('input', () => {
  if (formMessage.value.trim().length < 10) {
    formMessage.style.borderColor = 'red';
    formMessage.setCustomValidity('Message must be at least 10 characters long.');
  } else {
    formMessage.style.borderColor = 'blue';
    formMessage.setCustomValidity('');
  }
});

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

//Prevent submission if the email is invalid
document.querySelector('#hiddenForm').addEventListener('submit', (event) => {
  if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
    event.preventDefault(); // Stop form submission
    emailError.style.display = 'inline'; // Ensure error message is visible
  }
});

// Select the form and status element
var formElement = document.getElementById("hiddenForm");

async function handleSubmit(event) {
  event.preventDefault(); // Prevent default form submission behavior

  var status = document.getElementById("my-form-status"); // Status message container
  var data = new FormData(event.target); // Gather form data

  // Send form data to Formspree
  fetch(event.target.action, {
    method: formElement.method, // Use form's method (POST)
    body: data,          // Form data
    headers: {
      'Accept': 'application/json' // Request JSON response
    }
  })
    .then(response => {
      if (response.ok) {
        status.innerHTML = "Thanks for your submission!";
        status.style.color = "green"; // Success message styling
        formElement.reset(); // Reset the form after success
      } else {
        response.json().then(data => {
          if (Object.hasOwn(data, 'errors')) {
            // Display errors from Formspree
            status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
          } else {
            status.innerHTML = "Oops! There was a problem submitting your form.";
          }
          status.style.color = "red"; // Error message styling
        });
      }
    })
    .catch(error => {
      // Catch network or other errors
      status.innerHTML = "Oops! There was a problem submitting your form.";
      status.style.color = "red"; // Error message styling
    });
}

// Attach the submit event listener to the form
formElement.addEventListener("submit", handleSubmit);







	