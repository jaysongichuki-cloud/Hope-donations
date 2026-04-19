console.log("Js is running");
console.log(document.getElementById("phone"));
console.log(document.getElementById("donor-list"));


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
let donations=JSON.parse(localStorage.getItem("donations")) || [];



cards.forEach(card => {
    card.addEventListener('click', () => {
        const cause = card.getAttribute('data-cause');
        selectedText.textContent = "Selected Cause: " + cause;
    });
});

function addDonorToList(name,amount,cause){
    console.log("Adding donor to list:", name, amount, cause);
    const li = document.createElement("li");
    li.textContent = `${name} - KES ${amount} - ${cause}`;
    donorList.appendChild(li);
}

function updateStats(){
    const total=donations.reduce((sum,d)=>{
        return sum + Number(d.amount);
    },0)

    const donorCount=donations.length;

    const causes = new Set(donations.map(d=>d.cause));

    if(homeTotal) {
        homeTotal.textContent = total;
    }
    if(homeDonors) {
        homeDonors.textContent = donorCount;
    }
    if(homeProjects) {
        homeProjects.textContent = causes.size;
    }
}





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
localStorage.setItem("donations", JSON.stringify(donations));
    
    statusText.textContent = "Processing your M-Pesa payment...";

    setTimeout(() => {
        statusText.textContent = "Payment successful! Thank you for your donation.";

        const total=donations.reduce((sum,d)=>{
    return sum + Number(d.amount);
},0)

totalDisplay.textContent = "Total Donations:" + total;




addDonorToList("You", amount, selectedCause);
updateStats();
}, 3000);
});
});

updateStats();

donations.forEach(d => {
    addDonorToList("Donor", d.amount, d.cause);
});





