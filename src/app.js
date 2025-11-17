const express = require("express");

const app = express();

app.use("/manoj", (req, res) => {
  res.send("hello from server manoj");
});

app.use((req, res) => {
  res.send("hellod froh server");
});

app.listen(3000, () => {
  console.log("server successfully started");
})