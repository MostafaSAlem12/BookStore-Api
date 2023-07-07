const mongoose = require("mongoose");
const Joi = require('joi');

const AuthorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 200
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 200
  },
  nationality: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100
  },
  image: {
    type: String,
    default: "default-avatar.png"
  },
}, {
  timestamps: true
})

const Author = mongoose.model("Author", AuthorSchema);

function validateUpdateAuthor(obj) {
  const schema = Joi.object({
    firstName:
      Joi.string().trim().min(3).max(200),
    lastName:
      Joi.string().trim().min(3).max(200),
    nationality:
      Joi.string().min(2).max(100).trim(),
    image:
      Joi.string().trim()
  })
  return schema.validate(obj);
}
function validateCreateAuthor(obj) {
  const schema = Joi.object({
    firstName:
      Joi.string().trim().min(3).max(200).required(),
    lastName:
      Joi.string().trim().min(3).max(200).required(),
    nationality:
      Joi.string().min(2).max(100).trim().required(),
    image:
      Joi.string().trim()
  })
  return schema.validate(obj);
}

module.exports = {
  Author,
  validateCreateAuthor,
  validateUpdateAuthor
}

