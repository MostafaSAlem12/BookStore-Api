const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const{verifyTokenAndAdmin} = require("../middlewares/verifyToken")
const {getAllAuthors,getAuthorById,createNewAuthor,updateAnAuthor,deletAuthor}= require("../controllers/authorController");

router.get("/", getAllAuthors)

router.get("/:id", getAuthorById)

router.post("/", verifyTokenAndAdmin,createNewAuthor);

router.put("/:id",verifyTokenAndAdmin,updateAnAuthor)

router.delete("/:id", verifyTokenAndAdmin,deletAuthor)

module.exports = router;