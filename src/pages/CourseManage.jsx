import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const CourseManage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/courses/${id}`, { withCredentials: true })
            .then((response) => setCourse(response.data))
            .catch((error) => console.error("Error fetching course:", error))
            .finally(() => setLoading(false));
    }, [id]);

    const handleDeleteCourse = () => {
        axios
            .delete(`http://localhost:8080/api/courses/${id}`, { withCredentials: true })
            .then(() => navigate("/teacher-dashboard"))
            .catch((error) => console.error("Error deleting course:", error));
    };

    if (loading) return <p className="text-center mt-4 fs-4 fw-semibold">Loading...</p>;
    if (!course) return <p className="text-center text-danger fs-5">Course not found.</p>;

    return (
        <div className="container mt-5">
            <h1 className="fw-bold">Manage Course: {course.title}</h1>
            <p className="text-muted">{course.description}</p>

            {/* Add/Delete Buttons */}
            <div className="mb-4">
                <Link to={`/courses/${id}/add-module`} className="btn btn-primary me-2">Add Module</Link>
                <button className="btn btn-danger" onClick={handleDeleteCourse}>Delete Course</button>
            </div>

            {/* Modules List */}
            {course.modules.length === 0 ? (
                <p className="text-muted">No modules available.</p>
            ) : (
                <div className="accordion" id="courseAccordion">
                    {course.modules.map((module, index) => (
                        <div className="accordion-item" key={module.id}>
                            <h2 className="accordion-header" id={`heading${index}`}>
                                <button
                                    className="accordion-button collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target={`#collapse${index}`}
                                    aria-expanded="false"
                                    aria-controls={`collapse${index}`}
                                >
                                    {module.title}
                                </button>
                            </h2>
                            <div
                                id={`collapse${index}`}
                                className="accordion-collapse collapse"
                                aria-labelledby={`heading${index}`}
                                data-bs-parent="#courseAccordion"
                            >
                                <div className="accordion-body">
                                    <Link to={`/modules/${module.id}/add-lecture`} className="btn btn-success btn-sm me-2">Add Lecture</Link>
                                    <Link to={`/modules/${module.id}/add-quiz`} className="btn btn-warning btn-sm">Add Quiz</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="text-center mt-5">
                <Link to={`/courses/${id}`} className="btn btn-outline-primary">Back to Course</Link>
            </div>
        </div>
    );
};

export default CourseManage;
