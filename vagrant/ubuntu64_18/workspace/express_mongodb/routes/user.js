const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.use(express.json());


router.get('/', async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

router.post('/', async(req, res) => {
  const user = new User({
    name: req.body.name,
    age: req.body.age
  });
  const savedUser = await user.save();
  res.json(savedUser);
});

router.get('/:userID', (req, res) => {
  User.findById(req.params.userID, (err, user)=> {
    if (err) console.log('error');
    res.send(user);
  });
});


module.exports = router;