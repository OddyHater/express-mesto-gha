const User = require('../models/user');

module.exports.findAllUsers = () => {
  User.find({});
};

module.exports.findUserById = (req, res) => {
  const { id } = req.body.id;
  User.findById(id)
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err }));
};
