const async = require('async')
const mongoose = require('mongoose')
const { body, validationResult } = require('express-validator')

const Genre = require('../model/Genre')
const Book = require('../model/Book')

// Display list of all Genre.
exports.genre_list = (req, res, next) => {
  Genre.find().sort([['name', 'ascending']])
    .exec(function (err, list) {
      if (err) return next(err)
      res.render('genre_list', {
        title: 'Genre List',
        genre_list: list
      })
    })
}

// Display detail page for a specific Genre.
exports.genre_detail = (req, res, next) => {
  const id = mongoose.Types.ObjectId(req.params.id)
  async.parallel({
    genre: cb => Genre.findById(id).exec(cb),
    genre_books: cb => Book.find({ genre: id }).exec(cb)
  }, (err, results) => {
    if (err) { return next(err) }
    if (results.genre == null) {
      const err = new Error('Genre not found')
      err.status = 404
      return next(err)
    }
    res.render('genre_detail', {
      title: 'Genre Detail',
      genre: results.genre,
      genre_books: results.genre_books
    })
  })
}

// Display Genre create form on GET.
exports.genre_create_get = (req, res, next) => {
  res.render('genre_form', { title: 'Create Genre' })
}

// Handle Genre create on POST.
exports.genre_create_post = [
  body('name', 'Genre name required').trim().isLength({ min: 1 }).escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    const errors = validationResult(req)
    const genre = new Genre({ name: req.body.name })

    if (!errors.isEmpty()) {
      res.render('genre_form', { title: 'Create Genre', genre: genre, errors: errors.array() })
    } else {
      Genre.findOne({ name: req.body.name }).exec(function (err, foundGenre) {
        if (err) { return next(err) }
        if (foundGenre) res.redirect(foundGenre.url)
        else {
          genre.save(function (err) {
            if (err) { return next(err) }
            res.redirect(genre.url)
          })
        }
      })
    }
  }
]

// Display Genre delete form on GET.
exports.genre_delete_get = (req, res, next) => {
  const id = mongoose.Types.ObjectId(req.params.id)
  async.parallel({
    genre: cb => Genre.findById(id).exec(cb),
    genre_books: cb => Book.find({ genre: id }).populate('genre').exec(cb)
  }, (err, results) => {
    if (err) return next(err)
    if (results.genre == null) return next(new Error('Genre not found'))
    res.render('genre_delete', {
      title: 'Delete Genre',
      genre: results.genre,
      genreBooks: results.genre_books
    })
  })
}

// Handle Genre delete on POST.
exports.genre_delete_post = function (req, res, next) {
  const id = mongoose.Types.ObjectId(req.params.id)
  async.parallel({
    genre: cb => Genre.findById(id).exec(cb),
    genre_books: cb => Book.find({ genre: id }).populate('genre').exec(cb)
  }, (err, results) => {
    if (err) return next(err)
    if (results.genre == null) return next(new Error('Genre not found'))
    if (results.genre_books > 0) {
      res.render('genre_delete', {
        title: 'Delete Genre',
        genre: results.genre,
        genreBooks: results.genre_books
      })
    } else {
      Genre.findByIdAndRemove(results.genre._id, err => {
        if (err) return next(err)
        res.redirect('/catalog/genres')
      })
    }
  })
}

// Display Genre update form on GET.
exports.genre_update_get = function (req, res) {
  res.send('NOT IMPLEMENTED: Genre update GET')
}

// Handle Genre update on POST.
exports.genre_update_post = function (req, res) {
  res.send('NOT IMPLEMENTED: Genre update POST')
}
