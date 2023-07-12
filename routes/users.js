const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const { User, validateUpdateUser } = require("../models/User")
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../middlewares/verifyToken")

/**
 * @desc Update User
 * @route /api/users/:id
 * @method PUT
 * @access private
 */

router.put("/:id", verifyTokenAndAuthorization, asyncHandler(async (req, res) => {
  const { error } = validateUpdateUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message })
  }

  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt)
  }

  const updatedUser = await User.findByIdAndUpdate(req.params.id, {
    $set: {
      email: req.body.email,
      password: req.body.password,
      username: req.body.username
    }
  }, { new: true }).select("-password");
  res.status(200).json(updatedUser);
}))

module.exports = router;