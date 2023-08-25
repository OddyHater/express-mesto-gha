const express = require('express');

const router = express.Router();
const { findAllUsers, findUserById, createUser } = require('../controllers/users');

router.get('/users', findAllUsers);
router.get('/users/:userId', findUserById);
router.post('/users', createUser);

module.exports = router;
