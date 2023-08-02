const asyncHandler = require('express-async-handler');
const { Author, validateCreateAuthor, validateUpdateAuthor } = require("../models/Author")


/**
 * @des Get all authors
 * @route /api/authors
 * @method GET
 * @access public
 */

const getAllAuthors = asyncHandler(
  async (req, res) => {
    const { pageNumber } = req.query;
    const authorsPerPage = 2;
    const authorList = await Author.find().skip((pageNumber - 1) * authorsPerPage).limit(authorsPerPage);
    res.status(200).json(authorList);
  })


/**
* @des Get author by id
* @route /api/authors
* @method GET
* @access public
*/
const getAuthorById = asyncHandler(
  async (req, res) => {

    const author = await Author.findById(req.params.id);
    if (author) {
      res.status(200).json(author)
    } else {
      res.status(404).json({ message: "author not found" })
    }
  })


/**
 * @des Create new author
 * @route /api/authors
 * @method POST
 * @access private only admin
 */

const createNewAuthor = asyncHandler(async (req, res) => {
  const { error } = validateCreateAuthor(req.body)

  if (error) {
    return res.status(400).json({ message: error.details[0].message })
  }

  const author = new Author({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    nationality: req.body.nationality,
    image: req.body.image
  });

  const result = await author.save();

  res.status(201).json(result);
})



/**
* @des Update an author
* @route /api/authors/:id
* @method PUT
* @access private (only admin)
*/


const updateAnAuthor = asyncHandler(async (req, res) => {
  const { error } = validateUpdateAuthor(req.body)
  if (error) {
    return res.status(400).json({ message: error.details[0].message })
  }
  const author = await Author.findByIdAndUpdate(req.params.id, {
    $set: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      nationality: req.body.nationality,
      image: req.body.image
    }
  }, { new: true })

  res.status(200).json(author)
})



/**
* @des delete an author
* @route /api/authors/:id
* @method PUT
* @access private (only admin)
*/

const deletAuthor = asyncHandler(async (req, res) => {
  const author = await Author.findById(req.params.id);
  if (author) {
    await Author.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: "the author has been deleted" })
  } else {
    res.status(404).json({ message: "the author not found" })
  }
})
module.exports = {
  getAllAuthors,
  getAuthorById,
  createNewAuthor,
  updateAnAuthor,
  deletAuthor

}