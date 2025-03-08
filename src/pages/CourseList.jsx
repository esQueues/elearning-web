import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const CourseList = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 1000); // Delay of 500ms

        return () => clearTimeout(delayDebounce); // Cleanup function to clear timeout
    }, [searchQuery]);

    useEffect(() => {
        fetchCourses(debouncedQuery);
    }, [debouncedQuery]); // Fetch data only when debouncedQuery updates

    const fetchCourses = (query) => {
        setLoading(true);
        axios
            .get(`/api/courses/get?query=${query}`, { withCredentials: true })
            .then((response) => {
                setCourses(Array.isArray(response.data) ? response.data : []);
            })
            .catch((error) => {
                console.error("Error fetching courses:", error);
                setCourses([]);
            })
            .finally(() => setLoading(false));
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    if (loading) {
        return <div className="text-center fs-4 fw-semibold mt-4">Loading...</div>;
    }

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4 fw-bold text-primary">📚 Explore Courses</h1>

            {/* Search Bar */}
            <div className="d-flex justify-content-center mb-4">
                <div className="input-group w-50 shadow-lg rounded">
                    <input
                        type="text"
                        className="form-control border-0"
                        placeholder="Search courses..."
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                    <button className="btn btn-primary fw-bold" onClick={() => fetchCourses(searchQuery)}>
                        🔍 Search
                    </button>
                </div>
            </div>

            {courses.length === 0 ? (
                <div className="text-center">
                    <p className="text-muted">No courses available at the moment.</p>
                </div>
            ) : (
                <div className="row g-4 justify-content-center">
                    {courses.map((course) => (
                        <div key={course.id} className="col-lg-4 col-md-6 col-sm-12">
                            <Link to={`/courses/${course.id}`} className="text-decoration-none">
                                <div
                                    className="card h-100 shadow-sm border-0"
                                    style={{ position: "relative", overflow: "hidden" }}
                                >
                                    <div
                                        style={{ position: "relative" }}
                                        onMouseOver={(e) => (e.currentTarget.querySelector(".overlay").style.opacity = 1)}
                                        onMouseOut={(e) => (e.currentTarget.querySelector(".overlay").style.opacity = 0)}
                                    >
                                        <img
                                            src={
                                                course.imageUrl ||
                                                "https://sea-ac-ae.s3.me-south-1.amazonaws.com/wp-content/uploads/2024/06/19142849/Cover%402x.png"
                                            }
                                            alt="Course Banner"
                                            className="card-img-top"
                                            style={{ height: "200px", objectFit: "cover" }}
                                        />
                                        <div
                                            className="overlay d-flex align-items-center justify-content-center"
                                            style={{
                                                position: "absolute",
                                                bottom: 0,
                                                left: 0,
                                                right: 0,
                                                backgroundColor: "rgba(0, 0, 0, 0.5)",
                                                width: "100%",
                                                height: "100%",
                                                transition: "opacity 0.5s ease",
                                                opacity: 0,
                                            }}
                                        >
                                            <h5 className="text-light fw-bold">{course.title}</h5>
                                        </div>
                                    </div>

                                    <div className="card-body text-center">
                                        <h5 className="card-title text-dark fw-bold">{course.title}</h5>
                                        <p className="card-text text-muted mb-2">
                                            <i className="fas fa-user"></i> Teacher: {course.teacher?.firstname ?? "Unknown"}{" "}
                                            {course.teacher?.lastname ?? ""}
                                        </p>
                                        <button className="btn btn-outline-primary fw-bold">View Course</button>
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
