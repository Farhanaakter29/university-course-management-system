// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const studentRoutes = require('./routes/studentRoutes');
const facultyRoutes = require('./routes/facultyRoutes');
const courseRoutes = require('./routes/courseRoutes');
const enrollmentRoutes = require('./routes/enrollmentRoutes');
const resultRoutes = require('./routes/resultRoutes');
const teachesRoutes = require('./routes/teachesRoutes');
const authRoutes = require('./routes/authRoutes');
const departmentRoutes = require('./routes/departmentsRoutes');


app.use(cors());
app.use(express.json());

// Routes
app.use('/api/students', studentRoutes);
app.use('/api/faculty', facultyRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/teaches', teachesRoutes);
app.use(authRoutes); 
app.use(departmentRoutes);
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
