// --- Event Countdown Timer ---
function initCountdown() {
    const countdownElement = document.querySelector('#countdown p:last-child');
    if (!countdownElement) return;
    
    const eventDate = new Date('October 25, 2025 19:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = eventDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (distance < 0) {
            clearInterval(countdownInterval);
            countdownElement.innerHTML = "EVENT STARTED";
        } else {
            countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }
    }
    
    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call
}

// Initialize events page functionality
document.addEventListener('DOMContentLoaded', function() {
    initCountdown();
});