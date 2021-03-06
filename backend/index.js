const express = require('express');
const cors = require("cors");
const { dbConnection } = require("./db/db");
const Role = require("./routes/role");
const Board = require("./routes/board");
const User = require("./routes/user");
const Task = require('./routes/task');
const path = require("path");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/role", Role);
app.use("/api/user", User);
app.use("/api/board", Board);
app.use('/api/task',Task);
app.use("/uploads", express.static("uploads"));
app.use(express.static("public"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public/index.html"));
});

app.listen(process.env.PORT, () =>
  console.log("Backend server running on port: " + process.env.PORT)
);

dbConnection();
