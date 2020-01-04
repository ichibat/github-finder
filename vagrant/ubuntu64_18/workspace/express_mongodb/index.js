const express = require('express');
const app = express();

port = 3000;

app.get('/', (req, res) => {
  res.send('Good afternoon!');
});

app.listen(port, (req, res) => {
  console.log(`port listening on ${port}!`);
});