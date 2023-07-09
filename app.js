const express = require("express");
const booksPath = require("./routes/books");
const authorsPath = require("./routes/authors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config()

//connection to Database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected To MongoDB..."))
  .catch((error) => console.log("Connection Failed To MongoDB!", error))
//init appeed
const app = express();

// Apply Middlewares
app.use(express.json());

//Routes 
app.get('/', (req, res) => {
  res.send("WELCOME IN BOOKstore API  ")
})
app.use("/api/books", booksPath)
app.use("/api/authors", authorsPath)

// running server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server is running in ${process.env.NODE_ENV} mode on port ${PORT}`))