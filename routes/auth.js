const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Hardcoded credentials Or we could put in .env file and use dotenv module (should be stored securely in prod in a secret manager)
const username = 'admin';
const password = 'password';
const SECRET_KEY = 'mysecretkey';

// Generate Auth Token
router.post('/token', (req, res) => {
  const { username: reqUsername, password: reqPassword } = req.body;
  if (reqUsername === username && reqPassword === password) {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;
