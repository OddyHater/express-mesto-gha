const express = require('express');

const router = express.Router();

const {
  findAllUsers,
  findUserById,
  createUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

router.get('/users', findAllUsers);
router.post('/users', createUser);
router.get('/users/:userId', findUserById);
router.patch('/users/me', updateProfile);
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
