const express = require('express');
const mongoose = require('mongoose');

const userRoutes = require('./routes/users');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mesto', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/users', userRoutes);
app.use('/', (req, res) => {
  res.send({ message: '123' });
});

app.listen(PORT, () => {
  console.log(PORT, 'im working');
});
