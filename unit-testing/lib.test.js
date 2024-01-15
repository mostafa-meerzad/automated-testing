const { absolute, greet, getCurrencies } = require("./lib");

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
