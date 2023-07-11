const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { User, validateRegisterUser, validateLoginUser } = require("../models/User");
const bcrypt = require("bcryptjs")


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

  //Hashing password 
  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt)
  user = new User({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    isAdmin: req.body.isAdmin
  });

  const result = await user.save();
  const token = null;
  const { password, ...other } = result._doc;
  res.status(201).json({ ...other, token });
}))


module.exports = router;