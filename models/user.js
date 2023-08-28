const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    minlength: 2,
    maxlength: 30,
    validate: {
      validator(v) {
        return v.length >= 2;
      },
      message: 'Name must contain at least 2 characters',
      error: 400,
    },
  },

  about: {
    type: String,
    require: true,
    minlength: 2,
    maxlength: 30,
    validate: {
      validator(v) {
        return v.length >= 2;
      },
      message: 'about must contain at least 2 characters',
      error: 400,
    },
  },

  avatar: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model('user', userSchema);
