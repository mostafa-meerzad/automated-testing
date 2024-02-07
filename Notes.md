# Automated Testing

## What is automated-testing

The practice of writing code to tests our code, and then run those tests in an automated fashion.

with automated-testing our source code consists of

- source/production code
- test code

### manual testing

Imagine you have a function in your application that takes a value and returns different results based on some conditions, to test that manually you need to:

- launch your application on the browser
- perhaps log-in
- navigation you may need to do a few clicks here and there
- fill out the form and submit
- verify the results

this process can take quite some time

### automated testing

you can directly call that function with different values and verify the results directly in the source-code

## Benefits of automated testing

- test your code frequently
- catch bugs before deploying
- deploy with confidence
- refactor with confidence
  -\*refactoring\*\* means changing the structure of your code without changing its behavior.

  - extracting a few lines of code from a method into a private method.
  - renaming a method

  after refactoring your code you need to test the application to ensure that nothing broke, doing so with manual testing is time consuming and difficult to do but with automated-testing you can easily run all the related tests and make sure everything works.

- focus more on quality

## Types of tests

### Unit Test

Tests a unit of an application without its **external dependencies**, i,e database, message-que, files, web-services etc...

- cheap to write, you can write more test in less time
- execute fast, you can execute a lot of unit-test in less time
- doesn't give a lot of confidence, because your are testing your app without it's external dependencies it doesn't give confidence of your application working properly.

### Integration Tests

Tests an application or class of an application with it's **external dependencies**

- takes longer to execute because involves reading/writing to a database or other services.
- give confidence about the behavior of your application.

testing a few parts of your application as a whole is not an **integration test** this is a poor way to define integration tests

**Note**: A unit-test tests a unit of work wither it is a single function/class or a combination of classes. on the other hand an Integration-test tests a single function/class or a combination of functions/classes with their **external dependencies**.

### End-To-End Tests

Tests an application through it's UI. there are tools that drive the application through it's UI and recodes user interactions then plays it back so you can see and make sure that your application is working properly.

- give the greatest confidence
- slow to run, you need to go through each step for the recording
- very brittle, even a small change in the UI can break these tests

### Which kind fo these tests do we need to have in our application

We need all of those test types in our application but the ration between **unit tests**, **integration tests** and **end-to-end tests** is different for each project.

there is a thing called testing-pyramid

![test pyramid](./assets/testPyramid.png)

majority of tests should be **unite-test** beside that you should include a bunch of **integration-tests** to ensure that the your application works fine with it's external dependencies and a few **E2E** tests for the final testing.

**Note**: In the package.json under **scrips** object change **test** from it's default values to **jest** so you can start testing with jest by running this command.

**Naming Convention**: files that ends with _test|spec_ will be executed by **Jest** to run tests.

**Note**: Note: the number of test should be greater than or equal to the number of execution paths

## Unit-Testing

Jest is a popular JavaScript testing framework used for testing JavaScript code, including React applications. In Jest, a "test" is a function that defines a set of assertions to verify that a piece of code behaves as expected. The `test` function is a global function provided by Jest for defining individual test cases.

Here's a basic example of how the `test` function is used in Jest:

```javascript
// myModule.test.js

const myModule = require("./myModule");

test("adds 1 + 2 to equal 3", () => {
  expect(myModule.add(1, 2)).toBe(3);
});
```

In this example:

1. The `test` function is used to define a test case.
2. The first argument to the `test` function is a string that describes what the test is checking. In this case, it's checking if the `add` function of `myModule` correctly adds 1 and 2 to equal 3.
3. The second argument is a function that contains the actual test code. This function typically contains one or more assertions.

Inside the test function, you'll often see the use of Jest's `expect` function along with various matcher functions. Matchers are functions that check whether a value meets certain conditions. In the example, `toBe` is a matcher that checks if the result of `myModule.add(1, 2)` is exactly equal to `3`.

Jest provides a variety of matchers for different types of assertions. Some common ones include:

- `toBe(value)`: Checks if the value is exactly equal to the expected value.
- `toEqual(value)`: Checks if the value is deeply equal to the expected value.
- `toBeTruthy()`: Checks if the value is truthy.
- `toBeFalsy()`: Checks if the value is falsy.
- `toContain(item)`: Checks if an array or string contains the specified item.

These are just a few examples, and Jest has many more matchers that you can use to create expressive and powerful tests for your JavaScript code.

### Grouping tests

As we write more tests i becomes more and more confusing to to look at and try to figure out what is what, specially for other programmers.

![first class citizens](./assets//testsAreFirstClassCitizens.png)

Note: _if you are gonna write missy and unmaintainable tests it is better to NOT WRITE at all_

### Testing Numbers

```js
test("absolute - should return a positive number if input is positive", () => {
  const result = absolute(1);
  expect(result).toBe(1);
});

test("absolute - should return positive number if input is negative", () => {
  const result = absolute(-1);
  expect(result).toBe(1);
});

test("absolute - should return 0 if input is 0", () => {
  const result = absolute(0);
  expect(result).toBe(0);
});
```

Jest provides `describe` function which is used to group related tests, also there is `it` function which replaces `test` function inside `describe` function and makes reading tests a whole lot easier just like plain English.

```js
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
```

### Refactor with confidence

With having tests in place you don't need to worry about the code you write unless you change the behavior of your code.

here we're implementing the same logic in different ways keeping the behavior of the function unchanged.

```js
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
```

### Testing Strings

When testing strings the tests should neither be too specific nor too general

`function to be tested`

```js
module.exports.greet = function (name) {
  return "Hello " + name;
};
```

`tests`

```js
describe("greet", () => {
  it("should return Hello Mostafa", () => {
    const result = greet("Mostafa");
    expect(result).toBe("Hello Mostafa");
    // the value in give to "toBe" checker is too specific and will break with smallest change
  });
});
```

### Testing Arrays

In testing arrays your tests should neither be too specific nor too general and that is the key to write good and maintainable tests.

`code to be tested`

```js
module.exports.getCurrencies = function () {
  return ["USD", "AUD", "EUR"];
};
```

`the tests`

```js
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
```

### Testing Objects

In testing Objects your tests should be neither too specific nor too generic.

the sample code

```js
module.exports.getProduct = function (productId) {
  return { id: productId, price: 10, cat: "electronic" };
};
```

the tests

```js
describe("getProduct", () => {
  it("should return the product with the given id", () => {
    const result = getProduct(1);
    expect(result).toBe({ id: 1, price: 10 }); // this test fails because it compares two similar objects in different locations of memory

    expect(result).toEqual({ id: 1, price: 10 }); // this test checks key-value pairs of each objects to be the same

    expect(result).toMatchObject({ id: 1 }); // checks if the provided object has a subset of the given object

    expect(result).toHaveProperty("id", 1); // checks if the provided key-value pair exists on the target object
    expect(result).toHaveProperty("cat", "electronic");
  });
});
```

### Testing Exceptions

for testing exceptions we need to take another approach;

the code

```js
module.exports.registerUser = function (userName) {
  if (!userName) throw new Error("userName is required");

  return { id: Date(), userName };
};
```

the test

```js
describe("registerUser", () => {
  // to properly test this exception we need to run a test on every falsy value in JS:
  // false
  // Null
  // NaN
  // Undefined
  // ""
  // 0
  it("should throw if userName is falsy", () => {
    // for testing an exception we need to pass a callback function to the "expect" function which is calling the code that throws an exception and use the "toThrow" matcher function
    expect(() => {
      registerUser(false);
    }).toThrow();
  });
});
```

one thing about the cases that we are dealing with multiple values and need to run the tests on each and every one of them we need to use **Parameterized Tests** this way we don't need to repeat ourselves.

**Note**: Jest doesn't support parameterized tests out of the box.

for that reasons we need to work around it:

```js
describe("registerUser", () => {
  it("should throw if userName is falsy", () => {
    const args = [false, null, undefined, "", 0, NaN];
    args.forEach((arg) => {
      expect(() => {
        registerUser(arg);
      }).toThrow();
    });
  });
});
```

### Continuously Running Tests

To make Jest keep running tests while developing your application you need to add `--watchAll` flag in the **scripts** section of **package.json** file like following:

```json
  "scripts": {
    "test": "jest --watchAll"
  },
```

now if when you type `npm test` in the terminal **Jest** runs all of your tests at beginning and then watches for changes in your **source** or **test** codes and every time you save changes jest runs all your tests.

### Mocking an external resource call

if the function you are dealing with has some external dependencies we need to mock (fake) those dependencies otherwise we're not writing **unit test** that would be **integration test**.

mocking functions in **vanilla Js** is easy you just need to overwrite it.

this is the function that is calling a database to get a customer and then if user has enough points their order will get 10% discount

```js
module.exports.applyDiscount = function (order) {
  const customer = getCustomerSync(order.customerId);
  if (customer.points > 10) {
    order.totalPrice *= 0.9;
  }
};
```

we are going to mock this `getCustomerSync` function and it will look exactly like it's original function.

1.  first import the module that contains that function

    ```js
    const lib = require("./lib");
    const db = require("./db");
    ```

2.  overwrite imported function with another function

    ```js
    describe("apply discount", () => {
      it("should apply 10% discount if the user has more than 10 points", () => {
        db.getCustomerSync = function (customerId) {
          console.log("Fake reading user...");
          return { id: customerId, points: 11 };
        };
        const order = { customerId: 1, totalPrice: 10 };
        lib.applyDiscount(order);
        console.log(order.totalPrice);
        expect(order.totalPrice).toBe(9);
      });
    });
    ```

**Note**: for this kind of mocking functions you need to import the module itself in every place it's functions are being used if you **named import** them in this way `const { getCustomerSync } = require("./db");` and then just use `getCustomerSync` it is not going to work! you must use `lib.getCustomerSync` instead to make it work to have a single place to reference.

**Note**: we mock dependencies because:

- first we are writing unit-tests not integration-tests
- those dependencies might not be up and running while we run our unit-tests
- unit-tests will execute much faster

### The Need Of Mocking

Mocking functions is a common practice in writing tests for applications, primarily used to isolate the piece of code being tested and to control the behavior of external dependencies or complex parts of the system. This isolation is crucial for creating reliable and deterministic tests. Here are several reasons why we need to mock functions:

1. **Isolation of the System Under Test**: In unit testing, the goal is often to test pieces of code (units) in isolation from the rest of the system. Mocking allows you to replace dependencies of the unit under test with controlled and predictable implementations. This way, you can ensure the test only evaluates the functionality of the unit itself, not the dependencies.

2. **Control Over External Dependencies**: External dependencies such as databases, network services, or third-party APIs can introduce unpredictability into tests. They may be slow, unreliable, or have their own set of complexities. Mocking these dependencies allows tests to run quickly and reliably, as the external services are simulated rather than actually invoked.

3. **Deterministic Tests**: Tests need to be deterministic, meaning they should produce the same results if run multiple times under the same conditions. External dependencies can cause tests to be flaky or nondeterministic due to variability in their responses or states. By mocking these dependencies, you can ensure the inputs and outputs are consistent, leading to deterministic tests.

4. **Testing Error Conditions**: Mocking allows you to simulate error conditions or edge cases that might be difficult or impossible to trigger with actual dependencies. For example, you can mock a database connection failure or an API returning a 500 error. This helps in ensuring your application can gracefully handle failures.

5. **Simplifying Test Setup**: Setting up real dependencies can be cumbersome and time-consuming. For instance, to test against a real database, you would need to ensure the database is in the expected state before each test runs. Mocking these dependencies simplifies test setup and teardown, making tests easier to write and maintain.

6. **Focusing on the Interface rather than the Implementation**: When you mock a function or a service, you are essentially saying, "Assuming the dependency works as expected, does my code do the right thing?" This allows developers to focus on the interface between components rather than the internal workings of their dependencies.

### How to Mock Functions

Different programming languages and test frameworks offer various tools for mocking. For example:

- In JavaScript, libraries such as Jest provide extensive mocking capabilities, including automatic mocks, manual mocks, and spy functions.
- In Python, the `unittest.mock` module offers a powerful way to mock objects, allowing you to replace parts of your system under test with mock objects and make assertions about how they have been used.
- In Java, frameworks like Mockito and JMockit allow developers to create mock objects, specify behaviors, and verify interactions in a straightforward manner.

Using these tools, developers can create mock implementations of functions or services that simulate the behavior of real dependencies, adhering to the principle of testing units of code in isolation.

### Creating mock function with jest

In jest there is a method `jest.fn()` this method returns a mock function when we call it and that mock function is just an implementation of function "a function with no code" which means we can define what it should accept/return:

- mockFunction.mockReturnValue(value): with this method you can set the return value for the mocked function
- ockFunction.mockResolvedValue("hello"): creates a resolved-promise with the given value
- mockFunction.mockRejectedValue(new Error("something went WRONG!!!")): creates a rejected-promise with the given value

```js
const mockFunction = jest.fn();
mockFunction.mockReturnValue(1);
console.log(mockFunction());
```

```js
describe("notify customer", () => {
  it("should send an email to the customer", () => {
    db.getCustomerSync = jest.fn().mockReturnValue({ email: "test@test.com" });

    mail.send = jest
      .fn()
      .mockReturnValue("your order was placed successfully: mocked");

    lib.notifyCustomer({ customerId: 1 });
    expect(mail.send).toHaveBeenCalled(); // this matcher ensures that our mocked function will be called
    expect(mail.send).toHaveBeenCalledWith("test@test.com", "..."); // if the mocked function needs to receive the exact argument when called
  });
});
```

## Integration-Testing

Integration testing is the process of testing modules of an application with it's dependencies included to ensure
the application works as expected.

for testing **express** apps we use `supertest` package that allows us to make http requests to our server while testing:

**Note**: try to follow this patter for organizing the test-suites when it comes to integration tests specially testing endpoints:

```js
describe("the/route", () => {
  // this test-suite is for the specific endpoint
  describe("METHOD/", () => {
    // while this suite is for each method
    // inside this all our assertions is going to reside
  });
});
```

### Organizing Test-Suites The Why/s

The pattern of organizing tests using nested `describe` blocks in testing frameworks like Jest or Mocha is a powerful way to structure your tests. It allows you to create a hierarchy or grouping of tests that logically organizes them based on functionality, endpoints, methods, or any other criteria you find useful. This can significantly enhance the readability and maintainability of your test suite, especially as it grows in size and complexity.

#### Benefits of Nested `describe` Blocks:

1. **Logical Grouping**: You can group tests by functionality, making it easier to navigate the test suite. For instance, grouping all tests related to `GET` requests on the `/api/users/` endpoint together, as in your example, immediately tells anyone reading the tests the functionality being tested.

2. **Setup and Teardown Scope**: Nested `describe` blocks allow you to apply `beforeEach`, `afterEach`, `beforeAll`, and `afterAll` hooks scoped to that block. This is incredibly useful for setting up preconditions or cleanup that are specific to a subset of tests.

3. **Readable Test Output**: The hierarchical structure of nested `describe` blocks translates into a more readable and organized output when tests are run, making it easier to identify which parts of your application are affected by test failures.

4. **Focused Testing**: With Jest and similar frameworks, you can run tests matching a specific `describe` block's name using test runner options. Nested blocks make it easier to focus on a specific area of your application during development or debugging.

#### When to Use Nested `describe` Blocks:

- **By Feature or Endpoint**: When testing a REST API or a complex application, you might group tests by endpoint or feature. For example, all tests for the `/api/users` endpoint can be under one `describe` block, with nested `describe` blocks for `GET`, `POST`, `PUT`, `DELETE`, etc.

- **By Functionality**: For unit tests, you might group tests by the functionality or method being tested. Each method of a class or module could have its own `describe` block.

#### Example Structure:

```javascript
describe("api/users", () => {
  describe("GET /", () => {
    // Setup specific to GET /api/users
    beforeEach(() => {});

    it("should return all users", async () => {
      // Test implementation
    });

    // More GET tests...
  });

  describe("POST /", () => {
    // Setup specific to POST /api/users
    beforeEach(() => {});

    it("should create a new user", async () => {
      // Test implementation
    });

    // More POST tests...
  });

  // Additional nested describes for PUT, DELETE, etc.
});
```

#### Single vs. Nested `describe` Blocks:

- **Single `describe` Block**: Sufficient for very small modules or when you're testing a feature that doesn't have multiple logical subdivisions. It keeps things simple but can become unwieldy as the number of tests grows.

- **Nested `describe` Blocks**: Better for most practical purposes, as they offer more organizational benefits, making your tests scalable and easier to manage over time.

#### Conclusion:

Nested `describe` blocks are generally preferred for their organizational benefits, especially in larger test suites. They offer a structured approach to arrange your tests in a logically grouped hierarchy, improving readability and maintainability. The choice between using single or nested `describe` blocks ultimately depends on the complexity and size of the feature or functionality being tested.

### preparing the app for integration tests

1. your app export `app.listen(PORT, CB)` this is a server object which will be used to connect to server in tests:

```js
const server = app.listen("4000", () => {
  console.log("listening on port 4000");
});

module.exports = server;
```

2. import the server-object into your test-file:

```js
let server;

describe("the/path/", () => {
  describe("METHOD/", () => {
    beforeEach(() => {
      server = require("path/to/server-object");
    });
    afterEach(() => {
      server.close();
      await User.deleteMany({});
    });
     it("should return all users", async () => {
      await User.insertMany([
        { name: "User1", email: "user1@test.com" },
        { name: "User2", email: "user2@test.com" },
      ]);
      const res = await request(server).get("/api/users");

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
    });
  });
});
```

**Note**: why to import server-object this way:

when ever we make a change to the code **jest** will run test tests once again causing the server to be called again without closing it from the previous call and that leads to an **exception** to happen, to prevent this from happening we import the **server-object** in the `beforeEach` method and closing it in `afterEach` method these methods take a call-back and executes it before or after each test-case.

**Note**: the other way

```js
const express = require("express");
const app = express();

// Define middleware, routes, etc.
app.get("/api/users", (req, res) => {
  // Example response, replace with actual logic
  res.json([
    { name: "User1", email: "user1@test.com" },
    { name: "User2", email: "user2@test.com" },
  ]);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = app;
```

we only need to export the app itself not the running server

```js
const request = require("supertest");
const { app } = require("path/to/app");

describe("the/path", () => {
  describe("METHOD/", () => {
    it("should return all users", async () => {
      await User.deleteMany({});
      await User.insertMany([
        { name: "User1", email: "user1@test.com" },
        { name: "User2", email: "user2@test.com" },
      ]);
      const res = await request(app).get("/api/users");

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
    });
  });
});
```

in this approach we don't need to manually close the server after each test the **supertest** handles all this for us.

**best practices**:

1.  whenever we change the state of application (e.g, dataBase) clean-up after.
2.  treat every test as if it is the ONLY test in your application

