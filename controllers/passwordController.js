const asyncHandler = require("express-async-handler");
const {User} = require("../models/User")
const jwt = require('jsonwebtoken')

/**
 * @desc Get Forgot Password
 * @route /password/forgot-password
 * @method GET
 * @access public
 */

module.exports.getForgotPasswordView = asyncHandler((req, res) => {
    res.render('forgot-password');
})

/**
 * @desc Send forgot password link
 * @route /password/forgot-password
 * @method POST
 * @access public
 */

module.exports.sendForgotPasswordLink = asyncHandler( async (req, res) => {
    console.log(req.body.email);
   const user = await User.findOne({email: req.body.email})
   if(!user){
    return res.status(404).json({message : 'User Not Found'})
   }
   const secret = process.env.JWT_SECRET_KEY + user.password; 
   const token = jwt.sign({email:user.email, id: user.id},secret)
})