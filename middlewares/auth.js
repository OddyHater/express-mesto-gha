const jwt = require('jsonwebtoken');
const AuthError = require('../errors/auth-err');

// eslint-disable-next-line consistent-return
module.exports.auth = (req, res, next) => {
  const { authorization } = req.params;

  if (!authorization || !authorization.startsWith('Baerer ')) {
    throw new AuthError('Необходимо авторизироваться 1');
  }

  const token = authorization.replace('Baerer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-key');
  } catch (err) {
    throw new AuthError('Необходимо авторизироваться 2');
  }

  req.user = payload;

  return next();
};
