const Card = require('../models/card');

module.exports.findAllCards = () => {
  Card.find();
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link })
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: err }));
};

module.exports.deleteCard = (req, res) => {
  const { id } = req.body.id;
  Card.findByIdAndDelete(id)
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err }));
};
