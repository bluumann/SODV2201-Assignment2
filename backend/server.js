const _ = require('underscore');
const cors = require('cors');
const express = require('express');
const fs = require('fs');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**** WAS MADE FOR TESTING ON MY END CAN IGNORE (COLIN) CAN BE DELETED AT LATER DATE *****/
// let objData;
//
// if (fs.existsSync("database/data.json")) {
//   console.log('Loading data from "database/data.json"');
//   let data = fs.readFileSync("database/data.json", "utf8");
//   objData = JSON.parse(data);
// } else {
//   console.log('Created variable "obj" to hold data');
//   objData = {
//     Admins: [],
//     Courses: [
//       {
//         courseCode: "PM111",
//         courseName: "Intro to Project Management",
//         courseTerm: 1,
//         courseStartDate: "2022-09-06",
//         courseEndDate: "2022-12-16",
//         courseFees: "676.67",
//         courseDescription:
//           "This is a course where we will introduce you to basic Project Management concepts.",
//       },
//       {
//         courseCode: "PF111",
//         courseName: "C++ Programming Fundamentals",
//         courseTerm: 1,
//         courseStartDate: "2022-09-06",
//         courseEndDate: "2022-12-16",
//         courseFees: "785.15",
//         courseDescription:
//           "This is a course where we will introduce you to basic C++ Programming fundamentals.",
//       },
//       {
//         courseCode: "CM111",
//         courseName: "Computer Maintenance",
//         courseTerm: 1,
//         courseStartDate: "2022-09-06",
//         courseEndDate: "2022-12-16",
//         courseFees: "457.49",
//         courseDescription:
//           "In this course you will learn about the basics of computer maintenance.",
//       },
//       {
//         courseCode: "IS111",
//         courseName: "Information Security",
//         courseTerm: 1,
//         courseStartDate: "2022-09-06",
//         courseEndDate: "2022-12-16",
//         courseFees: "647.77",
//         courseDescription:
//           "In this course you will learn about the basics of Information Security.",
//       },
//       {
//         courseCode: "NET222",
//         courseName: "Networking",
//         courseTerm: 2,
//         courseStartDate: "2023-01-09",
//         courseEndDate: "2023-04-21",
//         courseFees: "533.66",
//         courseDescription:
//           "In this course you will be introduced to the basics of networking and how to setup a home network.",
//       },
//       {
//         courseCode: "WEB222",
//         courseName: "Web Technology",
//         courseTerm: 2,
//         courseStartDate: "2023-01-09",
//         courseEndDate: "2023-04-21",
//         courseFees: "874.95",
//         courseDescription:
//           "In this course you will learn about the basics of web design and programming.",
//       },
//       {
//         courseCode: "PM222",
//         courseName: "Project Management",
//         courseTerm: 2,
//         courseStartDate: "2023-01-09",
//         courseEndDate: "2023-04-21",
//         courseFees: "788.87",
//         courseDescription:
//           "In this course you will dive deeper into the many aspects of project management.",
//       },
//       {
//         courseCode: "PM333",
//         courseName: "Intermediate Project Management",
//         courseTerm: 3,
//         courseStartDate: "2023-10-04",
//         courseEndDate: "2023-12-15",
//         courseFees: "877.78",
//         courseDescription:
//           "In this course you will study more specific aspects about project management specifically pertaining to software development.",
//       },
//       {
//         courseCode: "PF333",
//         courseName: "Advanced C++ Programming Fundamentals",
//         courseTerm: 3,
//         courseStartDate: "2023-10-04",
//         courseEndDate: "2023-12-15",
//         courseFees: "966.96",
//         courseDescription:
//           "In this course you will learn more advanced and in-depth features within the C++ programming language.",
//       },
//       {
//         courseCode: "CM333",
//         courseName: "Advanced Computer Maintenance",
//         courseTerm: 3,
//         courseStartDate: "2023-10-04",
//         courseEndDate: "2023-12-15",
//         courseFees: "579.89",
//         courseDescription:
//           "This course will go into more specific elements about computer maintenance.",
//       },
//       {
//         courseCode: "IS333",
//         courseName: "Advanced Information Security",
//         courseTerm: 3,
//         courseStartDate: "2023-10-04",
//         courseEndDate: "2023-12-15",
//         courseFees: "745.54",
//         courseDescription:
//           "In this course you will go into more specific detail pertaining to aspects of information security.",
//       },
//       {
//         courseCode: "NET444",
//         courseName: "Advanced Networking",
//         courseTerm: 4,
//         courseStartDate: "2024-01-08",
//         courseEndDate: "2024-04-19",
//         courseFees: "713.67",
//         courseDescription:
//           "In this course you will learn more advanced networking techniques and learn how to set up a mid-sized office network.",
//       },
//       {
//         courseCode: "WEB444",
//         courseName: "Advanced Web Technology",
//         courseTerm: 4,
//         courseStartDate: "2024-01-08",
//         courseEndDate: "2024-04-19",
//         courseFees: "634.50",
//         courseDescription:
//           "In this course you will learn how to create websites using react as well as back-end logic and setting up a server.",
//       },
//       {
//         courseCode: "PR444",
//         courseName: "Advanced Project Management",
//         courseTerm: 4,
//         courseStartDate: "2024-01-08",
//         courseEndDate: "2024-04-19",
//         courseFees: "533.24",
//         courseDescription:
//           "In this course you will learn advanced techniques about project management as well as create your own project idea.",
//       },
//     ],
//     Students: [],
//     Questions: [],
//   };
//   let data = JSON.stringify(objData, null, 2);
//   fs.writeFile("database/data.json", data, complete);
//   function complete() {
//     console.log("File has been successfully created");
//   }
// }

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

  let verified = true;
  let msg = 'Something went wrong.';

  if (
    !req.body.courseCode ||
    !req.body.courseName ||
    !req.body.courseTerm ||
    !req.body.courseStartDate ||
    !req.body.courseEndDate ||
    !req.body.courseFees ||
    !req.body.courseDescription
  ) {
    verified = false;
    msg = 'Missing information, please fill out all fields.';
  }

  if (req.body.courseCode.length > 6) {
    verified = false;
    msg =
      '"Course Code" has to be at least 1 and no more than 6 characters long.';
  }

  if (req.body.courseName.length > 50) {
    verified = false;
    msg =
      '"Course Name" has to be at least 1 and no more than 50 characters long.';
  }

  if (req.body.courseTerm < 1 || req.body.courseTerm > 4) {
    verified = false;
    msg = '"Course Term" has to be a number between 1 to 4.';
  }

  if (req.body.courseStartDate.match(/^\d{4}-\d{2}-\d{2}$/) === null) {
    verified = false;
    msg = '"Course Start Date" has to be in the proper format yyyy-mm-dd.';
  }

  if (
    req.body.courseEndDate.match(/^\d{4}-\d{2}-\d{2}$/) === null ||
    req.body.courseEndDate < req.body.courseStartDate
  ) {
    verified = false;
    msg =
      '"Course End Date" has to be in the proper format yyyy-mm-dd and has to be after the Course Start Date.';
  }

  if (req.body.courseFees > 1000000) {
    verified = false;
    msg = '"Course Fee" cannot be more than 1000000.';
  }

  if (req.body.courseDescription.length > 300) {
    verified = false;
    msg = '"Course Description" has a maximum length of 300 characters.';
  }

  if (verified) {
    courseData.courses.push(newCourse);
    res.send(newCourse);

    let data = JSON.stringify(courseData, null, 2);
    fs.writeFile('database/courseData.json', data, completed);
    function completed() {
      console.log('New course has been added to database/courseData.json');
    }
  } else {
    res.send(msg);
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

app.get('/', (req, res) => {
  res.send('BVC Course Registration Backend');
});

/***** COLIN *****/
// For getting student info
app.get('/studentlist', (req, res) => {
  res.send(objData.Students); // WILL NEED TO BE UPDATED BASED ON PEDRO'S WORK
});

// For adding students
app.post('/newstudent', (req, res) => {
  // WILL NEED TO BE UPDATED BASED ON PEDRO'S WORK
  const newStudentID = GenerateNewStudentID();

  let verified = true;
  let msg = 'Something went wrong.';

  if (
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.email ||
    !req.body.phone ||
    !req.body.dateOfBirth ||
    !req.body.department ||
    !req.body.program ||
    !req.body.username ||
    !req.body.password
  ) {
    verified = false;
    msg = 'Missing information, please fill out all fields.';
  }

  if (
    objData.Students.some(
      student => student.email.toLowerCase() === req.body.email.toLowerCase()
    )
  ) {
    verified = false;
    msg = 'Email is already in use.';
  }

  if (
    req.body.email.match(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    ) === null
  ) {
    verified = false;
    msg = 'Please submit a proper email address.';
  }

  if (
    req.body.phone.match(/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/) === null
  ) {
    verified = false;
    msg = 'Please enter a phone number with the following format: 123-456-7890';
  }

  let dateOfBirth = new Date(req.body.dateOfBirth).getTime();

  if (
    req.body.dateOfBirth.match(/^\d{4}-\d{2}-\d{2}$/) === null ||
    typeof dateOfBirth !== 'number' ||
    Number.isNaN(dateOfBirth) ||
    dateOfBirth > new Date().getTime()
  ) {
    verified = false;
    msg = 'Please enter an appropriate date in the format: yyyy-mm-dd';
  }

  if (req.body.department !== 'IT' && req.body.department !== 'Other') {
    verified = false;
    msg = 'Please enter one of the following: IT, Other';
  }

  if (
    req.body.program !== 'Diploma (2 Years)' &&
    req.body.program !== 'Post-Diploma (1 Year)' &&
    req.body.program !== 'Certificate (3 Months)' &&
    req.body.program !== 'Certificate (6 Months)' &&
    req.body.program !== 'Upgrade' &&
    req.body.program !== 'Other'
  ) {
    verified = false;
    msg =
      'Please enter one of the following: Diploma (2 Years), Post-Diploma (1 Year), Certificate (3 Months), Certificate (6 Months), Upgrade, Other';
  }

  if (
    objData.Students.some(
      student =>
        student.username.toLowerCase() === req.body.username.toLowerCase()
    )
  ) {
    verified = false;
    msg = 'Username is already in use.';
  }

  if (!verified) {
    res.send(msg);
  }

  if (verified) {
    const newStudent = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      dateOfBirth: req.body.dateOfBirth,
      department: req.body.department,
      program: req.body.program,
      studentID: newStudentID,
      username: req.body.username,
      password: req.body.password,
      registeredCourses: [],
    };

    objData.Students.push(newStudent);
    let data = JSON.stringify(objData, null, 2);
    fs.writeFile('database/data.json', data, complete);
    function complete() {
      console.log('New Student Added:\n' + newStudent);
    }

    res.send({ success: true, code: 200 });
  }

  function GenerateNewStudentID() {
    let tempID;
    let isUnique = false;

    //This loop runs and keeps generating ids until a unique id is generated.
    while (!isUnique) {
      tempID = Math.floor(Math.random() * 999999); //Generate random number between 000000 - 999999

      isUnique = true; // Set it to true to exit loop
      if (objData.Students.find(student => student.studentID === tempID)) {
        isUnique = false; // If found set back to false to run the loop again
      }
    }

    console.log('Succesfully generated a new unique id: ' + tempID);
    return tempID;
  }
});
/***** END OF COLIN *****/

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
