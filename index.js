const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/user/userRoutes");
const todoRoutes = require("./routes/todo/todoRoutes");
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/user", userRoutes);
app.use("/api/todo", todoRoutes);

mongoose
  .connect(
    "mongodb+srv://Shadq:FILOnumero1uno@cluster0.90imy.mongodb.net/todo?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  });

app.listen(8080, () => {
  console.log("The server is up");
});
