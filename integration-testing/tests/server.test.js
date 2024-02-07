const request = require("supertest");
const { User, app } = require("../server");

// lading the server object
//----------------------------------------------
// let server;
// describe("api/users/", () => {
//   describe("GET/", () => {
//     beforeEach(() => {
//       server = require("../server").server;
//     });
//     afterEach(async () => {
//       await User.deleteMany({});
//       if (server) {
//         server.close();
//       }
//     });
//     it("should return all users", async () => {

//       await User.insertMany([
//         { name: "User1", email: "user1@test.com" },
//         { name: "User2", email: "user2@test.com" },
//       ]);
//       const res = await request(server).get("/api/users");

//       expect(res.status).toBe(200);
//       expect(res.body.length).toBe(2);
//     });
//   });
// });
//----------------------------------------------
// the better way

describe("api/users/", () => {
  describe("GET/", () => {
    afterEach(async () => {
      await User.deleteMany({});
    });
    it("should return all users", async () => {
      await User.insertMany([
        { name: "User1", email: "user1@test.com" },
        { name: "User2", email: "user2@test.com" },
      ]);
      const res = await request(app).get("/api/users");
      // too generic tests
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      // better tests that can confirm we have the same users we just stored in DB 
      expect(res.body.some((user) => user.name === "User1" )).toBeTruthy()
      expect(res.body.some((user) => user.name === "User2" )).toBeTruthy()
    });
  });
});
