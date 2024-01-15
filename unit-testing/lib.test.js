const { absolute } = require("./lib");

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
