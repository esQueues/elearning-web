import { useState } from "react";
import axios from "axios";

const QuizTaker = ({ quizId, quiz, setQuizStarted }) => {
    const [answers, setAnswers] = useState({});
    const [result, setResult] = useState(null);

    const handleSelectAnswer = (questionId, answerId) => {
        setAnswers({ ...answers, [questionId]: answerId });
    };

    const handleSubmit = () => {
        const submissionData = Object.entries(answers).map(([questionId, answerId]) => ({
            questionId: Number(questionId),
            answerId: answerId,
        }));

        axios.post(`http://localhost:8080/api/modules/quizzes/${quizId}/submit`, submissionData, { withCredentials: true })
            .then((response) => setResult(response.data))
            .catch((error) => console.error("Error submitting quiz:", error));
    };

    return (
        <div>
            {result ? (
                <div className="alert alert-success text-center">
                    <h2>🎉 Quiz Completed!</h2>
                    <p><strong>Score:</strong> {result.score} / 10</p>
                    <button className="btn btn-primary mt-3" onClick={() => setQuizStarted(false)}>
                        Back to Quiz Profile
                    </button>
                </div>
            ) : (
                <form>
                    {quiz.questions.map((question) => (
                        <div key={question.id} className="mb-4">
                            <h5 className="fw-semibold">{question.questionText}</h5>
                            {question.answers.map((answer) => (
                                <div key={answer.id} className="form-check">
                                    <input
                                        type="radio"
                                        id={`q${question.id}-a${answer.id}`}
                                        name={`question-${question.id}`}
                                        className="form-check-input"
                                        value={answer.id}
                                        checked={answers[question.id] === answer.id}
                                        onChange={() => handleSelectAnswer(question.id, answer.id)}
                                    />
                                    <label htmlFor={`q${question.id}-a${answer.id}`} className="form-check-label">
                                        {answer.answerText}
                                    </label>
                                </div>
                            ))}
                        </div>
                    ))}
                    <button type="button" className="btn btn-success" onClick={handleSubmit}>
                        Submit Quiz
                    </button>
                </form>
            )}
        </div>
    );
};

export default QuizTaker;
