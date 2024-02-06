const mongoose = require("mongoose");
const express = require("express");

const app = express();
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/integrationTestDB")
  .then(() => {
    console.log("connected to DB");
  })
  .catch(() => {
    console.log("something went wrong");
  });

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: {
      type: String,
      minlength: 5,
      maxlength: 55,
    },
    email: {
      type: String,
      minlength: 6,
      maxlength: 255,
    },
  })
);

app.get("/api/users", async (req, res) => {
  //todo: get all users
  const users = await User.find();
  if (!users) return res.status(404).send("no users!");
  return res.send(users);
});

app.get("/api/users/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).send("no such user");
  return res.send(user);
});

app.post("/api/users", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send(user);
});

app.delete("/api/users/:id", async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    return res.status(404).send("no user found to delete");
  }
  return res.send(user);
});

const server = app.listen("4000", () => {
  console.log("listening on port 4000");
});

module.exports.User = User
module.exports.server = server