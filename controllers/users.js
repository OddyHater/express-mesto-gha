const User = require('../models/user');

const ERROR_CODES = {
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

function sendError(res, statusCode, message) {
  return res.status(statusCode).json({ message });
}

module.exports.findAllUsers = () => { // GET
  User.find({});
};

// eslint-disable-next-line consistent-return
module.exports.findUserById = (req, res) => { // GET
  const { userId } = req.params;
  if (!userId) {
    return sendError(res, ERROR_CODES.NOT_FOUND, 'Пользователь по указанному _id не найден.');
  }
  User.findById(userId)
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => sendError(err, ERROR_CODES.INTERNAL_SERVER_ERROR, err));
};

// eslint-disable-next-line consistent-return
module.exports.createUser = (req, res) => { // POST
  const { name, about, avatar } = req.body;
  if (!name || !about || !avatar) {
    return sendError(res, ERROR_CODES.BAD_REQUEST, 'Переданы некорректные данные при создании пользователя.');
  }
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => sendError(err, ERROR_CODES.INTERNAL_SERVER_ERROR, err));
};

// eslint-disable-next-line consistent-return
module.exports.updateProfile = (req, res) => { // PATCH
  const { name, about } = req.body;
  const { userId } = req.user._id;
  if (!name || !about) {
    return sendError(res, ERROR_CODES.BAD_REQUEST, 'Переданы некорректные данные при обновлении профиля.');
  }
  if (!userId) {
    return sendError(res, ERROR_CODES.NOT_FOUND, 'Пользователь с указанным _id не найден.');
  }
  User.findByIdAndUpdate(req.params.id, {
    name,
    about,
  })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => sendError(err, ERROR_CODES.INTERNAL_SERVER_ERROR, 'Ошибка при обновлении профиля'));
};

// eslint-disable-next-line consistent-return
module.exports.updateAvatar = (req, res) => { // PATCH
  const { avatar } = req.body;
  const { userId } = req.user._id;
  if (!avatar) {
    return sendError(res, ERROR_CODES.BAD_REQUEST, 'Переданы некорректные данные при обновлении аватара.');
  }
  if (!userId) {
    return sendError(res, ERROR_CODES.NOT_FOUND, 'Пользователь с указанным _id не найден.');
  }
  User.findByIdAndUpdate(req.params.id, {
    avatar,
  })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => sendError(err, ERROR_CODES.INTERNAL_SERVER_ERROR, err));
};
