const express = require('express');

const { PORT = 3000 } = process.env;
const app = express();

app.use('/', (req, res) => {
  res.send({ message: '123' });
});

app.listen(PORT, () => {
  console.log('123');
});
