const express = require("express");
const booksPath = require("./routes/books");
const authorsPath = require("./routes/authors");
const logger = require('./middlewares/logger')
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { notFound, errHandle } = require("./middlewares/errors");
dotenv.config()

//connection to Database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected To MongoDB..."))
  .catch((error) => console.log("Connection Failed To MongoDB!", error))
//init App
const app = express();

// Apply Middlewares
app.use(express.json());
app.use(logger);



//Routes 
app.get('/', (req, res) => {
  res.send("WELCOME IN BOOKstore API  ")
})
app.use("/api/books", booksPath)
app.use("/api/authors", authorsPath)

// Error Handling
app.use(notFound);
app.use(errHandle);
// running server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server is running in ${process.env.NODE_ENV} mode on port ${PORT}`))