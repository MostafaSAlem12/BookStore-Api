const express = require("express");
const router = express.Router();
const Joi = require('joi');

const books = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    price: 9,
    cover: "soft cover"
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    description: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Fusce id purus at tellus viverra sodales.",
    price: 12,
    cover: "hard cover"
  },
  {
    id: 3,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    description: "Suspendisse sed neque euismod, tincidunt velit in, efficitur ligula.",
    price: 14,
    cover: "e-book"
  },
  {
    id: 4,
    title: "1984",
    author: "George Orwell",
    description: "Donec a elit a dolor vehicula auctor.",
    price: 19,
    cover: "soft cover"
  },
  {
    id: 5,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    description: "Etiam vel nisl eu orci interdum sagittis.",
    price: 24,
    cover: "hard cover"
  }
];
//http methods / verbs

router.get("/", (req, res) => {
  res.send("welcome to express js ")

})

/**
 * @des Get all books
 * @route /api/books
 * @method GET
 * @access public
 */
router.get("/", (req, res) => {
  res.status(200).json(books);
})

/**
 * @des Get books by id
 * @route /api/books/:id
 * @method GET
 * @access public
 */
router.get("/:id", (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ message: "book not found" })
  }
})

/**
 * @des Create new book
 * @route /api/books
 * @method POST
 * @access public
 */
router.post("/", (req, res) => {

  const { error } = valdiateCreateBook(req.body)

  if (error) {
    return res.status(400).json({ message: error.details[0].message })
  }

  const book = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    price: req.body.price,
    cover: req.body.cover
  }

  books.push(book);
  res.status(201).json(book);
})


/**
 * @des Update a book
 * @route /api/books/:id
 * @method PUT
 * @access public
 */
router.put("/:id", (req, res) => {
  const { error } = valdiateUpdateBook(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message })
  }

  const book = books.find(b => b.id === parseInt(req.params.id))
  if (book) {
    res.status(200).json({ message: "the book has been updated" })
  } else {
    res.status(404).json({ message: "the book you are trying to update not found" })
  }
})

/**
 * @des Delet a book
 * @route /api/books/:id
 * @method DELET
 * @access public
 */
router.delete("/:id", (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id))
  if (book) {
    res.status(200).json({ message: "the book has been deleted" })
  } else {
    res.status(404).json({ message: "the book you are trying to delet not found" })
  }
})


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
module.exports = router