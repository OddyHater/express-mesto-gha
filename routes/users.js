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

router.get('/users', findAllUsersValidation, findAllUsers);

router.get('/users/me', getCurrentUser);
router.get('/users/:userId', findUserById);
router.patch('/users/me', updateProfile);
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
