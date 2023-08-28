const User = require('../models/user');

module.exports.findAllUsers = () => { // GET
  User.find({});
};

module.exports.findUserById = (req, res) => { // GET
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err }));
};

module.exports.createUser = (req, res) => { // POST
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err }));
};

module.exports.updateProfile = (req, res) => { // PATCH
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.params.id, {
    name,
    about,
  })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err }));
};

module.exports.updateAvatar = (req, res) => { // PATCH
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.params.id, {
    avatar,
  })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err }));
};
