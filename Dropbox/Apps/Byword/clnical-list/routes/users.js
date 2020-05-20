const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');
const { check, validationResult } = require('express-validator');



// @route   POST api/v1/users
// @des     Register a user
// @access  Public
router.post('/', [
  check('name', '名前を入力してください．名字と名前の間にはスペースをあけて下さい．').not().isEmpty(),
  check('email', '正しいEメールアドレスを入力してください.').isEmail(),
  check('password', '6文字以上のパスワードを入力して下さい．').isLength({ min: 6 })
], 
async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if(user) {
      return res.status(400).json({ msg: '同じユーザーがすでに登録済みです．'})
    }

    user = new User({
      name,
      email,
      password
    })

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id
      }
    }
    
    jwt.sign( payload, config.get('jwtSecret'), {
      expiresIn: 360000
    }, (err, token) => {
      if(err) throw err;
      res.json({token});
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error.')
    
  }

});



module.exports = router;