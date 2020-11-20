const async = require('async')
const mongoose = require('mongoose')
const { body, validationResult } = require('express-validator')

const Book = require('../model/Book')
const Author = require('../model/Author')
const Genre = require('../model/Genre')
const BookInstance = require('../model/BookInstance')

exports.index = function (req, res) {
  async.parallel({
    book_count: cb => Book.countDocuments({}, cb), // Pass an empty object as match condition to find all documents of this collection
    book_instance_count: cb => BookInstance.countDocuments({}, cb),
    book_instance_available_count: cb => BookInstance.countDocuments({ status: 'Available' }, cb),
    author_count: cb => Author.countDocuments({}, cb),
    genre_count: cb => Genre.countDocuments({}, cb)
  }, function (err, results) {
    res.render('index', {
      title: 'Local Library Home',
      error: err,
      data: results
    })
  })
}

// Display list of all Books.
exports.book_list = function (req, res, next) {
  Book.find({}, 'title author')
    .populate('author')
    .exec((err, list_books) => {
      if (err) return next(err)
      res.render('book_list', { title: 'Book List', book_list: list_books })
    })
}

// Display detail page for a specific book.
exports.book_detail = function (req, res, next) {
  const id = mongoose.Types.ObjectId(req.params.id)
  async.parallel({
    book: cb => Book.findById(req.params.id).populate('author').populate('genre').exec(cb),
    book_instance: cb => BookInstance.find({ book: id }).exec(cb)
  }, function (err, results) {
    if (err) return next(err)
    if (results.book == null) {
      const err = new Error('Book not found')
      err.status = 404
      return next(err)
    }
    res.render('book_detail', {
      title: 'Book Details',
      book: results.book,
      book_instances: results.book_instance
    })
  })
}

// Display book create form on GET.
exports.book_create_get = function (req, res, next) {
  async.parallel({
    authors: cb => Author.find(cb),
    genres: cb => Genre.find(cb)
  }, function (err, results) {
    if (err) return next(err)
    res.render('book_form', {
      title: 'Create Book',
      authors: results.authors,
      genres: results.genres
    })
  })
}

// Handle book create on POST.
exports.book_create_post = [
  // Convert the genre to an array.
  (req, res, next) => {
    if (!(req.body.genre instanceof Array)) {
      if (typeof req.body.genre === 'undefined') req.body.genre = []
      else req.body.genre = new Array(req.body.genre)
    }
    next()
  },

  body('title', 'Title must not be empty.').trim().isLength({ min: 1 }).escape(),
  body('author', 'Author must not be empty.').trim().isLength({ min: 1 }).escape(),
  body('summary', 'Summary must not be empty.').trim().isLength({ min: 1 }).escape(),
  body('isbn', 'ISBN must not be empty').trim().isLength({ min: 1 }).escape(),
  body('genre.*').escape(),

  (req, res, next) => {
    const errors = validationResult(req)
    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      summary: req.body.summary,
      isbn: req.body.isbn,
      genre: req.body.genre
    })

    if (!errors.isEmpty()) {
      async.parallel({
        authors: cb => Author.find(cb),
        genres: cb => Genre.find(cb)
      }, function (err, results) {
        if (err) return next(err)

        // Mark our selected genres as checked.
        for (let i = 0; i < results.genres.length; i++) {
          if (book.genre.indexOf(results.genres[i]._id) > -1) { results.genres[i].checked = 'true' }
        }
        res.render('book_form', {
          title: 'Create Book',
          authors: results.authors,
          genres: results.genres,
          book: book,
          errors: errors.array()
        })
      })
    } else {
      book.save(function (err) {
        if (err) return next(err)
        res.redirect(book.url)
      })
    }
  }
]

// Display book delete form on GET.
exports.book_delete_get = function (req, res, next) {
  const id = mongoose.Types.ObjectId(req.params.id)
  async.parallel({
    book: cb => Book.findById(req.params.id).populate('author').populate('genre').exec(cb),
    book_instances: cb => BookInstance.find({ book: id }).exec(cb)
  }, (err, results) => {
    if (err) return next(err)
    if (results.book == null) return next(new Error('Book not found'))
    res.render('book_delete', {
      title: 'Delete Book',
      book: results.book,
      book_instances: results.book_instances
    })
  })
}

// Handle book delete on POST.
exports.book_delete_post = function (req, res, next) {
  const id = mongoose.Types.ObjectId(req.params.id)
  async.parallel({
    book: cb => Book.findById(req.params.id).populate('author').populate('genre').exec(cb),
    book_instances: cb => BookInstance.find({ book: id }).exec(cb)
  }, (err, results) => {
    if (err) return next(err)
    if (results.book == null) return next(new Error('Book not found'))
    if (results.book_instances.length > 0) {
      res.render('book_delete', {
        title: 'Delete Book',
        book: results.book,
        book_instances: results.book_instances
      })
    } else {
      Book.findByIdAndRemove(req.body.bookId, err => {
        if (err) return next(err)
        res.redirect('/catalog/books')
      })
    }
  })
}

// Display book update form on GET.
exports.book_update_get = function (req, res, next) {
  async.parallel({
    book: cb => Book.findById(req.params.id).populate('author').populate('genre').exec(cb),
    authors: cb => Author.find(cb),
    genres: cb => Genre.find(cb)
  }, function (err, results) {
    if (err) return next(err)
    if (results.book == null) {
      err.status = 404
      return next(new Error('Book not found'))
    }
    // Mark our selected genres as checked.
    for (let genreIdx = 0; genreIdx < results.genres.length; genreIdx++) {
      for (let bookIdx = 0; bookIdx < results.book.genre.length; bookIdx++) {
        if (results.genres[genreIdx]._id.toString() === results.book.genre[bookIdx]._id.toString()) {
          results.genres[genreIdx].checked = 'true'
        }
      }
    }
    res.render('book_form', {
      title: 'Update Book',
      authors: results.authors,
      genres: results.genres,
      book: results.book
    })
  })
}

// Handle book update on POST.
exports.book_update_post = [
  (req, res, next) => {
    if (!(req.body.genre instanceof Array)) {
      if (typeof req.body.genre === 'undefined') req.body.genre = []
      else req.body.genre = new Array(req.body.genre)
    }
    next()
  },

  body('title', 'Title must not be empty.').trim().isLength({ min: 1 }).escape(),
  body('author', 'Author must not be empty.').trim().isLength({ min: 1 }).escape(),
  body('summary', 'Summary must not be empty.').trim().isLength({ min: 1 }).escape(),
  body('isbn', 'ISBN must not be empty').trim().isLength({ min: 1 }).escape(),
  body('genre.*').escape(),

  (req, res, next) => {
    const errors = validationResult(req)
    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      summary: req.body.summary,
      isbn: req.body.isbn,
      genre: (typeof req.body.genre === 'undefined') ? [] : req.body.genre,
      _id: req.params.id // This is required, or a new ID will be assigned
    })

    if (!errors.isEmpty()) {
      async.parallel({
        authors: cb => Author.find(cb),
        genres: cb => Genre.find(cb)
      }, function (err, results) {
        if (err) return next(err)

        // Mark our selected genres as checked.
        for (let i = 0; i < results.genres.length; i++) {
          if (book.genre.indexOf(results.genres[i]._id) > -1) {
            results.genres[i].checked = 'true'
          }
        }
        res.render('book_form', {
          title: 'Update Book',
          authors: results.authors,
          genres: results.genres,
          book: book,
          errors: errors.array()
        })
      })
    } else {
      Book.findByIdAndUpdate(req.params.id, book, {}, (err, theBook) => {
        if (err) return next(err)
        res.redirect(theBook.url)
      })
    }
  }
]
