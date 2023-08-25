const express = require('express');

const router = express.Router();
const { findAllCards, createCard, deleteCard } = require('../controllers/cards');

router.get('/cards', findAllCards);
router.post('/cards ', createCard);
router.delete('/cards/:cardId', deleteCard);
