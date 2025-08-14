// --- Contact Form Validation & Submission ---
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('form-feedback');
    
    if (contactForm && formFeedback) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (name && email && message) {
                formFeedback.textContent = `Thank you, ${name}! Your message has been sent. We will be in touch shortly.`;
                formFeedback.className = 'text-center mt-6 text-green-600 form-success';
                contactForm.reset();
            } else {
                formFeedback.textContent = 'Please fill out all required fields.';
                formFeedback.className = 'text-center mt-6 text-red-600 form-error';
            }
        });
    }
}

// Initialize contact page functionality
document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
});