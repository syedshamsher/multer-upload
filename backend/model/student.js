const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  blood: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  }
}, {
  versionKey: false
})

module.exports = mongoose.model('Student', studentSchema);