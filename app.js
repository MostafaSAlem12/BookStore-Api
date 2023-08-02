const express = require("express");
const logger = require('./middlewares/logger')
const connectToDB =require('./config/db')
require("dotenv").config();
const { notFound, errHandler } = require("./middlewares/errors");
const { setRandomFallback } = require("bcryptjs");

//connection to Database
connectToDB();

//init App
const app = express();

// Apply Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(logger);
app.set('view engine','ejs')

//Routes 
app.get('/', (req, res) => {
  res.send("WELCOME IN BOOKstore API  ")
})
app.use("/api/books", require("./routes/books"))
app.use("/api/authors", require("./routes/authors"))
app.use("/api/auth", require("./routes/auth"))
app.use("/api/users", require("./routes/users"))
app.use("/password",require('./routes/password'));

// Error Handling
app.use(notFound);
app.use(errHandler);
// running server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server is running in ${process.env.NODE_ENV} mode on port ${PORT}`))