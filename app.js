const express = require('express');
const mongoose = require('mongoose');

const userRoutes = require('./routes/users');
const cardRouter = require('./routes/cards');

const PORT = 3000;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true,
});

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: '64ecd02570503b3e0f4cf7b4',
  };

  next();
});

app.use('/', userRoutes);
app.use('/', cardRouter);

// app.use('/', (req, res) => {
//   res.send({ message: '123' });
// });

app.listen(PORT, () => {
  console.log(PORT, 'im working');
});
