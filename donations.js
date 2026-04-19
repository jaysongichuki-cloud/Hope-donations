let donations = [];
const phone = "0700000000";

function addDonation(name, amount, cause) {
    const donation = {cause, amount:Number(amount),phone};
    donations.push(donation);
    return donation;
}

function getTotalDonations() {
    return donations.reduce((sum,d) => sum + d.amount, 0);
}

function getDonorCount() {
    return donations.length;
}

function getUniqueCauses() {
    return new Set(donations.map(d => d.cause)).size;
}

module.exports = {
    donations,
    addDonation,
    getTotalDonations,
    getDonorCount,
    getUniqueCauses
};