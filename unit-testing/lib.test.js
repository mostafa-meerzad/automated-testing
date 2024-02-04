const {
  absolute,
  greet,
  getCurrencies,
  getProduct,
  registerUser,
  applyDiscount,
} = require("./lib");

const lib = require("./lib");
const db = require("./db");
const mail = require("./mail");

describe("absolute", () => {
  it("should return a positive number if input is positive", () => {
    const result = absolute(1);
    expect(result).toBe(1);
  });

  it("should return positive number if input is negative", () => {
    const result = absolute(-1);
    expect(result).toBe(1);
  });

  it("should return 0 if input is 0", () => {
    const result = absolute(0);
    expect(result).toBe(0);
  });
});

describe("greet", () => {
  it("should return Hello Mostafa", () => {
    const result = greet("Mostafa");
    // below test is too specific and looks for an exact match and that is what causes the failing the test

    // expect(result).toBe("Hello Mostafa");
    // ------------------------------------
    // expect(result).toContain("Mostafa");
    expect(result).toMatch(/Mostafa/);
  });
});

describe("getCurrencies", () => {
  it("should return supported currencies", () => {
    const result = getCurrencies();
    // too generic tests
    // these tests passes as log that function returns anything other than "undefined"
    // expect(result).toBeDefined();
    // expect(result).not.toBeUndefined();
    // ----------------------------------------
    // too specific tests
    // expect(result.length).toBe(3)
    // expect(result[0]).toBe("USD");
    // expect(result[1]).toBe("AUD");
    // -----------------------------------

    // the proper way
    // expect(result).toContain("USD");
    // expect(result).toContain("AUD");
    // expect(result).toContain("EUR");
    // -------------------------
    // the ideal way
    expect(result).toEqual(expect.arrayContaining(["AUD", "USD", "EUR"])); // this matcher matches any array containing elements provided in the given array
  });
});

describe("getProduct", () => {
  it("should return the product with the given id", () => {
    const result = getProduct(1);
    // expect(result).toBe({id:1, price:10});
    // expect(result).toEqual({id:1, price:10});
    expect(result).toMatchObject({ id: 1 });
    expect(result).toHaveProperty("id", 1);
    expect(result).toHaveProperty("cat", "electronic");
  });
});

describe("registerUser", () => {
  it("should throw if userName is falsy", () => {
    // these are falsy values in JS and we need to test each one of theses values to ensure consistency
    // false
    // Null
    // NaN
    // Undefined
    // ""
    // 0

    // expect(() => {
    // registerUser(false);
    // }).toThrow();

    const args = [false, null, undefined, "", 0, NaN];
    args.forEach((arg) => {
      expect(() => {
        registerUser(arg);
      }).toThrow();
    });
  });

  it("should return a user object if valid userName is provided", () => {
    const result = registerUser("Mostafa");
    expect(result).toHaveProperty("userName", "Mostafa");
    expect(result).toMatchObject({ userName: "Mostafa" });
  });
});

describe("applyDiscount", () => {
  it("should apply 10% discount if the user has more than 10 points", () => {
    db.getCustomerSync = function (customerId) {
      // getCustomerSync = function(customerId){
      console.log("Fake reading user...");
      return { id: customerId, points: 11 };
    };
    const order = { customerId: 1, totalPrice: 10 };
    lib.applyDiscount(order);
    // applyDiscount(order)
    console.log(order.totalPrice);
    expect(order.totalPrice).toBe(9);
  });
});

describe("notifyCustomer", () => {
  it("should send an email to the customer", () => {
    // before calling notifyCustomer we need to mock it's dependencies
    // mock getting user
    db.getCustomerSync = function (customerId) {
      // console.log("fake customer")
      return { email: "fake@fake.com" };
    };
    // mock sending email
    let mailSent = false; // this is a flag that indicates whether the main.send mock-function actually called or not
    mail.send = function (email, message) {
      mailSent = true;
      console.log("your order was placed successfully faked");
    };

    lib.notifyCustomer({ customerId: 1 });
    expect(mailSent).toBe(true);
  });
});

describe("notify customer", () => {
  it("should send an email to the customer", () => {
    db.getCustomerSync = jest.fn().mockReturnValue({ email: "test@test.com" });

    mail.send = jest.fn();

    lib.notifyCustomer({ customerId: 1 });
    // console.log(mail.send.mock.calls[0][1]);
    expect(mail.send).toHaveBeenCalled();
    expect(mail.send.mock.calls[0][0]).toMatch("@");
    expect(mail.send.mock.calls[0][1]).toMatch(/order/);
  });
});
