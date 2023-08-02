const express = require("express");
const router = express.Router();
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../middlewares/verifyToken")
const { updateUser, getAllUser, getUserById, deletUserById } = require("../controllers/userController")


router.put("/:id", verifyTokenAndAuthorization, updateUser);

router.get("/", verifyTokenAndAdmin, getAllUser)

router.get("/:id", verifyTokenAndAuthorization, getUserById)

router.delete("/:id", verifyTokenAndAuthorization, deletUserById)

module.exports = router;