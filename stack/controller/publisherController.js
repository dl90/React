const async = require('async')
const mongoose = require('mongoose')
const { body, validationResult } = require('express-validator')

const Publisher = require('../model/Publishers')
const Book = require('../model/Book')

exports.createGet = (req, res, next) => {
  res.render('publisher_form', { title: 'Create Publisher' })
}

exports.createPost = [
  body('name', 'Publisher name required').trim().isLength({ min: 2 }).escape(),

  (req, res, next) => {
    const errors = validationResult(req)
    const publisher = new Publisher({ name: req.body.name })

    if (!errors.isEmpty()) {
      res.render('genre_form', { title: 'Create Genre', publisher: publisher, errors: errors.array() })
    } else {
      Publisher.findOne({ name: req.body.name }).exec(function (err, foundPublisher) {
        if (err) { return next(err) }
        if (foundPublisher) res.redirect(foundPublisher.url)
        else {
          publisher.save(function (err) {
            if (err) { return next(err) }
            res.redirect(publisher.url)
          })
        }
      })
    }
  }
]

exports.detail = (req, res, next) => {
  const id = mongoose.Types.ObjectId(req.params.id)
  async.parallel({
    publisher: cb => Publisher.findById(id).exec(cb),
    publisherBooks: cb => Book.find({ publisher: id }).exec(cb)
  }, (err, results) => {
    if (err) { return next(err) }
    if (results.publisher == null) {
      const err = new Error('Genre not found')
      err.status = 404
      return next(err)
    }
    res.render('publisher_detail', {
      title: 'Genre Detail',
      publisher: results.publisher,
      publisher_books: results.publisherBooks
    })
  })
}

exports.list = (req, res, next) => {
  Publisher.find().sort([['name', 'ascending']])
    .exec(function (err, list) {
      if (err) return next(err)
      res.render('publisher_list', {
        title: 'Publisher List',
        publisher_list: list
      })
    })
}
