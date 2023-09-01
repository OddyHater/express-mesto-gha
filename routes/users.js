const express = require('express');
const { celebrate, Joi } = require('celebrate');

const router = express.Router();

const {
  findAllUsers,
  findUserById,
  updateProfile,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');

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

router.get('/users', findAllUsersValidation, findAllUsers);

router.get('/users/me', getCurrentUserValidataion, getCurrentUser);
router.get('/users/:userId', findAllUsersValidation, findUserById);
router.patch('/users/me', updateProfileValidation, updateProfile);
router.patch('/users/me/avatar', updateAvatarValidation, updateAvatar);

module.exports = router;
