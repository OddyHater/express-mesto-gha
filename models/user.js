const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    minlength: 2,
    maxlength: 30,
  },

  about: {
    type: String,
    require: true,
    minlength: 2,
    maxlength: 30,
  },

  avatar: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model('user', userSchema);
