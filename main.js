const cards=document.querySelectorAll('.donate-card');
const selectedText = document.getElementById('selected-cause');

cards.forEach(card => {
    card.addEventListener('click', () => {
        const cause = card.getAttribute('data-cause');
        selectedText.textContent = "Selected Cause: " + cause;
    });
});