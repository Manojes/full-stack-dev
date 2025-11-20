const express = require("express");

const profileRouter = express.Router();

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    // const cookies = req.cookies;
    // const { token } = cookies;
    // const decodedMessage = jwt.verify(token, "DevTinder567$^&");
    // const { _id } = decodedMessage;
    // const findUser = await User.findById(_id);

    // all the above commented lines are there in auth middleware

    const user = req.user;
    console.log(req.user);
    res.send(user);
  } catch (err) {
    res.status(400).send("ERror" + err.message);
  }
});