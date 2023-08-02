const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlenght: 5,
    maxlenght: 100,
    unique: true
  },
  username: {
    type: String,
    required: true,
    trim: true,
    minlenght: 2,
    maxlenght: 200,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlenght: 6,
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
},
  {
    timestamps: true
  })

  //Generate Token 
  UserSchema.methods.generateToken = function (){
    return jwt.sign({ id: this._id, isAdmin: this.isAdmin }, process.env.JWT_SECRET_KEY);
  }

//User Model
const User = mongoose.model("User", UserSchema);

// validtae Register User 
function validateRegisterUser(obj) {
  const schema = Joi.object({
    email:
      Joi.string().trim().min(5).max(100).required().email(),
    username:
      Joi.string().trim().min(2).max(200).required(),
    password:
      Joi.string().trim().min(6).required(),
  
  });
  return schema.validate(obj);
}


function validateLoginUser(obj) {
  const schema = Joi.object({
    email:
      Joi.string().trim().min(5).max(100).required().email(),
    password:
      Joi.string().trim().min(6).required(),
  });
  return schema.validate(obj);
}

function validateUpdateUser(obj) {
  const schema = Joi.object({
    email:
      Joi.string().trim().min(5).max(100).email(),
    username:
      Joi.string().trim().min(2).max(200),
    password:
      Joi.string().trim().min(6)
  });
  return schema.validate(obj);
}
module.exports = {
  User,
  validateLoginUser,
  validateRegisterUser,
  validateUpdateUser,
}