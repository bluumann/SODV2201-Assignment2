const express = require('express');
const app = express();
app.use(express.json());
const port = 5000;

// Import courses array from data.js
const { courses } = require('../backend/database/data.js');

// API: default route
app.get('/', (req, res) => {
  res.send('BVC Course Registration Backend');
});

// API: retrieve all courses
app.get('/api/courses', (req, res) => {
  res.send(courses);
});

// API: retrieve a course by id
app.get('/api/courses/:courseCode', (req, res) => {
  const course = courses.find(c => c.courseCode === req.params.courseCode);
  if (!course)
    return res
      .status(404)
      .send('The course with the given "course code" was not found.');
  res.send(course);
});

// API: create new course
app.post('/api/courses', (req, res) => {
  const course = {
    courseCode: req.body.courseCode,
    courseName: req.body.courseName,
    courseTerm: req.body.courseTerm,
    courseStartDate: req.body.courseStartDate,
    courseEndDate: req.body.courseEndDate,
    courseFees: req.body.courseFees,
    courseDescription: req.body.courseDescription,
  };
  courses.push(course);
  res.send(course);
});

// API: delete a course
app.delete('/api/courses/:courseCode', (req, res) => {
  const course = courses.find(c => c.courseCode === req.params.courseCode);
  if (!course)
    return res
      .status(404)
      .send('The course with the given "course code" was not found.');

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
