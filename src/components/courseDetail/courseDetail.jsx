import React, { useEffect, useState } from 'react';
import './CourseDetail.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CourseDetail = () => {
  const [courseDetail, setCourseDetail] = useState(null); // Use null initially
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams(); // Get course ID from URL parameters

  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/getCourseById/${id}`);
        console.log('Course detail response:', response.data);
        console.log(response.data.data)
        setCourseDetail(response);
      } catch (error) {
        console.error('Error fetching course details:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetail();
  }, [id]); // Run effect when ID changes

  if (loading) {
    return <div>Loading...</div>; // Display loading message
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error message
  }

  if (!courseDetail) {
    return <div>No course details available.</div>; // Handle case where no course data is found
  }

  return (
    <section className='courseDetail'>
      <div className='container'>
        <div className='courseHeader'>
          <div className='courseCover'>
            <img src={courseDetail.cover} alt={courseDetail.courseName} />
          </div>
          <div className='courseInfo'>
            <h1>{courseDetail.courseName}</h1>
            <div className='courseRating'>
              <i className='fa fa-star'></i>
              <i className='fa fa-star'></i>
              <i className='fa fa-star'></i>
              <i className='fa fa-star'></i>
              <i className='fa fa-star'></i>
              <label htmlFor=''> (5.0) </label>
            </div>
            <div className='coursePrice'>
              <h3>{courseDetail.priceAll} / {courseDetail.pricePer}</h3> {/* Fixed to display pricePer */}
            </div>
          </div>
        </div>
        <div className='courseDetails'>
          <h2>Course Details</h2>
          <p>{courseDetail.description}</p>
        </div>
        <div className='courseTeachers'>
          <h2>Teachers</h2>
          {courseDetail.courseTeacher.map((teacher, index) => (
            <div key={index} className='teacher'>
              <div className='teacherImg'>
                <img src={teacher.dcover} alt={teacher.name} />
              </div>
              <div className='teacherInfo'>
                <h4>{teacher.name}</h4>
                <span>{teacher.totalTime}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseDetail;
