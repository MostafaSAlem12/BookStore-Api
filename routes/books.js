const express = require("express");
const router = express.Router();
const { getAllBooks, getBookById, createNewBook, updateBook, deletBook } = require('../controllers/bookController')
const { verifyTokenAndAdmin, verifyTokenAndAuthorization } = require('../middlewares/verifyToken')

router.get("/", getAllBooks)

router.get("/:id", getBookById)

router.post("/", verifyTokenAndAdmin, createNewBook)

router.put("/:id", verifyTokenAndAdmin, updateBook)

router.delete("/:id", verifyTokenAndAdmin, deletBook)


module.exports = router;