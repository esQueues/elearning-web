import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ManageQuiz = () => {
    const { id } = useParams(); // Quiz ID
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/quizzes/${id}`, { withCredentials: true })
            .then((response) => setQuiz(response.data))
            .catch((error) => console.error("Error fetching quiz:", error))
            .finally(() => setLoading(false));
    }, [id]);

    const handleChangeQuestion = (index, field, value) => {
        const updatedQuiz = { ...quiz };
        if (field === "text") updatedQuiz.questions[index].text = value;
        else if (field === "correctAnswer") updatedQuiz.questions[index].correctAnswer = parseInt(value);
        else updatedQuiz.questions[index].options[field] = value;
        setQuiz(updatedQuiz);
    };

    const handleSaveChanges = async () => {
        try {
            await axios.put(`http://localhost:8080/api/quizzes/${id}`, quiz, { withCredentials: true });
            navigate(-1); // Go back to previous page
        } catch (error) {
            console.error("Error updating quiz:", error);
        }
    };

    if (loading) return <p className="text-center mt-4 fs-4 fw-semibold">Loading...</p>;
    if (!quiz) return <p className="text-center text-danger fs-5">Quiz not found.</p>;

    return (
        <div className="container mt-4">
            <h2>Manage Quiz: {quiz.title}</h2>

            {quiz.questions.map((q, index) => (
                <div key={index} className="mb-3 border p-3">
                    <label className="form-label">Question {index + 1}</label>
                    <input type="text" className="form-control mb-2" value={q.text} onChange={(e) => handleChangeQuestion(index, "text", e.target.value)} />

                    {q.options.map((option, optIndex) => (
                        <div key={optIndex} className="input-group mb-2">
                            <span className="input-group-text">{optIndex + 1}</span>
                            <input type="text" className="form-control" value={option} onChange={(e) => handleChangeQuestion(index, optIndex, e.target.value)} />
                        </div>
                    ))}

                    <label className="form-label">Correct Answer</label>
                    <select className="form-select" value={q.correctAnswer} onChange={(e) => handleChangeQuestion(index, "correctAnswer", e.target.value)}>
                        {q.options.map((_, optIndex) => (
                            <option key={optIndex} value={optIndex}>{optIndex + 1}</option>
                        ))}
                    </select>
                </div>
            ))}

            <button className="btn btn-success" onClick={handleSaveChanges}>Save Changes</button>
        </div>
    );
};

export default ManageQuiz;
