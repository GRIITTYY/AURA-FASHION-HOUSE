// --- Member Card Hover Effect ---
function initMemberCards() {
    document.querySelectorAll('.Member-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.transition = 'transform 0.3s ease';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}

// Initialize about page functionality
document.addEventListener('DOMContentLoaded', function() {
    initMemberCards();
});