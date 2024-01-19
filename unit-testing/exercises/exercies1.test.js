const { fizzBuzz } = require("./exercise1");

describe("FizzBuzz", () => {
  it("should throw an exception if the input is not a number", () => {
    expect(() => {
      fizzBuzz("a");
    }).toThrow();
    expect(() => {
      fizzBuzz(null);
    }).toThrow();
    expect(() => {
      fizzBuzz(undefined);
    }).toThrow();
    expect(() => {
      fizzBuzz({});
    }).toThrow();
    expect(() => {
      fizzBuzz([]);
    }).toThrow();
  });

  it("should return FizzBuzz if the input is divisible by both 3 and 5 ", () => {
    const result = fizzBuzz(15);
    expect(result).toBe("FizzBuzz");
  });

  it("should return Fizz if the input is only divisible on 3", () => {
    const result = fizzBuzz(3);

    expect(result).toBe("Fizz");
  });

  it("should return Buzz if the input is only divisible on 5", () => {
    const result = fizzBuzz(5);
    expect(result).toBe("Buzz");
  });

  it("should return the input itself if the input is neither divisible on 3 nor 5", () => {
    const result = fizzBuzz(13);
    expect(result).toBe(13);
  });
});
