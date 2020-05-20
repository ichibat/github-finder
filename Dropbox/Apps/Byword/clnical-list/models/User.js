const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, '名前を入力してください．名字と名前の間にはスペースをあけて下さい．']
  },
  email: {
    type: String,
    required: [true, 'Eメールアドレスを入力してください'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      '正しいEメールアドレスを入力して下さい．'
    ]
  },  
  password: {
    type: String,
    required: [true, '6文字以上のパスワードを入力して下さい．'],
    minlength: 6,
    select: false
  },  
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('user', UserSchema);