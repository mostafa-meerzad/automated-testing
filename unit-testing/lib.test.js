const {
  absolute,
  greet,
  getCurrencies,
  getProduct,
  registerUser,
} = require("./lib");

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

  it ("should return a user object if valid userName is provided", () => {
    const result = registerUser("Mostafa");
    expect(result).toHaveProperty("userName", "Mostafa")
    expect(result).toMatchObject({userName: "Mostafa"})
  })
});
