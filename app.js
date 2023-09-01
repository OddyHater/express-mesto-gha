const express = require('express');
const mongoose = require('mongoose');
const { celebrate, Joi } = require('celebrate');

const userRoutes = require('./routes/users');
const cardRouter = require('./routes/cards');

const { createUser } = require('./controllers/users');
const { login } = require('./controllers/login');
const { auth } = require('./middlewares/auth');

const createUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string(),
    email: Joi.string().required(),
    password: Joi.string().required().min(8),
  }),
});

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true,
});

app.use(express.json());

app.use('/404', (req, res, next) => {
  res.status(404).send({ message: 'Страница не найдена' });

  next();
});

app.post('/signin', login);
app.post('/signup', createUserValidation, createUser);

app.use(auth);

app.use('/', userRoutes);
app.use('/', cardRouter);

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'Ошибка сервера'
        : message,
    });

  next();
});

app.listen(PORT, () => {
  console.log(PORT, 'im working');
});
