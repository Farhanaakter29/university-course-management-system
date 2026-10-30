const express = require('express');
const router = express.Router();
const db = require('../db'); // database connection

// 🔹 GET all enrollments
router.get('/', (req, res) => {
  db.query('SELECT * FROM enrollments', (err, result) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json(result);
  });
});

// 🔹 ADD enrollment (Create)
router.post('/', (req, res) => {
  const { student_id, course_id, enrollment_date } = req.body;
  const query = `
    INSERT INTO enrollments (student_id, course_id, enrollment_date)
    VALUES (?, ?, ?)
  `;
  db.query(query, [student_id, course_id, enrollment_date], (err) => {
    if (err) return res.status(500).json({ error: 'Insert failed', details: err.sqlMessage });
    res.json({ message: '✅ Enrollment added!' });
  });
});

// 🔹 UPDATE enrollment
router.put('/', (req, res) => {
  const { student_id, course_id, enrollment_date } = req.body;
  const query = `
    UPDATE enrollments
    SET enrollment_date = ?
    WHERE student_id = ? AND course_id = ?
  `;
  db.query(query, [enrollment_date, student_id, course_id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Update failed', details: err.sqlMessage });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Enrollment not found' });
    res.json({ message: '✏️ Enrollment updated!' });
  });
});

// 🔹 DELETE enrollment
router.delete('/', (req, res) => {
  const { student_id, course_id } = req.body;
  const query = `
    DELETE FROM enrollments
    WHERE student_id = ? AND course_id = ?
  `;
  db.query(query, [student_id, course_id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Delete failed', details: err.sqlMessage });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Enrollment not found' });
    res.json({ message: '🗑️ Enrollment deleted!' });
  });
});

module.exports = router;
