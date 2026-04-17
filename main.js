const cards=document.querySelectorAll('.donate-card');
const selectedText = document.getElementById('selected-cause');

cards.forEach(card => {
    card.addEventListener('click', () => {
        const cause = card.getAttribute('data-cause');
        selectedText.textContent = "Selected Cause: " + cause;
    });
});

const donateBtn = document.querySelector('.donation-form button');
const statusText = document.getElementById('payment-status');

donateBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const amount = amountInput.value;

    fetch(`https://api.exchangerate-api.com/v4/latest/KES`)
        .then(response => response.json())
        .then(data => {
            const rate = data.rates.USD;

            const converted = amount * rate;

            conversionResult.textContent = `Converted Amount: $${converted.toFixed(2)}`;
    
    statusText.textContent = "Processing your M-Pesa payment...";

    setTimeout(() => {
        statusText.textContent = "Payment successful! Thank you for your donation.";
    }, 3000);
});
});
const amountInput = document.getElementById('amount');
const conversionResult = document.getElementById('conversion-result');

