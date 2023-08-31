require('dotenv').config();

const { JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');

// eslint-disable-next-line consistent-return
module.exports.auth = (req, res, next) => {
  const { authorization } = req.body;

  if (!authorization || !authorization.startsWith('Baerer ')) {
    return res.status(401).send({ message: 'Необходимо авторизироваться' });
  }

  const token = authorization.replace('Baerer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(401).send({ message: 'Необходимо авторизироваться' });
  }

  req.user = payload;

  next();
};
