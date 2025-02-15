import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const AddLecture = () => {
    const { id } = useParams(); // moduleId from URL
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        axios.post(`http://localhost:8080/api/courses/modules/${id}/lectures`, { title, url }, { withCredentials: true })
            .then((response) => {
                const courseId = response.data.courseId; // Now using courseId from API response
                navigate(`/courses/${courseId}/manage`); // Redirect to CourseManage
            })
            .catch((error) => console.error("Error adding lecture:", error));
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Add Lecture</h1>
            {error && <p className="text-danger text-center">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Lecture Title</label>
                    <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter lecture title"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Lecture URL</label>
                    <input
                        type="url"
                        className="form-control"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Enter lecture URL"
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Adding..." : "Add Lecture"}
                </button>
            </form>
        </div>
    );
};

export default AddLecture;
