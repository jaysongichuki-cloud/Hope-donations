console.log("Js is running");
console.log(document.getElementById("phone"));
console.log(document.getElementById("donor-list"));

let donations = [];
const cards=document.querySelectorAll('.donate-card');
const selectedText = document.getElementById('selected-cause');
const amountInput = document.getElementById('amount');
const conversionResult = document.getElementById('conversion-result');

const totalDisplay = document.getElementById("total-donations")



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
    const phone= document.getElementById("phone").value

    fetch(`https://api.exchangerate-api.com/v4/latest/KES`)
        .then(response => response.json())
        .then(data => {
            const rate = data.rates.USD;

            const converted = amount * rate;

            conversionResult.textContent = `Converted Amount: $${converted.toFixed(2)}`;

            const selectedCause= document.getElementById("selected-cause").textContent;
            const donation = {
                cause: selectedCause,
                amount: amount,
                phone: phone
            };

donations.push(donation);
    
    statusText.textContent = "Processing your M-Pesa payment...";

    setTimeout(() => {
        statusText.textContent = "Payment successful! Thank you for your donation.";

        const total=donations.reduce((sum,d)=>{
    return sum + Number(d.amount);
},0)

totalDisplay.textContent = "Total Donations:" + total +"KES";
    }, 3000);
});
});




const donorList = document.getElementById("donor-list");

fetch("https://jsonplaceholder.typicode.com/users")
.then(response => response.json())
.then(users=>{
    users.slice(0,5).forEach(user=>{
        const li = document.createElement("li");
        li.textContent=user.name;

        donorList.appendChild(li)
    });
});

function addDonorToList(name,amount,cause){
    const li = document.createElement("li");
    li.textContent = `${name} - KES ${amount} - ${cause}`;
    donorList.appendChild(li);
}

addDonorToList(
    phone,
    amount,
    selectedCause.replace("Selected Cause: ","")
);