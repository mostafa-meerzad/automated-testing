module.exports.getCustomerSync = function (id) {
  console.log("reading a customer from DB...");
  return { id, points: 10, email: "test@test.com"};
};

module.exports.getCustomer = async function (id) {
  return new Promise((resolve, reject) => {
    console.log("reading a customer from DB...");
    resolve({ id, points: 10, email: "test@test.com" });
  });
};
