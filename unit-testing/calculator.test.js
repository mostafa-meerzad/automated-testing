const { sumOfThreeNumbers } = require("./calculator");
const math = require("./math");

test("sumOfThreeNumbers adds three numbers correctly", () => {
  math.add = jest.fn().mockImplementation((a, b) => a + b);
  expect(sumOfThreeNumbers(1, 2, 3)).toBe(6);
  expect(math.add).toHaveBeenCalled();
  expect(math.add.mock.calls[0][0]).toBe(2);// first argument of first call
  expect(math.add.mock.calls[0][1]).toBe(3);// second argument of first call
  expect(math.add.mock.calls[1][0]).toBe(1);// first argument of second call
});
