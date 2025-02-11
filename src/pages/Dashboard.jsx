import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
    const [student, setStudent] = useState(null);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch student profile
        axios.get("http://localhost:8080/api/student/profile", { withCredentials: true })
            .then((response) => {
                setStudent(response.data);
            })
            .catch((error) => {
                console.error("Error fetching student profile:", error);
            });

        // Fetch enrolled courses
        axios.get("http://localhost:8080/api/courses/my-courses", { withCredentials: true })
            .then((response) => {
                setCourses(response.data);
            })
            .catch((error) => {
                console.error("Error fetching courses:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) return <p className="text-center fs-4 fw-semibold mt-4">Loading...</p>;

    return (
        <div>
            {/*/!* ✅ Navbar with Profile *!/*/}
            {/*<nav className="navbar navbar-light bg-light shadow-sm p-3">*/}
            {/*    <div className="container">*/}
            {/*        <Link to="/dashboard" className="navbar-brand fw-bold fs-4">*/}
            {/*            My Learning*/}
            {/*        </Link>*/}
            {/*        {student && (*/}
            {/*            <div className="d-flex align-items-center">*/}
            {/*                <span className="me-2 fw-semibold">{student.firstname}</span>*/}
            {/*                <Link to="/student/profile">*/}
            {/*                    <img*/}
            {/*                        src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"*/}
            {/*                        alt="Profile"*/}
            {/*                        className="rounded-circle border"*/}
            {/*                        width="40"*/}
            {/*                        height="40"*/}
            {/*                    />*/}
            {/*                </Link>*/}
            {/*            </div>*/}
            {/*        )}*/}
            {/*    </div>*/}
            {/*</nav>*/}

            <div className="container mt-4">
                <h1 className="text-center mb-4 fw-bold">My Courses</h1>

                {courses.length === 0 ? (
                    <div className="text-center">
                        <p className="text-muted">You haven't enrolled in any courses yet.</p>
                        <Link to="/courses" className="btn btn-primary">Browse Courses</Link>
                    </div>
                ) : (
                    <div className={`row ${courses.length === 1 ? "justify-content-center" : ""}`}>
                        {courses.map((course) => (
                            <div key={course.id} className={`col-lg-3 col-md-4 col-sm-6 mb-4 ${courses.length === 1 ? "text-center" : ""}`}>
                                <Link to={`/courses/${course.id}`} className="text-decoration-none">
                                    <div className="card h-100 shadow-sm border-0">
                                        <div className="card-body text-center">
                                            <h5 className="card-title text-dark">{course.title}</h5>
                                            <p className="card-text text-muted">Click to view details</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
