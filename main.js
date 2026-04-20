

let donations = JSON.parse(localStorage.getItem("donations")) || [];
const cards=document.querySelectorAll('.donate-card');
const selectedText = document.getElementById('selected-cause');
const amountInput = document.getElementById('amount');
const phoneInput = document.getElementById('phone');
const conversionResult = document.getElementById('conversion-result');

const totalDisplay = document.getElementById("total-donations")
const donateBtn = document.querySelector('.donation-form button');
const statusText = document.getElementById('payment-status');
const donorList = document.getElementById("donor-list");
const homeTotal = document.getElementById("home-total");
const homeDonors = document.getElementById("home-donors");
const homeProjects = document.getElementById("home-projects");
const contactForm = document.querySelector('.contact-form');
const contactStatus = document.getElementById('contact-status');



function addDonorToList(name,amount,cause){
    console.log("Adding donor to list:", name, amount, cause);
    const li = document.createElement("li");
    li.textContent = `${name} - KES ${amount} - ${cause}`;
    if(donorList) {
        donorList.appendChild(li);
    }
}



if(donorList) {
    
    donorList.innerHTML = "";
    donations.forEach(d => {
    addDonorToList("Donor", d.amount, d.cause);
});
}




cards.forEach(card => {
    card.addEventListener('click', () => {
        const cause = card.getAttribute('data-cause');
        selectedText.textContent = "Selected Cause: " + cause;
    });
});





if (donateBtn) {
donateBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const amount = amountInput.value;
    const phone= phoneInput.value;


    const selectedCause= selectedText.textContent.replace("Selected Cause: ","");

    if(!amount || !phone || selectedCause === "Selected Cause: None"){
        statusText.textContent = "Please fill in all fields and select a cause.";
        return;
    }

    
    fetch(`https://api.exchangerate-api.com/v4/latest/KES`)
        .then(response => response.json())
        .then(data => {
            const rate = data.rates.USD;

            const converted = amount * rate;

            conversionResult.textContent = `Converted Amount: $${converted.toFixed(2)}`;

            const donation = {
                cause: selectedCause,
                amount: amount,
                phone: phone
            };

donations.push(donation);

    
    statusText.textContent = "Processing your M-Pesa payment...";

    setTimeout(() => {
        statusText.textContent = "Payment successful! Thank you for your donation.";
if (totalDisplay) {
        const total=donations.reduce((sum,d)=>{
    return sum + Number(d.amount);
},0)

    totalDisplay.textContent = "Total Donations:" + total;
}




addDonorToList("You", amount, selectedCause);

}, 3000);
});
});
}


if (contactForm) {
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if(!name || !email || !message){
        contactStatus.textContent = "Please fill in all fields.";
        return;
    }

    const fullMessage = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;
    const encodedMessage = encodeURIComponent(fullMessage);
    const whatsappURL = `https://wa.me/254701744757?text=${encodedMessage}`;

    window.open(whatsappURL, '_blank');
    contactStatus.textContent = "Redirecting to WhatsApp...";
});
}

