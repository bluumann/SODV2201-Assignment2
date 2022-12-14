import React from 'react';
import { Link } from 'react-router-dom';

import Login from '../components/Login';

const Landing = (props) => {
  return (
    <div className='wrapper'>
      <div className="info">
        <h1>Course Registration</h1> <br />
        <p>
          Welcome to the Bow Valley College Course Registration page. Our online
          self-registration gives you the ability to build your own schedule to
          fit your busy life. We offer a wide variety of courses to help you
          achieve your academic goals. <br /> <br /> To find a list of required
          courses for your program, learn more about which programs register
          online, or find other information,{' '}
          <a
            href="https://bowvalleycollege.ca/student-resources/academic-services/online-course-registration"
            target="blank"
          >
            see here
          </a>
          . Or feel free to <Link to="/student/form">contact us</Link>.{' '}
        </p>{' '}
        <br />
        <Link to="/student/search">View Courses</Link>
      </div>
      <Login students={props.students} admins={props.admins} updateUser={props.updateUser} />
    </div>
  );
};

export default Landing;
