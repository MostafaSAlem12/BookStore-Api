
const mongoose = require("mongoose");

async function connectToDB(){

    try{
        await mongoose
        .connect(process.env.MONGO_URI);
        console.log("Connected To MongoDB...")
    } catch (error){
        console.log("Connection Failed To MongoDB!", error)
    }
}

module.exports = connectToDB;

// mongoose
// .connect(process.env.MONGO_URI)
// .then(() => console.log("Connected To MongoDB..."))
// .catch((error) => console.log("Connection Failed To MongoDB!", error))

//    ENV
// MONGO_URI=mongodb://127.0.0.1/bookStoreDB
// PORT=5000
// NODE_ENV=development
// JWT_SECRET_KEY = secretKey112233