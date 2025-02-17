import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const QuizProfile = () => {
    const { quizId } = useParams();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState(null);
    const [loading, setLoading] = useState(true);
    const [lastAttempt, setLastAttempt] = useState(null);
    const [feedback, setFeedback] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [generatingFeedback, setGeneratingFeedback] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/modules/quizzes/${quizId}`, { withCredentials: true })
            .then((response) => setQuiz(response.data))
            .catch((error) => console.error("Error fetching quiz:", error))
            .finally(() => setLoading(false));
    }, [quizId]);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/modules/quizzes/${quizId}/attempt`, { withCredentials: true })
            .then((response) => {
                setLastAttempt(response.data);
                if (response.data?.attemptId) {
                    return axios.get(`http://localhost:8080/api/quiz/feedback/${response.data.attemptId}`, { withCredentials: true });
                }
                return null;
            })
            .then((feedbackResponse) => {
                if (feedbackResponse) {
                    setFeedback(feedbackResponse.data);
                }
            })
            .catch((error) => console.error("Error fetching attempt or feedback:", error));
    }, [quizId]);

    const handleGenerateFeedback = () => {
        if (!lastAttempt) return;
        setGeneratingFeedback(true);

        axios.post(`http://localhost:8080/api/quiz/feedback/${lastAttempt.attemptId}`, {}, { withCredentials: true })
            .then((response) => setFeedback(response.data))
            .catch((error) => console.error("Error generating feedback:", error))
            .finally(() => setGeneratingFeedback(false));
    };

    if (loading) return <p className="text-center mt-4 fs-4 fw-semibold">Loading...</p>;
    if (!quiz) return <p className="text-center text-danger fs-5">Quiz not found.</p>;

    // Prepare data for the score chart
    const scoreData = lastAttempt ? {
        labels: ["Score", "Remaining"],
        datasets: [{
            data: [lastAttempt.score, 100 - lastAttempt.score],
            backgroundColor: ["#36A2EB", "#E0E0E0"],
            hoverBackgroundColor: ["#36A2EB", "#E0E0E0"]
        }]
    } : null;

    // Format feedback text: remove "***" and replace double newlines with <br /><br />
    const formatFeedback = (text) => {
        if (!text) return "";
        return text
            .replace(/\*\*\*(.*?)\*\*\*/g, "<b><i>$1</i></b>") // *** -> жирный + курсив
            .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>") // ** -> жирный
            .replace(/\*(.*?)\*/g, "<i>$1</i>") // * -> курсив
            .replace(/\n\n/g, "<br /><br />") // Двойной перевод строки
            .replace(/\n/g, "<br />"); // Одиночный перевод строки
    };




    return (
        <div className="container mt-5">
            <h1 className="fw-bold">{quiz.title}</h1>
            <hr />

            {/* Last Attempt Info with Chart */}
            {lastAttempt && (
                <div className="alert alert-info text-center">
                    <h5>Last Attempt Score</h5>
                    <div style={{ width: "200px", margin: "auto" }}>
                        <Doughnut data={scoreData} />
                    </div>
                    <p className="mt-2"><strong>Score:</strong> {lastAttempt.score.toFixed(2)} / 100</p>
                </div>
            )}

            {/* Feedback Section */}
            {feedback ? (
                <div className="card mt-3">
                    <div className="card-header">
                        <button className="btn btn-link text-decoration-none fw-bold" onClick={() => setShowFeedback(!showFeedback)}>
                            {showFeedback ? "Hide Feedback" : "Show Feedback"}
                        </button>
                    </div>
                    {showFeedback && (
                        <div className="card-body">
                            <p dangerouslySetInnerHTML={{ __html: formatFeedback(feedback) }} />
                        </div>
                    )}
                </div>
            ) : lastAttempt && (
                <div className="text-center mt-3">
                    <button
                        className="btn btn-secondary"
                        onClick={handleGenerateFeedback}
                        disabled={generatingFeedback}
                    >
                        {generatingFeedback ? "Generating..." : "Generate AI Feedback"}
                    </button>
                </div>
            )}

            {/* Start Quiz Button (Redirect to QuizTaker) */}
            <div className="text-center mt-4">
                <button className="btn btn-primary btn-lg" onClick={() => navigate(`/quiz/${quizId}`)}>
                    Start Quiz
                </button>
            </div>
        </div>
    );
};

export default QuizProfile;
