const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Contact = require('../models/Contact');
const { check, validationResult } = require('express-validator');


// @route   GET api/v1/contacts
// @des     Get all users contacts
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1});
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/v1/contacts
// @des     Add new contact
// @access  Private
router.post('/',[auth, [ check('name', '名前の入力は必要です．').not().isEmpty()]], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }


const { name, email, phone ,type} = req.body;

  try {
    const newContact = new Contact({
      name, 
      email,
      phone,
      type,
      user: req.user.id
    })

    const contact = await newContact.save();

    res.json(contact);
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
// @route   PUT api/v1/contacts/:id
// @des     Update contact
// @access  Private
router.put('/:id',auth, async (req, res) => {
  const { name, email, phone ,type} = req.body;

  // Build contact object
  const contactFields = {};
  if(name) contactFields.name = name;
  if(email) contactFields.email = email;
  if(phone) contactFields.phone = phone;
  if(name) contactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id);

    if(!contact) return res.status(404).json({ msg: '患者さんはみつかりませんでした．' });

    // Make sure user owns contact
    if(contact.user.toString() != req.user.id) {
      return res.status(401).json({ msg: '権限がありません．' });
    } 

    contact = await Contact.findByIdAndUpdate(req.params.id, { $set: contactFields }, { new: true });

    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }

});

// @route   DELETE api/v1/contacts/:id
// @des     Delete contact
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  
  try {
    let contact = await Contact.findById(req.params.id);

    if(!contact) return res.status(404).json({ msg: '患者さんはみつかりませんでした' });

    // Make sure user owns contact
    if(contact.user.toString() != req.user.id) {
      return res.status(401).json({ msg: '権限がありません．' });
    } 

    await Contact.findByIdAndRemove(req.params.id);

    res.json({ msg: '患者さんのデータは削除されました' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


module.exports = router;