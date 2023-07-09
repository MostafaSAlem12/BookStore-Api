const mongoose = require('mongoose');
const Joi = require('joi');


const BookSchmea = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 200
  },
  author: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 200
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 200
  },
  price: {
    type: Number,
    required: true,
  },
  cover: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 100
  },
}, {
  timestamps: true
})

const Book = mongoose.model("Book", BookSchmea)

function valdiateUpdateBook(obj) {
  const schema = Joi.object({
    title:
      Joi.string().trim().min(3).max(200),
    author:
      Joi.string().trim().min(3).max(200),
    description:
      Joi.string().trim().min(3).max(500),
    price:
      Joi.number().min(0),
    cover:
      Joi.string().trim(),
  })

  return schema.validate(obj);
}

function valdiateCreateBook(obj) {
  const schema = Joi.object({
    title:
      Joi.string().trim().min(3).max(200).required(),
    author:
      Joi.string().trim().min(3).max(200).required(),
    description:
      Joi.string().trim().min(3).max(500).required(),
    price:
      Joi.number().min(0).required(),
    cover:
      Joi.string().trim().required(),
  })

  return schema.validate(obj);
}
module.exports = {
  Book,
  valdiateCreateBook,
  valdiateUpdateBook
}