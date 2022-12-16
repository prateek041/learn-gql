const express = require("express");

const app = express()

app.get("/", (req, res)=>{
  res.status(200).send("This is the test server")
})

app.listen(9090, console.log("Listening to port 9090"))