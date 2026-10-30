// routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// 🔹 READ: Get all students
router.get('/', (req, res) => {
  db.query('SELECT * FROM students', (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error', details: err });
    res.json(result);
  });
});

// 🔹 CREATE: Add a new student
router.post('/', (req, res) => {
  const { name, email, phone, dept_id } = req.body;
  const sql = 'INSERT INTO students (name, email, phone, dept_id) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, email, phone, dept_id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Insert failed', details: err.sqlMessage });
    res.json({ message: '✅ Student added successfully!' });
  });
});

// 🔹 UPDATE: Update a student
router.put('/:id', (req, res) => {
  const studentId = req.params.id;
  const { name, email, phone, dept_id } = req.body;
  const sql = 'UPDATE students SET name = ?, email = ?, phone = ?, dept_id = ? WHERE student_id = ?';
  db.query(sql, [name, email, phone, dept_id, studentId], (err, result) => {
    if (err) return res.status(500).json({ error: 'Update failed', details: err.sqlMessage });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Student not found' });
    res.json({ message: '✏️ Student updated successfully!' });
  });
});

// 🔹 DELETE: Delete a student
router.delete('/:id', (req, res) => {
  const studentId = req.params.id;
  db.query('DELETE FROM students WHERE student_id = ?', [studentId], (err, result) => {
    if (err) return res.status(500).json({ error: 'Delete failed', details: err.sqlMessage });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Student not found' });
    res.json({ message: '🗑️ Student deleted successfully!' });
  });
});

module.exports = router;
