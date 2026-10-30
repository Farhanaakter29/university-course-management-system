// db.js
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // or your MySQL password
  database: 'university_course_management'
});
connection.connect((err) => {
  if (err) throw err;
  console.log('✅ MySQL Connected!');
});
module.exports = connection;
