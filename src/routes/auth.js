const express = require("express");

const authRouter = express.Router();

const User = require("../models/user");

const bcrypt = require("bcrypt");

const { ValidateSignupData } = require("../utils/validation");


authRouter.post("/signup", async (req, res) => {
  try {
    ValidateSignupData(req);
    console.log(req.body, "req.body");
    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save(); // Run validation FIRST
    return res.send("user added successfully");
  } catch (err) {
    return res.status(400).send("error saving data: " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    console.log(emailId + "  " + password);
    // find user
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      return res.status(400).send("Invalid credentials");
    }
    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      //
      const token = jwt.sign({ _id: user._id }, "DevTinder567$^&");
      console.log(token);

      // add the token to cookie and send the response back to server
      res.cookie("token", token);
      console.log("Cookie Set:", token);
      res.send("Login successful");
    }
    if (!isPasswordValid) {
      return res.status(400).send("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

module.exports = authRouter;
