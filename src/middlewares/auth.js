const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new Error("token is not valid");
    }

    const decodedObj = jwt.verify(token, "DevTinder567$^&");
    const { _id } = decodedObj;

    // Use lean() to return plain JSON object
    const user = await User.findById(_id);

    if (!user) {
      throw new Error("user not found");
    }

    req.user = user;  // now it's safe JSON
    next();
    console.log("Cookie Set:", token);
  } catch (err) {
    res.status(400).send("Error " + err.message);
  }
};

module.exports = { userAuth };
