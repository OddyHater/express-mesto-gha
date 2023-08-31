require('dotenv').config();

const { JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const AuthError = require('../errors/auth-err');

// eslint-disable-next-line consistent-return
module.exports.auth = (req, res, next) => {
  const { authorization } = req.body;

  if (!authorization || !authorization.startsWith('Baerer ')) {
    throw new AuthError('Необходимо авторизироваться');
  }

  const token = authorization.replace('Baerer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new AuthError('Необходимо авторизироваться');
  }

  req.user = payload;

  next();
};
