import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const TeacherProfile = () => {
    const { teacherId } = useParams();
    const [teacher, setTeacher] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/teachers/${teacherId}`, { withCredentials: true })
            .then((response) => setTeacher(response.data))
            .catch((error) => console.error("Error fetching teacher profile:", error))
            .finally(() => setLoading(false));
    }, [teacherId]);

    if (loading) return <p className="text-center mt-4 fs-4 fw-semibold">Loading...</p>;
    if (!teacher) return <p className="text-center text-danger fs-5">Teacher not found.</p>;

    const chunkArray = (arr, size) => {
        return arr.length > 0 ? arr.reduce((acc, _, i) => (i % size ? acc : [...acc, arr.slice(i, i + size)]), []) : [];
    };

    const courseChunks = chunkArray(teacher.createdCourses, 3);

    return (
        <div className="container py-5" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
            <div className="card shadow-lg mb-4 p-4" style={{ borderRadius: "12px" }}>
                <div className="card-body d-flex align-items-center">
                    <img
                        src="https://img.freepik.com/premium-vector/girl-holding-pencil-picture-girl-holding-book_1013341-447639.jpg?semt=ais_hybrid"
                        alt="Teacher"
                        className="rounded-circle border p-2"
                        width="120"
                        height="120"
                    />
                    <div className="ms-4">
                        <h1 className="card-title fw-bold text-primary">{teacher.firstname} {teacher.lastname}</h1>
                        <p className="text-muted fs-5">{teacher.email}</p>
                        <div className="p-3 bg-light border rounded" style={{ maxWidth: "600px" }}>
                            <h5 className="fw-bold mb-2 text-secondary">About</h5>
                            <p className="fs-5 text-dark">{teacher.bio}</p>
                        </div>
                    </div>
                </div>
            </div>

            <h3 className="fw-bold text-dark">📚 Created Courses</h3>
            {teacher.createdCourses.length === 0 ? (
                <p className="text-muted">No courses available.</p>
            ) : (
                <div className="position-relative mt-3">
                    <div id="courseCarousel" className="carousel slide mx-auto" data-bs-ride="carousel" style={{ maxWidth: "85%" }}>
                        <div className="carousel-inner">
                            {courseChunks.map((chunk, index) => (
                                <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                                    <div className="row justify-content-center">
                                        {chunk.map((course) => (
                                            <div key={course.id} className="col-md-4 d-flex justify-content-center">
                                                <div className="card shadow-sm border-0" style={{ width: "18rem", borderRadius: "10px" }}>
                                                    <img
                                                        src={course.imageUrl || "https://allea.org/wp-content/uploads/2019/06/shutterstock_520698799small.jpg"}
                                                        className="card-img-top rounded-top"
                                                        alt={course.title}
                                                        style={{ height: "180px", objectFit: "cover" }}
                                                    />
                                                    <div className="card-body text-center bg-white" style={{ borderRadius: "10px" }}>
                                                        <h5 className="card-title text-primary">
                                                            <Link to={`/courses/${course.id}`} className="text-decoration-none">
                                                                {course.title}
                                                            </Link>
                                                        </h5>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button className="carousel-control-prev" type="button" data-bs-target="#courseCarousel" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon bg-dark rounded-circle p-3" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#courseCarousel" data-bs-slide="next">
                        <span className="carousel-control-next-icon bg-dark rounded-circle p-3" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default TeacherProfile;
