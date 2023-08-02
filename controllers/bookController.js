const asyncHandler = require('express-async-handler')
const { Book, valdiateCreateBook, valdiateUpdateBook } = require('../models/Book')

/**
 * @des Get all books
 * @route /api/books
 * @method GET
 * @access public
 */
// Comparioson Query Operators
// $eq (equal)
// $ne (not equal)
// $lt (less than)
// $lte (less than and equal)
const getAllBooks = asyncHandler(
    async (req, res) => {

        const { minPrice, maxPrice } = req.query;
        let bookList;
        if (minPrice && maxPrice) {
            bookList = await Book.find({ price: { $gte: minPrice, $lte: maxPrice } }).populate("author", [
                "_id",
                "firstName",
                "lastName"
            ]);
        } else {
            bookList = await Book.find().populate("author", [
                "_id",
                "firstName",
                "lastName"
            ]);
        }

        res.status(200).json(bookList);
    })


/**
* @des Get books by id
* @route /api/books/:id
* @method GET
* @access public
*/
const getBookById = asyncHandler(
    async (req, res) => {
        const book = await Book.findById(req.params.id);
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
* @access private only admin
*/

const createNewBook =
    asyncHandler(async (req, res) => {

        const { error } = valdiateCreateBook(req.body)

        if (error) {
            return res.status(400).json({ message: error.details[0].message })
        }


        const book = new Book({
            title: req.body.title,
            author: req.body.author,
            description: req.body.description,
            price: req.body.price,
            cover: req.body.cover
        });
        const result = await book.save()
        res.status(201).json(result);
    })


/**
* @des Update a book
* @route /api/books/:id
* @method PUT
* @access private only admin
*/

const updateBook =
    asyncHandler(async (req, res) => {
        const { error } = valdiateUpdateBook(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message })
        }

        const book = await Book.findByIdAndUpdate(req.params.id, {
            $set: {
                title: req.body.title,
                author: req.body.author,
                description: req.body.description,
                price: req.body.price,
                cover: req.body.cover
            }
        }, { new: true })
        res.status(200).json({ message: "the book has been updated" })
    })


/**
* @des Delet a book
* @route /api/books/:id
* @method DELET
* @access private only admin
*/

const deletBook =
    asyncHandler(async (req, res) => {

        const book = Book.findById(req.params.id)
        if (book) {
            await Book.findByIdAndDelete(req.params.id)
            res.status(200).json({ message: "the book has been deleted" })
        } else {
            res.status(404).json({ message: "the book you are trying to delet not found" })
        }
    })
module.exports =
{
    getAllBooks,
    getBookById,
    createNewBook,
    updateBook,
    deletBook
};