const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Load student data from the JSON file
const students = require('./students.json');

// API endpoint to get all students
app.get('/api/students', (req, res) => {
  res.json(students);
});

// API endpoint to add a new student
app.post('/api/students', (req, res) => {
  const newStudent = req.body;
  students.push(newStudent);
  res.json(newStudent);
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});