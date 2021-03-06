const express = require("express");
const cors = require("cors");
const router = require("./routers/userRouter");
var bodyParser = require("body-parser");
const auth = require("./middlewares/authUser");

const app = express();
require("dotenv").config();

const port = process.env.PORT || 6000;
app.use(
  cors()
);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");


// Database Connection
require("./DB/db");

// Routing
app.use("/api", router);

app.get('/',auth, (req, res) => {
  res.send("yes")
})

// Server Connection
app.listen(port, () => {
  console.log("Server is Running Port " + port);
});
