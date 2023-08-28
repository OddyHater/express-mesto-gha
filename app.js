const express = require('express');
const mongoose = require('mongoose');

const userRoutes = require('./routes/users');

const PORT = 3000;
const app = express();

mongoose.connect('mongodb://localhost:27017/users', {
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
