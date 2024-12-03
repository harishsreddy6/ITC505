// Function to sanitize user input
function sanitizeInput(input) {
    return input.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
}

// Function to handle form validation and submission
function validateForm(event) {
    event.preventDefault(); // Prevent the default form submission
    
    // Get input field values
    const fname = document.getElementById('fname').value.trim();
    const lname = document.getElementById('lname').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const phone = document.getElementById('phone').value.trim();
    const dob = document.getElementById('dob').value.trim();
    const gender = document.getElementById('gender').value;

    let valid = true;
    let message = '';

    // Clear previous error messages
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach((msg) => {
        msg.style.display = 'none';
    });

    // Basic field validation
    if (!fname || !lname || !email || !password || !confirmPassword || !phone || !dob || !gender) {
        valid = false;
        message += 'All fields are required.\n';
        document.getElementById('requiredError').style.display = 'block';
    }

    // Email format validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        valid = false;
        document.getElementById('emailError').style.display = 'block';
    }

    // Phone number validation (simple pattern for 10-digit numbers)
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
        valid = false;
        document.getElementById('phoneError').style.display = 'block';
    }

    // Password matching validation
    if (password !== confirmPassword) {
        valid = false;
        document.getElementById('passwordMismatchError').style.display = 'block';
    }

    // Password strength check
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (password && !passwordPattern.test(password)) {
        valid = false;
        document.getElementById('passwordStrengthError').style.display = 'block';
    }

    // Display error message if validation fails
    const errorMessage = document.getElementById('errorMessage');
    if (!valid) {
        errorMessage.style.display = 'block';
    } else {
        errorMessage.style.display = 'none';
        showSuccessMessage();
    }
}

// Function to show success message after successful form submission
function showSuccessMessage() {
    const formContainer = document.querySelector('.container');
    formContainer.innerHTML = ` 
        <h3>Form Submitted Successfully!</h3>
        <p>Your registration has been completed successfully.</p>
    `;
}

// Function to display password strength error
function showPasswordError() {
    const password = document.getElementById('password').value;
    const passwordError = document.getElementById('passwordStrengthError');

    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (password && !passwordPattern.test(password)) {
        passwordError.style.display = 'block';
    } else {
        passwordError.style.display = 'none';
    }
}

// Add event listener to form submission
document.getElementById('secureForm').addEventListener('submit', validateForm);
