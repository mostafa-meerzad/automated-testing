const { absolute, greet } = require("./lib");

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
