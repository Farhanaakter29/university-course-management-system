const express = require('express');
const router = express.Router();
const db = require('../db');

// 🔹 GET results
router.get('/', (req, res) => {
  const loggedInUser = req.query.user; // username passed from frontend
  const role = req.query.role;

  if (!loggedInUser || !role) {
    return res.status(400).json({ error: 'Missing user info' });
  }

  if (role === 'admin') {
    // Admin sees all results
    db.query('SELECT * FROM results', (err, result) => {
      if (err) return res.status(500).json({ error: 'DB error' });
      res.json(result);
    });
  } else {
    // Students see only their own results (assuming username = student_id or maps to it)
    const query = `
      SELECT r.* FROM results r
      JOIN students s ON r.student_id = s.student_id
      WHERE s.email = ?
    `;
    db.query(query, [loggedInUser], (err, result) => {
      if (err) return res.status(500).json({ error: 'DB error', details: err.sqlMessage });
      res.json(result);
    });
  }
});

// 🔹 ADD result
router.post('/', (req, res) => {
  const { student_id, course_id, grade, marks } = req.body;
  db.query('INSERT INTO results (student_id, course_id, grade, marks) VALUES (?, ?, ?, ?)',
    [student_id, course_id, grade, marks],
    (err) => {
      if (err) return res.status(500).json({ error: 'Insert failed', details: err.sqlMessage });
      res.json({ message: '✅ Result added!' });
    });
});

// 🔹 UPDATE result using body data
router.put('/', (req, res) => {
  const { student_id, course_id, grade, marks } = req.body;

  const query = 'UPDATE results SET grade = ?, marks = ? WHERE student_id = ? AND course_id = ?';
  db.query(query, [grade, marks, student_id, course_id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Update failed', details: err.sqlMessage });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Result not found' });
    res.json({ message: '✏️ Result updated!' });
  });
});

// 🔹 DELETE result using body data
router.delete('/', (req, res) => {
  const { student_id, course_id } = req.body;

  const query = 'DELETE FROM results WHERE student_id = ? AND course_id = ?';
  db.query(query, [student_id, course_id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Delete failed', details: err.sqlMessage });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Result not found' });
    res.json({ message: '🗑️ Result deleted!' });
  });
});

// GET /api/results/student/:username
router.get('/student/:username', (req, res) => {
  const { username } = req.params;

  const query = `
    SELECT r.* FROM results r
    JOIN students s ON r.student_id = s.student_id
    WHERE s.email = ?
  `;

  db.query(query, [username], (err, result) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json(result);
  });
});

module.exports = router;
