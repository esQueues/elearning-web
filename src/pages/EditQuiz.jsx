import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditQuiz = () => {
    const { quizId } = useParams();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState({ title: "", questions: [] });

    useEffect(() => {
        axios.get(`http://localhost:8080/api/quizzes/${quizId}`, { withCredentials: true })
            .then(response => setQuiz(response.data))
            .catch(error => console.error("Error fetching quiz:", error));
    }, [quizId]);

    const handleChange = (e) => {
        setQuiz({ ...quiz, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8080/api/quizzes/${quizId}`, quiz, { withCredentials: true })
            .then(() => navigate(-1)) // Navigate back after updating
            .catch(error => console.error("Error updating quiz:", error));
    };

    return (
        <div className="container mt-4">
            <h2>Edit Quiz</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input type="text" className="form-control" name="title" value={quiz.title} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Save Changes</button>
                <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate(-1)}>Cancel</button>
            </form>
        </div>
    );
};

export default EditQuiz;
