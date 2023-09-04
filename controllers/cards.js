const Card = require('../models/card');

const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const DeleteCardError = require('../errors/delete-card-err');

module.exports.findAllCards = (req, res, next) => { // GET
  Card.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      next(err);
    });
};

// eslint-disable-next-line consistent-return
module.exports.createCard = (req, res, next) => { // POST
  const { name, link } = req.body;
  const userId = req.user._id;

  if (!name || !link) {
    throw new BadRequestError('Переданы некорректные данные при создании карточки.');
  }
  Card.create({ name, link, owner: userId })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      next(err);
    });
};

// eslint-disable-next-line consistent-return
module.exports.deleteCard = (req, res, next) => { // DELETE
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findByIdAndDelete(cardId)
    .then((card) => {
      if (card.owner !== userId) {
        throw new DeleteCardError('Вы не можете удалить не свою карточку');
      } else {
        res.status(200).send({ data: card });
      }
    })
    .catch(() => {
      next(new NotFoundError('Передан несуществующий _id карточки'));
    });
};

// eslint-disable-next-line consistent-return
module.exports.likeCard = (req, res, next) => { // PUT
  const { cardId } = req.params.cardId;

  Card.findByIdAndUpdate(cardId)
    .then((card) => {
      if (!card) {
        throw new BadRequestError('Передан несуществующий _id карточки');
      }
      res.status(200).send({ data: card });
    })
    .catch((err) => {
      next(err);
    });
};

// eslint-disable-next-line consistent-return
module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Передан несуществующий _id карточки');
      }
      res.status(200).send({ data: card });
    })
    .catch(() => {
      next(new BadRequestError('Передан несуществующий _id карточки'));
    });
};
