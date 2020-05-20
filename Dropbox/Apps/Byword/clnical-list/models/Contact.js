const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String,
    required: [true, '名前を入力してください．名字と名前の間にはスペースをあけて下さい．']
  },
  email: {
    type: String,
    required: [true, 'Eメールアドレスを入力してください'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      '正しいEメールアドレスを入力して下さい．'
    ]
  },  
  phone: {
    type: String
  },  
  type: {
    type: String,
    enum: ['発熱，咳', '発熱，咳以外'],
    default: '発熱，咳'
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('contact', ContactSchema);