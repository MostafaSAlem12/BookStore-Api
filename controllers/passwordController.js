const asyncHandler = require("express-async-handler");
const { User } = require("../models/User")
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

module.exports.sendForgotPasswordLink = asyncHandler(async (req, res) => {
    console.log(req.body.email);
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return res.status(404).json({ message: 'User Not Found' })
    }
    const secret = process.env.JWT_SECRET_KEY + user.password;
    const token = jwt.sign({ email: user.email, id: user.id }, secret, { expiresIn: '10m' })


    const link = `http://localhost:5000/password/reset-password/${User._id}/${token}`;

    res.json({ message: 'Click on the link', resetPasswordLink: link })

    //TODO : send email to the user 
})

/**
 * @desc Get Reset password link
 * @route /password/reset-password/:userId/token
 * @method GET
 * @access public
 */

module.exports.getResetPasswordView = asyncHandler(async (req, res) => {
    console.log(req.body.email);
    const user = await User.findById(req.params.userId)
    if (!user) {
        return res.status(404).json({ message: 'User Not Found' })
    }
    const secret = process.env.JWT_SECRET_KEY + user.password;
    try {
        jwt.verify(req.params.token, secret);
        res.render('reset-password', { email: user.email })
    } catch (error) {
        console.log(error);
        res.json({ message: "error" });

    }

    const link = `http://localhost:5000/password/reset-password/${User._id}/${token}`;

    res.json({ message: 'Click on the link', resetPasswordLink: link })
})