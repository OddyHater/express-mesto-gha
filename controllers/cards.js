const Card = require('../models/card');

module.exports.findAllCards = () => { // GET
  Card.find();
};

module.exports.createCard = (req, res) => { // POST
  const { name, link } = req.body;
  Card.create({ name, link })
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: err }));
};

module.exports.deleteCard = (req, res) => { // DELETE
  const { cardId } = req.body;
  Card.findByIdAndDelete(cardId)
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err }));
};

module.exports.putLike = (req, res) => { // PUT
  const { cardId } = req.params;
  const card = Card.findById(cardId);

  if (!card) {
    return res.status(404).send({ message: 'карточка не найдена' });
  }

  card.likes.push(req.user._id);

  return res.send({ data: card });
};

module.exports.deleteLike = (req, res) => {
  const { cardId } = req.params;
  const card = Card.findById(cardId);

  if (!card) {
    return res.status(404).send({ message: 'карточка не найдена' });
  }

  if (!card.likes.includes(req.user._id)) {
    return res.status(400).json({ message: 'Лайк не найден' });
  }

  card.likes = card.likes.filter((likeId) => likeId.toString() !== req.user._id.toString());

  return res.send({ data: card });
};
