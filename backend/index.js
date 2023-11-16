const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectToMongo = require("./config/db.js");

connectToMongo();

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 5001;

app.get("/", (req, res) => {
  return res.status(200).send("Welcome To Back-End");
});

app.use("/user", require("./routes/user.js"));
app.use("/department", require("./routes/department.js"));
app.use("/role_type", require("./routes/role_type.js"));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
