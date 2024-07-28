import React, { useEffect, useState } from "react";
import "./courses.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';

const CoursesCard = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [userId, setUserId] = useState(null);

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
    const storeUserId = localStorage.getItem('userId');
    console.log('storeUserId:', storeUserId)
    if (storeUserId) {
      setUserId(storeUserId);
    }
    fetchCourses();
  }, [fetchCourses]); // Added fetchCourses to dependency array

  const handleEnroll = async (courseId) => {
    if (!userId) {
      toast.error('User not logged in.');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:4000/enrollInCourse', {
        userId,
        courseId
      });
  
      console.log('Enrollment response:', response.data); // Log the response data
  
      if (response.data.status) {
        setTimeout(() => {
          toast.success('Successfully enrolled in the course!');
          alert('Successfully enrolled in the course!');
        }, 3000);
      } else {
        toast.error(response.data.message || 'Enrollment failed.');
      }
    } catch (error) {
      toast.error('An error occurred while enrolling in the course.');
      console.error('Enrollment error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <section className='coursesCard'>
      <ToastContainer />
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
            <button onClick={() => {
              handleEnroll(course._id);
              navigate(`/courseDetail/${course._id}`, { state: { course } });
            }} className='outline-btn'>
              ENROLL NOW!
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CoursesCard;
