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

router.delete('/:userID', async (req, res) => {
  const user = await User.deleteOne({ _id: req.params.userID });
  res.send(user);
});

router.patch('/:userID', async (req,res) => {
  console.log(req.body.age);
  const user = await User.updateOne({_id: req.params.userID}, {$set:{age:req.body.age}});
  res.send(user);
})

module.exports = router;