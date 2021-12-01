// File : index.js

const express = require("express");
const InitiateMongoServer = require("./config/db.js");
const user = require("./routes/user")
const student = require("./routes/student.js")
const cors = require("cors");


// Initiate Mongo Server
InitiateMongoServer();

const app = express();

// PORT
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());

app.use(cors());
app.use(express.urlencoded({
  extended: true
}))

app.get("/", (req, res) => {
  res.json({ message: "API Working" });
});




app.use("/user", user);
app.use("/api", student);



app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});