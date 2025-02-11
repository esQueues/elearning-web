import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import QuizTaker from "./QuizTaker"; // Import QuizTaker component

const QuizProfile = () => {
    const { quizId } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quizStarted, setQuizStarted] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/modules/quizzes/${quizId}`, { withCredentials: true })
            .then((response) => setQuiz(response.data))
            .catch((error) => console.error("Error fetching quiz:", error))
            .finally(() => setLoading(false));
    }, [quizId]);

    if (loading) return <p className="text-center mt-4 fs-4 fw-semibold">Loading...</p>;
    if (!quiz) return <p className="text-center text-danger fs-5">Quiz not found.</p>;

    return (
        <div className="container mt-5">
            <h1 className="fw-bold">{quiz.title}</h1>
            <hr />

            {quizStarted ? (
                <QuizTaker quizId={quizId} quiz={quiz} setQuizStarted={setQuizStarted} />
            ) : (
                <div className="text-center">
                    <button className="btn btn-primary btn-lg" onClick={() => setQuizStarted(true)}>
                        Start Quiz
                    </button>
                </div>
            )}
        </div>
    );
};

export default QuizProfile;
