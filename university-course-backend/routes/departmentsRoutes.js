// routes/departmentsRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/api/departments', (req, res) => {
  db.query('SELECT * FROM departments', (err, results) => {
    if (err) return res.status(500).json({ error: 'Fetch failed', details: err.sqlMessage });
    res.json(results);
  });
});

module.exports = router;
