const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");
const { ValidateSignupData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

app.use(express.json());
app.use(cookieParser());
// getting the details from the user and saving it into DB and
// sending the repsonse back to FE that user added successfully



//get  - get user by email (from email id getting the object)
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const users = await User.find({ emailId: userEmail });
    if (users.length === 0) {
      res.status(404).send("user not found" + err.message);
    }
    // console.log(users, "user");
    res.send(users);
  } catch {
    res.status(400).send("something went wrong" + err.message);
  }
});

//get FEED API - get all users fromDB
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      res.status(404).send("user not found" + err.message);
    }
    // console.log(users, "user");
    res.send(users);
  } catch {
    res.status(400).send("something went wrong" + err.message);
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId; // it is coming from postman in this scenairo
  try {
    const user = await User.findByIdAndDelete({ _id: userId });
    res.send("user deleted succesfully");
  } catch (err) {
    res.status(400).send("something went wrong" + err.message);
  }
});

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  // console.log("PATCH received userId:", userId);

  const ALLOWED_UPDATES = [
    "firstName",
    "lastName",
    "photoUrl",
    "about",
    "gender",
    "age",
    "skills",
  ];

  const isUpdatedAllowed = Object.keys(data).every((k) =>
    ALLOWED_UPDATES.includes(k)
  );

  if (!isUpdatedAllowed) {
    return res.status(400).send("update not allowed");
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
      runValidators: true,
    });
    if (!updatedUser) {
      return res.status(404).send("User not found");
    }

    return res.send(updatedUser, "user updated");
  } catch (err) {
    return res.status(400).send("something went wrong: " + err.message);
  }
});

connectDB()
  .then(async () => {
    try {
      await User.syncIndexes(); // <--- UNIQUE INDEX IS CREATED HERE
      // console.log("User indexes synced");
    } catch (err) {
      // console.error("Index sync error:", err);
    }
    app.listen(7777, () => {
      console.log("sever successfullt connected on port 7777");
    });
  })
  .catch((err) => {
    console.error("DB cannot be connected", err);
  });
