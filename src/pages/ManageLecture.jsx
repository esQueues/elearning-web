import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ManageLecture = () => {
    const { id } = useParams(); // Module ID
    const navigate = useNavigate();
    const [lectures, setLectures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newLecture, setNewLecture] = useState({ title: "", content: "" });

    useEffect(() => {
        axios.get(`http://localhost:8080/api/modules/${id}/lectures`, { withCredentials: true })
            .then((response) => setLectures(response.data))
            .catch((error) => console.error("Error fetching lectures:", error))
            .finally(() => setLoading(false));
    }, [id]);

    const handleCreateLecture = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/api/modules/${id}/lectures`, newLecture, { withCredentials: true });
            setLectures([...lectures, response.data]);
            setNewLecture({ title: "", content: "" }); // Clear form
        } catch (error) {
            console.error("Error creating lecture:", error);
        }
    };

    const handleDeleteLecture = async (lectureId) => {
        try {
            await axios.delete(`http://localhost:8080/api/lectures/${lectureId}`, { withCredentials: true });
            setLectures(lectures.filter((lecture) => lecture.id !== lectureId));
        } catch (error) {
            console.error("Error deleting lecture:", error);
        }
    };

    if (loading) return <p className="text-center mt-4 fs-4 fw-semibold">Loading...</p>;

    return (
        <div className="container mt-4">
            <h2>Manage Lectures</h2>

            {/* Lecture Form */}
            <div className="mb-4">
                <h4>Add New Lecture</h4>
                <input type="text" className="form-control mb-2" placeholder="Lecture Title" value={newLecture.title} onChange={(e) => setNewLecture({ ...newLecture, title: e.target.value })} required />
                <textarea className="form-control mb-2" rows="4" placeholder="Lecture Content" value={newLecture.content} onChange={(e) => setNewLecture({ ...newLecture, content: e.target.value })} required></textarea>
                <button className="btn btn-primary" onClick={handleCreateLecture}>Add Lecture</button>
            </div>

            {/* Lecture List */}
            {lectures.length === 0 ? (
                <p className="text-muted">No lectures available.</p>
            ) : (
                <ul className="list-group">
                    {lectures.map((lecture) => (
                        <li key={lecture.id} className="list-group-item d-flex justify-content-between align-items-center">
                            <span>{lecture.title}</span>
                            <div>
                                <button className="btn btn-danger btn-sm" onClick={() => handleDeleteLecture(lecture.id)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            <div className="text-center mt-4">
                <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>Back</button>
            </div>
        </div>
    );
};

export default ManageLecture;
