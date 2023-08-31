const bcrypt = require('bcrypt');
const User = require('../models/user');

const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const EmailError = require('../errors/email-err');

module.exports.findAllUsers = (req, res, next) => { // GET
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

// eslint-disable-next-line consistent-return
module.exports.findUserById = (req, res, next) => { // GET
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      }
      res.status(200).send({ data: user });
    })
    .catch(next);
};

// eslint-disable-next-line consistent-return
module.exports.getCurrentUser = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      }
      res.status(200).send({ data: user });
    })
    .catch(next);
};

// eslint-disable-next-line consistent-return
module.exports.createUser = (req, res, next) => { // POST
  const
    {
      email,
      password,
      name,
      about,
      avatar,
    } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Переданы некорректные данные при создании пользователя.');
  }
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      User.create({
        email,
        password: hash,
        name,
        about,
        avatar,
      })
        .then((user) => res.status(200).send({ data: user }))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            throw new BadRequestError('Переданы некорректные данные при создании пользователя.');
          } else if (err.status === 11000) {
            throw new EmailError('Пользователем с таким email уже существует');
          }
          next();
        });
    });
};

// eslint-disable-next-line consistent-return
module.exports.updateProfile = (req, res, next) => { // PATCH
  const { name, about } = req.body;
  if (!name || !about) {
    throw new BadRequestError('Переданы некорректные данные при обновлении профиля.');
  }
  User.findByIdAndUpdate(
    req.params.id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then(() => res.status(200).send({ name, about }))
    .catch(next);
};

// eslint-disable-next-line consistent-return
module.exports.updateAvatar = (req, res, next) => { // PATCH
  const { avatar } = req.body;
  if (!avatar) {
    throw new BadRequestError('Переданы некорректные данные при обновлении аватара.');
  }
  User.findByIdAndUpdate(
    req.params.id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then(() => res.status(200).send({ avatar }))
    .catch(next);
};
