const express = require('express');
const router = express.Router();
const db = require('../db');

// 🔹 Create (Signup)
router.post('/api/users', (req, res) => {
  const { username, password, role } = req.body;
  const query = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
  db.query(query, [username, password, role], (err, result) => {
    if (err) return res.status(500).json({ error: 'Insert failed', details: err.sqlMessage });
    res.json({ message: 'User created successfully!' });
  });
});

// 🔹 Read (Get all users)
router.get('/api/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).json({ error: 'Fetch failed', details: err.sqlMessage });
    res.json(results);
  });
});

// 🔹 Update (Update password or role)
router.put('/api/users/:username', (req, res) => {
  const { username } = req.params;
  const { password, role } = req.body;
  const query = 'UPDATE users SET password = ?, role = ? WHERE username = ?';
  db.query(query, [password, role, username], (err, result) => {
    if (err) return res.status(500).json({ error: 'Update failed', details: err.sqlMessage });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User updated successfully!' });
  });
});

// 🔹 Delete
router.delete('/api/users/:username', (req, res) => {
  const { username } = req.params;
  const query = 'DELETE FROM users WHERE username = ?';
  db.query(query, [username], (err, result) => {
    if (err) return res.status(500).json({ error: 'Delete failed', details: err.sqlMessage });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted successfully!' });
  });
});

// 🔹 Login route
router.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(query, [username, password], (err, results) => {
    if (err) return res.status(500).json({ error: 'Login failed', details: err.sqlMessage });
    if (results.length > 0) {
      res.json({ message: 'Login successful', user: results[0] });
    } else {
      res.status(401).json({ error: 'Invalid username or password' });
    }
  });
});

module.exports = router;
