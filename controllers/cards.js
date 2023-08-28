const Card = require('../models/card');

const ERROR_CODES = {
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

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
    return sendError(res, ERROR_CODES.BAD_REQUEST, 'Переданы некорректные данные при создании карточки.');
  }
  Card.create({ name, link, owner: userId })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => sendError(err, ERROR_CODES.INTERNAL_SERVER_ERROR, 'На сервере произошла ошибка'));
};

// eslint-disable-next-line consistent-return
module.exports.deleteCard = (req, res) => { // DELETE
  const { cardId } = req.body;
  const userId = req.user._id;
  if (!cardId) {
    return sendError(res, ERROR_CODES.BAD_REQUEST, 'Карточка с указанным _id не найдена.');
  }
  if (!userId) {
    return sendError(res, ERROR_CODES.BAD_REQUEST, 'Неверные данные пользователя');
  }
  Card.findByIdAndDelete(cardId)
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => sendError(err, ERROR_CODES.INTERNAL_SERVER_ERROR, 'На сервере произошла ошибка'));
};

// eslint-disable-next-line consistent-return
module.exports.likeCard = (req, res) => { // PUT
  if (!req.params.cardId) {
    return sendError(res, ERROR_CODES.BAD_REQUEST, 'Передан несуществующий _id карточки.');
  }
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.status(201).send({ data: card }))
    .catch(() => res.status(ERROR_CODES.INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' }));
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
    .then((card) => res.status(201).send({ data: card }))
    .catch(() => res.status(ERROR_CODES.INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' }));
};
