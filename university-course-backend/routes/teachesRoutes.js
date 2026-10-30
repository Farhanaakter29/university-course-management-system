const express = require('express');
const router = express.Router();
const db = require('../db');

// 🔹 GET all
router.get('/', (req, res) => {
  db.query('SELECT * FROM teaches', (err, result) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json(result);
  });
});

// 🔹 ADD
router.post('/', (req, res) => {
  const { faculty_id, course_id } = req.body;
  db.query('INSERT INTO teaches (faculty_id, course_id) VALUES (?, ?)',
    [faculty_id, course_id],
    (err) => {
      if (err) return res.status(500).json({ error: 'Insert failed', details: err.sqlMessage });
      res.json({ message: '✅ Teaches record added!' });
    });
});


// ✅ DELETE with URL params
router.delete('/:faculty_id/:course_id', (req, res) => {
  const { faculty_id, course_id } = req.params;
  db.query('DELETE FROM teaches WHERE faculty_id = ? AND course_id = ?',
    [faculty_id, course_id],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Delete failed', details: err.sqlMessage });
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Record not found' });
      res.json({ message: '🗑️ Teaches record deleted!' });
    });
});

module.exports = router;
