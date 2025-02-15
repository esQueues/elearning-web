import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const AddModule = () => {
    const { id } = useParams(); // Course ID
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim()) {
            setError("Module title cannot be empty.");
            return;
        }

        try {
            await axios.post(
                `http://localhost:8080/api/courses/${id}/modules`,
                { title }, // Send only the title
                { withCredentials: true }
            );
            navigate(`/courses/${id}/manage`);
        } catch (err) {
            setError("Error adding module. Please try again.");
            console.error("Error adding module:", err);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="fw-bold">Add Module</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Module Title</label>
                    <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                {error && <p className="text-danger">{error}</p>}

                <button type="submit" className="btn btn-primary">Add Module</button>
                <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate(`/courses/${id}/manage`)}>Cancel</button>
            </form>
        </div>
    );
};

export default AddModule;
