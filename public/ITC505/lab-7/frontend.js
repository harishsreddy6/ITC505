// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add a background animation effect
const gradientBackground = document.querySelector('body');

let angle = 0;
function animateBackground() {
    angle += 0.1;
    gradientBackground.style.background = `linear-gradient(${angle}deg, #ffccff, #b3e0ff)`;
    requestAnimationFrame(animateBackground);
}

// Start background animation
animateBackground();

// Show loading indicator when the form is submitted
const form = document.querySelector('form');
const loadingIndicator = document.createElement('div');
loadingIndicator.style.display = 'none';
loadingIndicator.innerText = 'Submitting...';
loadingIndicator.style.fontSize = '2rem';
loadingIndicator.style.color = '#ff4d4d';
loadingIndicator.style.fontWeight = 'bold';
loadingIndicator.style.position = 'absolute';
loadingIndicator.style.top = '50%';
loadingIndicator.style.left = '50%';
loadingIndicator.style.transform = 'translate(-50%, -50%)';
form.appendChild(loadingIndicator);

form.addEventListener('submit', function (e) {
    loadingIndicator.style.display = 'block'; // Show loading indicator
    setTimeout(() => {
        loadingIndicator.style.display = 'none'; // Hide after submission
    }, 2000);
});

// Add hover effects for the input fields and button
const inputs = document.querySelectorAll('input[type="text"]');
const button = document.querySelector('button');

inputs.forEach(input => {
    input.addEventListener('focus', function () {
        input.style.boxShadow = '0 0 10px rgba(255, 128, 179, 0.7)';
    });
    input.addEventListener('blur', function () {
        input.style.boxShadow = 'none';
    });
});

button.addEventListener('mouseover', function () {
    button.style.transform = 'scale(1.05)';
    button.style.transition = 'transform 0.3s ease';
});

button.addEventListener('mouseleave', function () {
    button.style.transform = 'scale(1)';
});

// Set last modified time dynamically
document.getElementById('lastModified').textContent = document.lastModified;
