import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
    const [student, setStudent] = useState(null);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("http://localhost:8080/api/student/profile", { withCredentials: true })
            .then((response) => setStudent(response.data))
            .catch((error) => console.error("Error fetching student profile:", error));

        axios.get("http://localhost:8080/api/courses/my-courses", { withCredentials: true })
            .then((response) => {
                console.log("Courses response:", response.data);
                setCourses(response.data);
            })
            .catch((error) => console.error("Error fetching courses:", error))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p className="text-center fs-4 fw-semibold mt-4">Loading...</p>;

    return (
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
                        <div key={course.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                            <Link to={`/courses/${course.id}`} className="text-decoration-none">
                                <div className="card h-100 shadow-sm border-0">
                                    <div className="card-body text-center">
                                        <h5 className="card-title text-dark">{course.title}</h5>
                                        <p className="card-text text-muted">
                                            Teacher: {course.teacher?.firstname ?? "Unknown"} {course.teacher?.lastname ?? ""}
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

export default Dashboard;