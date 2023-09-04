const { celebrate, Joi } = require('celebrate');
const { ObjectID } = require('mongoose').Types;

// User validators
const findAllUsersValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().custom((value, helpers) => {
      if (ObjectID.isValid(value)) {
        return value;
      }
      return helpers.message('Неверный id');
    }),
  }).unknown(),
});

const getCurrentUserValidataion = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().custom((value, helpers) => {
      if (ObjectID.isValid(value)) {
        return value;
      }
      return helpers.message('Неверный id');
    }),
  }).unknown(),
});

const updateProfileValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }).unknown(),
});

const updateAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.link(),
  }).unknown(),
});

const createUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().uri(),
  }).unknown(),
});
// User validators

// Card Validators
const createCardValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().uri(),
  }).unknown(),
  params: Joi.object().keys({
    user: Joi.object().keys({
      _id: Joi.string().custom((value, helpers) => {
        if (ObjectID.isValid(value)) {
          return value;
        }
        return helpers.message('Неверный id');
      }).required(),
    }).unknown(),
  }).unknown(),
});

const deleteCardValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().custom((value, helpers) => {
      if (ObjectID.isValid(value)) {
        return value;
      }
      return helpers.message('Неверный id');
    }).required(),
  }),
});

const likeCardValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().custom((value, helpers) => {
      if (ObjectID.isValid(value)) {
        return value;
      }
      return helpers.message('Неверный id');
    }).required(),
  }).unknown(),
});
// Card Validators

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
  }),
});

module.exports = {
  // users
  findAllUsersValidation,
  getCurrentUserValidataion,
  updateProfileValidation,
  updateAvatarValidation,
  createUserValidation,
  loginValidation,
  // users
  //
  // cards
  createCardValidator,
  deleteCardValidator,
  likeCardValidator,
  // cards
};
