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
router.get('/users/:userId', findUserById);
router.post('/users', createUser);
router.post('/users/me', updateProfile);
router.post('/users/me/avatar', updateAvatar);

module.exports = router;
