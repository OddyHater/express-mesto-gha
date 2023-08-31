const express = require('express');

const router = express.Router();

const {
  findAllUsers,
  findUserById,
  createUser,
  updateProfile,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');

const { login } = require('../controllers/login');

router.get('/users', findAllUsers);

router.post('/signin', login);
router.post('/signup', createUser);

router.get('/users/me', getCurrentUser);
router.get('/users/:userId', findUserById);
router.patch('/users/me', updateProfile);
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
