const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { User, validateUpdateUser } = require("../models/User")



/**
 * @desc Update User
 * @route /api/users/:id
 * @method PUT
 * @access private
 */
const updateUser = asyncHandler(async (req, res) => {
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
})


/**
* @desc GET ALL User
* @route /api/users
* @method GET
* @access private (only admin)
*/

const getAllUser = asyncHandler(async (req, res) => {
    const users = await User.find().select("-password");
    res.status(200).json(users);
})

/**
 * @desc GET User By Id
 * @route /api/users/:id
 * @method GET
 * @access private (only admin & user himself)
 */

const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById().select("-password");
    res.status(200).json(user);
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({ message: "user not found" });
    }
})


/**
* @desc Delet User By Id
* @route /api/users/:id
* @method DELET
* @access private (only admin & user himself)
*/

const deletUserById = asyncHandler(async (req, res) => {
    const user = await User.findById().select("-password");
    res.status(200).json(user);
    if (user) {
        await User.findByIdAndDelet(req.params.id)
        res.status(200).json({ message: "user has been deleted" });
    } else {
        res.status(404).json({ message: "the user you are trying to delet not found" });
    }
})




module.exports = {
    updateUser,
    getAllUser,
    getUserById,
    deletUserById

}