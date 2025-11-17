const express = require("express");

const app = express();


app.get("/hello", (req, res) => {
  res.send("get from server hello");
});


app.use("/hello", (req, res) => {
  res.send("hello from server hello");
});



// app.use("/hello/1", (req, res) => {
//   res.send("new");S
// });

// app.use("/manoj", (req, res) => {
//   res.send("hello from server manoj");
// });

// app.use((req, res) => {
//   res.send("hellod froh server");
// });

app.get("/user",()=>{

})

app.listen(3000, () => {
  console.log("server successfully started");
})