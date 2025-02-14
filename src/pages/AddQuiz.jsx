import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const AddQuiz = () => {
    const { id } = useParams(); // Module ID
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [questions, setQuestions] = useState([{ text: "", options: ["", "", "", ""], correctAnswer: 0 }]);

    const handleAddQuestion = () => {
        setQuestions([...questions, { text: "", options: ["", "", "", ""], correctAnswer: 0 }]);
    };

    const handleChangeQuestion = (index, field, value) => {
        const newQuestions = [...questions];
        if (field === "text") newQuestions[index].text = value;
        else if (field === "correctAnswer") newQuestions[index].correctAnswer = parseInt(value);
        else newQuestions[index].options[field] = value;
        setQuestions(newQuestions);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:8080/api/modules/${id}/quizzes`, { title, questions }, { withCredentials: true });
            navigate(`/modules/${id}/manage-quiz`);
        } catch (error) {
            console.error("Error creating quiz:", error);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Create Quiz</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Quiz Title</label>
                    <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>

                <h4>Questions</h4>
                {questions.map((q, index) => (
                    <div key={index} className="mb-3 border p-3">
                        <label className="form-label">Question {index + 1}</label>
                        <input type="text" className="form-control mb-2" value={q.text} onChange={(e) => handleChangeQuestion(index, "text", e.target.value)} required />

                        {q.options.map((option, optIndex) => (
                            <div key={optIndex} className="input-group mb-2">
                                <span className="input-group-text">{optIndex + 1}</span>
                                <input type="text" className="form-control" value={option} onChange={(e) => handleChangeQuestion(index, optIndex, e.target.value)} required />
                            </div>
                        ))}

                        <label className="form-label">Correct Answer (1-4)</label>
                        <select className="form-select" value={q.correctAnswer} onChange={(e) => handleChangeQuestion(index, "correctAnswer", e.target.value)}>
                            {q.options.map((_, optIndex) => (
                                <option key={optIndex} value={optIndex}>{optIndex + 1}</option>
                            ))}
                        </select>
                    </div>
                ))}

                <button type="button" className="btn btn-secondary me-2" onClick={handleAddQuestion}>Add Question</button>
                <button type="submit" className="btn btn-primary">Create Quiz</button>
            </form>
        </div>
    );
};

export default AddQuiz;
