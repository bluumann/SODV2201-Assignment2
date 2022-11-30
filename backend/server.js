const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');
const port = 5000;

app.use(express.json());
app.use(cors());

// PETER
// Loading courses from database/courseData.json
if (fs.existsSync('database/courseData.json')) {
  let data = fs.readFileSync('database/courseData.json', 'utf8');
  courseData = JSON.parse(data);
} else {
  console.log(
    'Could not load courses from database/courses.json - Check if file exists.'
  );
}

// PETER
// API (GET): retrieve all courses
app.get('/api/courses', (req, res) => {
  if (fs.existsSync('database/courseData.json')) {
    let data = fs.readFileSync('database/courseData.json', 'utf8');
    courseData = JSON.parse(data);
  } else {
    console.log(
      'Could not load courses from database/courses.json - Check if file exists.'
    );
  }
  res.send(courseData);
});

// PETER
// API (POST): create new course
app.post('/api/courses', (req, res) => {
  let newCourse = {
    courseCode: req.body.courseCode,
    courseName: req.body.courseName,
    courseTerm: req.body.courseTerm,
    courseStartDate: req.body.courseStartDate,
    courseEndDate: req.body.courseEndDate,
    courseFees: req.body.courseFees,
    courseDescription: req.body.courseDescription,
  };

  courseData.courses.push(newCourse);
  res.send(newCourse);

  let data = JSON.stringify(courseData, null, 2);
  fs.writeFile('database/courseData.json', data, completed);
  function completed() {
    console.log('New course has been added to database/courseData.json');
  }
});

// PETER
// API (DELETE): delete a course
app.delete('/api/courses/:courseCode', (req, res) => {
  const course = courseData.courses.find(
    c => c.courseCode === req.params.courseCode
  );
  if (!course)
    return res
      .status(404)
      .send('The course with the given "course code" was not found.');

  const index = courseData.courses.indexOf(course);
  courseData.courses.splice(index, 1);

  let data = JSON.stringify(courseData, null, 2);
  fs.writeFile('database/courseData.json', data, completed);
  function completed() {
    console.log(
      'The selected course has been deleted from database/courseData.json'
    );
  }
  res.send(course);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
