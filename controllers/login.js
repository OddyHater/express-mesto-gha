require('dotenv').config();

const { JWT_SECRET } = process.env;

const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET);

      res.cookie('token', token, {
        maxAge: 604800,
        httpOnly: true,
      });

      res.status(200).send({ message: user._id });
    })
    .catch(() => {
      res.status(401).send({ message: 'Проблема аутентификации' });
    });
};
