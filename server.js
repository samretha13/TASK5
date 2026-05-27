const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const User = require("./models/User");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/teamTracker")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.put("/users/:id", async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    { available: req.body.available },
    { new: true }
  );

  res.json(updatedUser);
});

app.post("/seed", async (req, res) => {
  await User.deleteMany();

  const users = await User.insertMany([
    { name: "Alex", available: true },
    { name: "Sophia", available: false },
    { name: "John", available: true }
  ]);

  res.json(users);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
