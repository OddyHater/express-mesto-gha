const Card = require('../models/card');

const ERROR_CODES = {
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

function sendError(res, statusCode, message) {
  return res.status(statusCode).json({ message });
}

module.exports.findAllCards = (req, res) => { // GET
  Card.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => sendError(res, ERROR_CODES.INTERNAL_SERVER_ERROR, 'На сервере произошла ошибка'));
};

// eslint-disable-next-line consistent-return
module.exports.createCard = (req, res) => { // POST
  const { name, link } = req.body;
  const userId = req.user._id;
  if (!name || !link) {
    return sendError(res, ERROR_CODES.BAD_REQUEST, 'Переданы некорректные данные при создании карточки.');
  }
  Card.create({ name, link, owner: userId })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return sendError(res, ERROR_CODES.BAD_REQUEST, 'Переданы некорректные данные при создании пользователя.');
      }
      return sendError(res, ERROR_CODES.INTERNAL_SERVER_ERROR, 'На сервере произошла ошибка');
    });
};

// eslint-disable-next-line consistent-return
module.exports.deleteCard = (req, res) => { // DELETE
  const { cardId } = req.params;
  Card.findByIdAndDelete(cardId)
    .then((card) => {
      if (!card) {
        sendError(res, ERROR_CODES.NOT_FOUND, 'Передан несуществующий _id карточки');
      }
      res.status(200).send({ data: card });
    })
    .catch(() => sendError(res, ERROR_CODES.BAD_REQUEST, 'На сервере произошла ошибка'));
};

// eslint-disable-next-line consistent-return
module.exports.likeCard = (req, res) => { // PUT
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        sendError(res, ERROR_CODES.NOT_FOUND, 'Передан несуществующий _id карточки');
      }
      res.status(200).send({ data: card });
    })
    .catch(() => res.status(ERROR_CODES.BAD_REQUEST).send({ message: ' Переданы некорректные данные для постановки лайка.' }));
};

// eslint-disable-next-line consistent-return
module.exports.dislikeCard = (req, res) => {
  if (!req.params.cardId) {
    return sendError(res, ERROR_CODES.BAD_REQUEST, 'Передан несуществующий _id карточки.');
  }
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        sendError(res, ERROR_CODES.NOT_FOUND, 'Передан несуществующий _id карточки');
      }
      res.status(200).send({ data: card });
    })
    .catch(() => res.status(ERROR_CODES.BAD_REQUEST).send({ message: 'Переданы некорректные данные для снятия лайка.' }));
};
