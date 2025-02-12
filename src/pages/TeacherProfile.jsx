import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const TeacherProfile = () => {
    const { teacherId } = useParams();  // ✅ Fixed useParams
    const [teacher, setTeacher] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/teachers/${teacherId}`, { withCredentials: true })  // ✅ Fixed API URL
            .then((response) => {
                setTeacher(response.data);
            })
            .catch((error) => {
                console.error("Error fetching teacher profile:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [teacherId]);  // ✅ Use teacherId instead of id

    if (loading) return <p className="text-center mt-4 fs-4 fw-semibold">Loading...</p>;
    if (!teacher) return <p className="text-center text-danger fs-5">Teacher not found.</p>;

    return (
        <div className="container mt-5">
            <div className="card shadow-sm mb-4">
                <div className="card-body">
                    <h1 className="card-title fw-bold">{teacher.firstname} {teacher.lastname}</h1>
                    <p className="text-muted">{teacher.email}</p>
                    <p>{teacher.bio}</p>
                </div>
            </div>

            <h3 className="fw-bold">📚 Created Courses</h3>
            {teacher.createdCourses.length === 0 ? (
                <p className="text-muted">No courses available.</p>
            ) : (
                <ul className="list-group">
                    {teacher.createdCourses.map((course) => (
                        <li key={course.id} className="list-group-item">
                            <Link to={`/courses/${course.id}`} className="text-decoration-none">
                                {course.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TeacherProfile;
