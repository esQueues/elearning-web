import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const CourseList = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("http://localhost:8080/api/courses")
            .then((response) => {
                console.log("Fetched courses:", response.data);
                if (Array.isArray(response.data)) {
                    setCourses(response.data);
                } else {
                    console.error("Invalid data format:", response.data);
                    setCourses([]);
                }
            })
            .catch((error) => {
                console.error("Error fetching courses:", error);
                setCourses([]);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <div className="text-center fs-4 fw-semibold mt-4">Loading...</div>;
    }

    const overlayStyle = {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        overflow: 'hidden',
        width: '100%',
        height: '100%',
        transition: '.5s ease',
        opacity: 0,
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4 fw-bold">All Courses</h1>

            {courses.length === 0 ? (
                <div className="text-center">
                    <p className="text-muted">No courses available at the moment.</p>
                </div>
            ) : (
                <div className="row g-4 justify-content-center">
                    {courses.map((course) => (
                        <div key={course.id} className="col-lg-4 col-md-6 col-sm-12">
                            <Link to={`/courses/${course.id}`} className="text-decoration-none">
                                <div className="card h-100 shadow-sm border-0">
                                    <div className="position-relative">
                                        {/* Course Image */}
                                        <img
                                            src={course.imageUrl || "https://sea-ac-ae.s3.me-south-1.amazonaws.com/wp-content/uploads/2024/06/19142849/Cover%402x.png"}
                                            alt="Course Banner"
                                            className="card-img-top"
                                            style={{ height: "200px", objectFit: "cover" }}
                                        />
                                        <div
                                            className="overlay d-flex align-items-center justify-content-center"
                                            style={overlayStyle}
                                            onMouseOver={(e) => e.currentTarget.style.opacity = 1}
                                            onMouseOut={(e) => e.currentTarget.style.opacity = 0}
                                        >
                                            <h5 className="text-light fw-bold">{course.title}</h5>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title text-dark fw-bold">{course.title}</h5>
                                        <p className="card-text text-muted mb-2">
                                            <i className="fas fa-user"></i> Teacher: {course.teacher?.firstname ?? "Unknown"} {course.teacher?.lastname ?? ""}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CourseList;