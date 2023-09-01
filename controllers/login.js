const jwt = require('jsonwebtoken');
const User = require('../models/user');
const LoginError = require('../errors/login-error');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
  // eslint-disable-next-line consistent-return
    .then((user) => {
      if (!user) {
        return next(new LoginError('Переданы некорректные данные при создании пользователя.'));
      }
      const token = jwt.sign({ _id: user._id }, 'some-key');

      res.cookie('token', token, {
        maxAge: 604800,
        httpOnly: true,
      });

      res.status(200).send({ message: user._id });
    })
    .catch(next);
};
