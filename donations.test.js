
const {
    donations,
    addDonation,
    getTotalDonations,
    getDonorCount,
    getUniqueCauses
} = require('./donations');

beforeEach(() => {
    donations.length =0;
});

test("adds a donation correctly",()=>{addDonation("Education",500,"0700000000");
    expect(donations.length).toBe(1);
    expect(donations[0].amount).toBe(500);
});

test("calculates total donations",()=>{
    addDonation("Education",100,"0700000000");
    addDonation("Health",200,"0700000001");
    expect(getTotalDonations()).toBe(300);
});

test("counts donors correctly",()=>{
    addDonation("Education",100,"0700000000");
    addDonation("Health",200,"0700000001");
    expect(getDonorCount()).toBe(2);
});
 
test("counts unique causes",()=>{
    addDonation("Education",100,"0700000000");
    addDonation("Health",200,"0700000001");
    addDonation("Education",150,"0700000002");
    expect(getUniqueCauses()).toBe(3);
});