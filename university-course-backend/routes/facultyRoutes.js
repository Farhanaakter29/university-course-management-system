const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all faculty
router.get('/', (req, res) => {
  db.query('SELECT * FROM faculty', (err, result) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json(result);
  });
});

// ADD faculty
router.post('/', (req, res) => {
  const { name, email, phone, dept_id } = req.body;
  db.query('INSERT INTO faculty (name, email, phone, dept_id) VALUES (?, ?, ?, ?)',
    [name, email, phone, dept_id],
    (err) => {
      if (err) return res.status(500).json({ error: 'Insert failed', details: err.sqlMessage });
      res.json({ message: 'Faculty added!' });
    });
});

// UPDATE faculty
router.put('/:id', (req, res) => {
  const { name, email, phone, dept_id } = req.body;
  db.query('UPDATE faculty SET name = ?, email = ?, phone = ?, dept_id = ? WHERE faculty_id = ?',
    [name, email, phone, dept_id, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Update failed', details: err.sqlMessage });
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Faculty not found' });
      res.json({ message: 'Faculty updated!' });
    });
});

// DELETE faculty
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM faculty WHERE faculty_id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Delete failed', details: err.sqlMessage });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Faculty not found' });
    res.json({ message: 'Faculty deleted!' });
  });
});

module.exports = router;
