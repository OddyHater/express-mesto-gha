const { celebrate, Joi } = require('celebrate');

// User validators
const findAllUsersValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string(),
  }),
});

const getCurrentUserValidataion = celebrate({
  params: Joi.object().keys({
    userId: Joi.string(),
  }),
});

const updateProfileValidation = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const updateAvatarValidation = celebrate({
  params: Joi.object().keys({
    id: Joi.string(),
  }),
  body: Joi.object().keys({
    avatar: Joi.link(),
  }),
});

const createUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().uri(),
  }),
});
// User validators

// Card Validators
const createCardValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    link: Joi.string().uri(),
  }),
  params: Joi.object().keys({
    user: Joi.object().keys({
      _id: Joi.string().required(),
    }).unknown(),
  }).unknown(),
});

const deleteCardValidator = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required(),
  }),
});

const likeCardValidator = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required(),
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
