const { getCustomerSync } = require("./db");
const db = require("./db");
const mail = require("./mail");
// Testing Numbers
module.exports.absolute = function (num) {
  // if(num > 0)return num;
  // if(num < 0)return -num;
  // return 0
  // change the implementation
  // if(num >= 0)return num;
  // return -num
  // change the implementation
  return num < 0 ? -num : num;
};

module.exports.greet = function (name) {
  return "Hello " + name + "!";
};

module.exports.getCurrencies = function () {
  return ["USD", "AUD", "EUR"];
};

module.exports.getProduct = function (productId) {
  return { id: productId, price: 10, cat: "electronic" };
};

// testing exception

module.exports.registerUser = function (userName) {
  if (!userName) throw new Error("userName is required");

  return { id: Date(), userName };
};

// Mock functions

module.exports.applyDiscount = function (order) {
  const customer = db.getCustomerSync(order.customerId);
  //   const customer = getCustomerSync(order.customerId);
  if (customer.points > 10) {
    order.totalPrice *= 0.9;
  }
};

module.exports.notifyCustomer = function (order) {
  const customer = db.getCustomerSync(order.customerId);
  mail.send(customer.email, "your order was placed successfully.");
};
