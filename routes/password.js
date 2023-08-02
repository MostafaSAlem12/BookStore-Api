const express = require("express");
const { getForgotPasswordView, sendForgotPasswordLink } = require("../controllers/passwordController");
const router = express.Router();



//password/forgot-password
router.route("/forgot-password")
.get(getForgotPasswordView).post(sendForgotPasswordLink)
module.exports = router;