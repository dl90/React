const mongoose = require('mongoose')
// const dotenv = require('dotenv')
// dotenv.config()

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err) throw new Error(err.message)
  console.log('Connected to Mongo')
})

exports.db = mongoose.connection
