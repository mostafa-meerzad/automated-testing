const { absolute } = require("./lib");

test("absolute should return a positive number if input is positive", () => {
  const result = absolute(1);
  expect(result).toBe(1);
});
