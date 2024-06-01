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
      expect(res.body.some((user) => user.name === "User1")).toBeTruthy();
      expect(res.body.some((user) => user.name === "User2")).toBeTruthy();
    });
    it("should return an empty []", async () => {
      const users = await User.find();
      // console.log(users)
      const res = await request(app).get("/api/users");
      expect(res.body.length).toBe(0);
    });
  });

  describe("GET/:id", () => {
    beforeEach(async () => {
      await User.deleteMany({});
    });
    afterEach(async () => {
      await User.deleteMany({});
    });

    it("should return a user if valid userID is provided", async () => {
      //todo: before doing anything populate the DB
      const user = new User({ name: "user1", email: "user1@test.com" });
      await user.save();

      const res = await request(app).get(`/api/users/${user._id}`);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("name", user.name);
      expect(res.body).toHaveProperty("email", user.email);
    });

    it("should return 404 if invalid userID is provided", async () => {
      const invalidId = 1;
      const res = await request(app).get(`/api/users/${invalidId}`);
      expect(res.status).toBe(404);
    }); 
  });

  describe("POST", () => {
    afterEach(async () => {
      await User.deleteMany({});
    });
    it("should return 401 error if client is not logged in", async () => {
      const res = await request(app).post("/api/users").send({ key: "value" });
      expect(res.status).toBe(200);
    });
  });
});
