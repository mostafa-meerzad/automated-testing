const request = require("supertest");
const { User } = require("../server");
let server;


describe("api/users/", () => {
  describe("GET/", () => {
    beforeEach(() => {
      server = require("../server").server;
    });
    afterEach(() => {
      if (server) {
        server.close();
      }
    });
    it("should return all users", async () => {
      await User.deleteMany({});
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
