import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const TeacherDashboard = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();

    const fetchCourses = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/teachers/courses", {
                withCredentials: true, // Allows cookies for authentication
            });

            setCourses(response.data); // Ensure correct data assignment
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch courses");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses(); // Initial fetch
    }, [location]);

    return (
        <div style={styles.container}>
            <h2>Your Courses</h2>
            <Link to="/courses/create" className="btn btn-success mb-3">
                + Create Course
            </Link>

            {loading && <p>Loading...</p>}
            {error && <p style={styles.error}>{error}</p>}
            {!loading && !error && courses.length === 0 && <p>No courses found.</p>}
            <ul style={styles.courseList}>
                {courses.map((course) => (
                    <li key={course.id} style={styles.courseItem}>
                        <Link to={`/courses/${course.id}`} style={styles.courseLink}>
                            {course.title}
                        </Link>
                        {" | "}
                        <Link to={`/courses/${course.id}/manage`} style={styles.manageLink}>
                            Manage
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const styles = {
    container: { textAlign: "center", marginTop: "50px" },
    error: { color: "red" },
    courseList: { listStyle: "none", padding: 0 },
    courseItem: { margin: "10px 0" },
    courseLink: { textDecoration: "none", color: "blue", fontWeight: "bold" },
    manageLink: { textDecoration: "none", color: "green" }
};

export default TeacherDashboard;