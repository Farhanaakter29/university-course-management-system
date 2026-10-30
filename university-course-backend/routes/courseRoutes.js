// routes/courseRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// 🔹 GET all courses
router.get('/', (req, res) => {
  db.query('SELECT * FROM courses', (err, result) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json(result);
  });
});

// 🔹 CREATE course
router.post('/', (req, res) => {
  const { course_name, course_code, credit, dept_id } = req.body;
  const sql = 'INSERT INTO courses (course_name, course_code, credit, dept_id) VALUES (?, ?, ?, ?)';
  db.query(sql, [course_name, course_code, credit, dept_id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Insert failed', details: err.sqlMessage });
    res.json({ message: '✅ Course added successfully!' });
  });
});

// 🔹 UPDATE course
router.put('/:id', (req, res) => {
  const courseId = req.params.id;
  const { course_name, course_code, credit, dept_id } = req.body;
  const sql = 'UPDATE courses SET course_name = ?, course_code = ?, credit = ?, dept_id = ? WHERE course_id = ?';
  db.query(sql, [course_name, course_code, credit, dept_id, courseId], (err, result) => {
    if (err) return res.status(500).json({ error: 'Update failed', details: err.sqlMessage });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Course not found' });
    res.json({ message: '✏️ Course updated successfully!' });
  });
});

// 🔹 DELETE course
router.delete('/:id', (req, res) => {
  const courseId = req.params.id;
  db.query('DELETE FROM courses WHERE course_id = ?', [courseId], (err, result) => {
    if (err) return res.status(500).json({ error: 'Delete failed', details: err.sqlMessage });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Course not found' });
    res.json({ message: '🗑️ Course deleted successfully!' });
  });
});

module.exports = router;
