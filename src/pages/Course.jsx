import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const Course = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/courses/${id}`, { withCredentials: true })
            .then((response) => {
                setCourse(response.data);
            })
            .catch((error) => {
                console.error("Error fetching course details:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p className="text-center mt-4 fs-4 fw-semibold">Loading...</p>;
    if (!course) return <p className="text-center text-danger fs-5">Course not found.</p>;

    return (
        <div className="container mt-5">
            {/* Course Title & Description */}
            <div className="card shadow-sm mb-4">
                <div className="card-body">
                    <h1 className="card-title fw-bold">{course.title}</h1>
                    <p className="card-text text-muted">{course.description}</p>
                </div>
            </div>

            {/* Modules Section */}
            {course.modules.length === 0 ? (
                <p className="text-center text-muted">No modules available.</p>
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
                                    {/* Lectures */}
                                    {module.lectures.length > 0 && (
                                        <div className="mb-3">
                                            <h5 className="fw-bold">📖 Lectures</h5>
                                            <ul className="list-group">
                                                {module.lectures.map((lecture) => (
                                                    <li key={lecture.id} className="list-group-item">
                                                        <Link to={`/lectures/${lecture.id}`} className="text-decoration-none">
                                                            {lecture.title}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Quizzes */}
                                    {module.quizzes.length > 0 && (
                                        <div>
                                            <h5 className="fw-bold">📝 Quizzes</h5>
                                            <ul className="list-group">
                                                {module.quizzes.map((quiz) => (
                                                    <li key={quiz.id} className="list-group-item d-flex justify-content-between align-items-center">
                                                        {quiz.title}
                                                        <Link to={`/quiz/${quiz.id}/profile`} className="btn btn-primary btn-sm">
                                                        Take Quiz
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* No Lectures & Quizzes */}
                                    {module.lectures.length === 0 && module.quizzes.length === 0 && (
                                        <p className="text-muted">No lectures or quizzes available.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Course;
