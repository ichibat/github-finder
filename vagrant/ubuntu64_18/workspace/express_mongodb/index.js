const express = require('express');
const app = express();
const mongoose = require('mongoose');

const User = require('./models/User');

const options = { useNewUrlParser: true, useUnifiedTopology: true }
port = 3000;

mongoose.connect('mongodb://127.0.0.1/test_db', options);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'DB connection error:'));
db.once('open', () => console.log('DB connection successful'));

app.get('/', (req, res) => {
  res.send('Good afternoon!');
});

app.get('/user', async (req, res) => {
  const users = await User.find({});
  res.json(users);
})

app.listen(port, (req, res) => {
  console.log(`port listening on ${port}!`);
});