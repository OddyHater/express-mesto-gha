const express = require('express');

const router = express.Router();

const {
  findAllUsers,
  findUserById,
  updateProfile,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');

router.get('/users', findAllUsers);

router.get('/users/me', getCurrentUser);
router.get('/users/:userId', findUserById);
router.patch('/users/me', updateProfile);
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
