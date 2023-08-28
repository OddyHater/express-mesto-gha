const User = require('../models/user');

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
    return sendError(res, 400, 'Некорректные данные');
  }
  User.findById(userId)
    .then((user) => res.send({ data: user }))
    .catch((err) => sendError(err, 500, 'Ошибка при поиске пользователя'));
};

// eslint-disable-next-line consistent-return
module.exports.createUser = (req, res) => { // POST
  const { name, about, avatar } = req.body;
  if (!name || !about || !avatar) {
    return sendError(res, 400, 'Некорректные данные');
  }
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => sendError(err, 500, 'Ошибка при создании пользователя'));
};

// eslint-disable-next-line consistent-return
module.exports.updateProfile = (req, res) => { // PATCH
  const { name, about } = req.body;
  if (!name || !about) {
    return sendError(res, 400, 'Некорректные данные');
  }
  User.findByIdAndUpdate(req.params.id, {
    name,
    about,
  })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => sendError(err, 500, 'Ошибка при обновлении профиля'));
};

// eslint-disable-next-line consistent-return
module.exports.updateAvatar = (req, res) => { // PATCH
  const { avatar } = req.body;
  if (!avatar) {
    return sendError(res, 400, 'Некорректные данные');
  }
  User.findByIdAndUpdate(req.params.id, {
    avatar,
  })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => sendError(err, 500, 'Ошибка при аватара'));
};
