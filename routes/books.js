const express = require("express");
const router = express.Router();
const asyncHandler = require('express-async-handler')
const { Book, valdiateCreateBook, valdiateUpdateBook } = require('../models/Book')

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

// router.get("/", (req, res) => {
//   // res.send("welcome to Books Section");
// })

/**
 * @des Get all books
 * @route /api/books
 * @method GET
 * @access public
 */
router.get("/", asyncHandler(
  async (req, res) => {
    const bookList = await Book.find();
    res.status(200).json(bookList);
  }))

/**
 * @des Get books by id
 * @route /api/books/:id
 * @method GET
 * @access public
 */
router.get("/:id", asyncHandler(
  async (req, res) => {
    const book = Book.find(b => b.id === parseInt(req.params.id));
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: "book not found" })
    }
  }))

/**
 * @des Create new book
 * @route /api/books
 * @method POST
 * @access public
 */
router.post("/",
  async (req, res) => {

    const { error } = valdiateCreateBook(req.body)

    if (error) {
      return res.status(400).json({ message: error.details[0].message })
    }

    try {
      const book = new Book({
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        price: req.body.price,
        cover: req.body.cover
      });
      const result = await book.save()
      res.status(201).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "something went wrong"
      })
    }
  });


/**
 * @des Update a book
 * @route /api/books/:id
 * @method PUT
 * @access public
 */
router.put("/:id", async (req, res) => {
  const { error } = valdiateUpdateBook(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message })
  }
  try {
    const book = Book.findByIdAndUpdate(req.params.id, {
      $set: {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        price: req.body.price,
        cover: req.body.cover
      }
    }, { new: true })
    res.status(200).json({ message: "the book has been updated" })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "something went wrong" })
  }
})

/**
 * @des Delet a book
 * @route /api/books/:id
 * @method DELET
 * @access public
 */
router.delete("/:id", async (req, res) => {
  try {
    const book = Book.findById(req.params.id)
    if (book) {
      await Book.findByIdAndDelete(req.params.id)
      res.status(200).json({ message: "the book has been deleted" })
    } else {
      res.status(404).json({ message: "the book you are trying to delet not found" })
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" })
  }
})
module.exports = router;