import React, { useEffect, useState } from "react";
import "./courses.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CoursesCard = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  // Function to fetch courses from the API
  const fetchCourses = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: `http://localhost:4000/getCourses`, // Adjust endpoint if necessary
        headers: {
          // 'Authorization': 'Bearer YOUR_ACCESS_TOKEN', // Replace with actual token
        },
      });
      setCourses(response.data); // Adjust based on the API response structure
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <section className='coursesCard'>
      <div className='container grid2'>
        {courses.map((course, index) => (
          <div key={index} className='items'>
            <div className='content flex'>
              <div className='left'>
                <div className='img'>
                  <img src={course.cover} alt='Course cover' />
                </div>
              </div>
              <div className='text'>
                <h1>{course.courseName}</h1>
                <div className='rate'>
                  <i className='fa fa-star'></i>
                  <i className='fa fa-star'></i>
                  <i className='fa fa-star'></i>
                  <i className='fa fa-star'></i>
                  <i className='fa fa-star'></i>
                  <label htmlFor=''> (5.0) </label>
                </div>
                <div className='details'>
                  {course.courseTeacher.map((teacher, index) => (
                    <div key={index} className='box'>
                      <div className='dimg'>
                        <img src={teacher.dcover} alt='Teacher cover' />
                      </div>
                      <div className='para'>
                        <h4>{teacher.name}</h4>
                      </div>
                      <span>{teacher.totalTime}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className='price'>
              <h3>{course.priceAll} / {course.pricePer}</h3>
            </div>
            <button onClick={() => navigate('/register_login')} className='outline-btn'>
              ENROLL NOW!
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CoursesCard;
