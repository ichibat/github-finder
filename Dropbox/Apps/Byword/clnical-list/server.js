const express = require('express');
const connectDB = require('./config/db');

// Route files
const contacts = require('./routes/contacts');
const auth = require('./routes/auth');
const users = require('./routes/users');

const app = express();

// Init Middleware
app.use(express.json({ extended: false }));

// Mount Routes
app.use('/api/v1/users', users);
app.use('/api/v1/auth', auth);
app.use('/api/v1/contacts', contacts);

// Connect Database
connectDB();

app.get('/', (req, res) => res.json({ "msg": "Welcome" }));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});