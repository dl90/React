const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PublisherSchema = new Schema({
  name: { type: String, required: true, minlength: 10, maxlength: 60 }
})

PublisherSchema
  .virtual('url')
  .get(function () { return '/catalog/publisher/' + this._id })

module.exports = mongoose.model('Publisher', PublisherSchema)
