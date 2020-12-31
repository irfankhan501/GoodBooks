const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const auth = require("./routes/auth");
const books = require("./routes/books");
const users = require("./routes/users");
const genres = require("./routes/genres");
const reviews = require("./routes/reviews");
const comments = require("./routes/comments");
const myBooks = require("./routes/myBooks")

const app = express();

const mongoURI = `mongodb://localhost:27017/goodbooks`;
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => {
    console.log("connection established with mongodb server online");
  })
  .catch((err) => {
    console.log("error while connection", err);
  });

app.use(express.json());
app.use(cors());


app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/books", books);
app.use("/api/genres", genres);
app.use("/api/reviews", reviews);
app.use("/api/comments", comments);
app.use("/api/mybooks", myBooks)

app.listen(8000, () => console.log("listening on 8000"));
