const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { User, validateRegisterUser, validateLoginUser } = require("../models/User");


/**
 * @desc Register new User
 * @route /api/auth/register
 * @method POST
 * @access public
 */

router.post('/register', asyncHandler(async (req, res) => {
  const { error } = validateRegisterUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    res.status(400).json({ message: "this user already registered" })
  }
  user = new User({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    isAdmin: req.body.isAdmin
  });

  const result = await user.save();
  res.status(201).json(result);
}))


module.exports = router;