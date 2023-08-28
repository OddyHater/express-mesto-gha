const Card = require('../models/card');

function sendError(res, statusCode, message) {
  return res.status(statusCode).json({ message });
}

module.exports.findAllCards = () => { // GET
  Card.find();
};

// eslint-disable-next-line consistent-return
module.exports.createCard = (req, res) => { // POST
  const { name, link } = req.body;
  const userId = req.user._id;
  if (!name || !link) {
    return sendError(res, 400, 'Некорректные данные');
  }
  if (!userId) {
    return sendError(res, 400, 'Неверные данные пользователя');
  }
  Card.create({ name, link, owner: userId })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => sendError(err, 500, 'Ошибка при создании карточки'));
};

// eslint-disable-next-line consistent-return
module.exports.deleteCard = (req, res) => { // DELETE
  const { cardId } = req.body;
  const userId = req.user._id;
  if (!cardId) {
    return sendError(res, 400, 'Некорректные данные');
  }
  if (!userId) {
    return sendError(res, 400, 'Неверные данные пользователя');
  }
  Card.findByIdAndDelete(cardId)
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => sendError(err, 500, 'Ошибка при удалении карточки'));
};

// eslint-disable-next-line consistent-return
module.exports.likeCard = (req, res) => { // PUT
  if (!req.params.cardId) {
    return sendError(res, 400, 'Некорректные данные');
  }
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => res.status(500).send({ message: err }));
};

// eslint-disable-next-line consistent-return
module.exports.dislikeCard = (req, res) => {
  if (!req.params.cardId) {
    return sendError(res, 400, 'Некорректные данные');
  }
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => res.status(500).send({ message: err }));
};
