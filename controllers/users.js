const bcrypt = require('bcrypt');
const User = require('../models/user');

const ERROR_CODES = {
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

function sendError(res, statusCode, message) {
  return res.status(statusCode).json({ message });
}

module.exports.findAllUsers = (req, res) => { // GET
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => sendError(res, ERROR_CODES.INTERNAL_SERVER_ERROR, 'На сервере произошла ошибка'));
};

// eslint-disable-next-line consistent-return
module.exports.findUserById = (req, res) => { // GET
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        sendError(res, ERROR_CODES.NOT_FOUND, 'Пользователь по указанному _id не найден.');
      }
      res.status(200).send({ data: user });
    })
    .catch(() => sendError(res, ERROR_CODES.BAD_REQUEST, 'Пользователь по указанному _id не найден..'));
};

// eslint-disable-next-line consistent-return
module.exports.getCurrentUser = (req, res) => {
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        sendError(res, ERROR_CODES.NOT_FOUND, 'Пользователь по указанному _id не найден.');
      }
      res.status(200).send({ data: user });
    })
    .catch(() => sendError(res, ERROR_CODES.BAD_REQUEST, 'Пользователь по указанному _id не найден..'));
};

// eslint-disable-next-line consistent-return
module.exports.createUser = (req, res) => { // POST
  const
    {
      email,
      password,
      name,
      about,
      avatar,
    } = req.body;

  if (!email || !password) {
    return sendError(res, ERROR_CODES.BAD_REQUEST, 'Переданы некорректные данные при создании пользователя.');
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
            return sendError(res, ERROR_CODES.BAD_REQUEST, 'Переданы некорректные данные при создании пользователя.');
          }
          return sendError(res, ERROR_CODES.INTERNAL_SERVER_ERROR, 'На сервере произошла ошибка');
        });
    });
};

// eslint-disable-next-line consistent-return
module.exports.updateProfile = (req, res) => { // PATCH
  const { name, about } = req.body;
  if (!name || !about) {
    return sendError(res, ERROR_CODES.BAD_REQUEST, 'Переданы некорректные данные при обновлении профиля.');
  }
  User.findByIdAndUpdate(
    req.params.id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then(() => res.status(200).send({ name, about }))
    .catch(() => sendError(res, ERROR_CODES.INTERNAL_SERVER_ERROR, 'На сервере произошла ошибка'));
};

// eslint-disable-next-line consistent-return
module.exports.updateAvatar = (req, res) => { // PATCH
  const { avatar } = req.body;
  if (!avatar) {
    return sendError(res, ERROR_CODES.BAD_REQUEST, 'Переданы некорректные данные при обновлении аватара.');
  }
  User.findByIdAndUpdate(
    req.params.id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then(() => res.status(200).send({ avatar }))
    .catch(() => sendError(res, ERROR_CODES.INTERNAL_SERVER_ERROR, 'На сервере произошла ошибка'));
};
