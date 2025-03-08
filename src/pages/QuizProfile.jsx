import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { motion } from "framer-motion";
import { Spinner } from "react-bootstrap";

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
        axios.get(`/api/modules/quizzes/${quizId}`, { withCredentials: true })
            .then((response) => setQuiz(response.data))
            .catch((error) => console.error("Error fetching quiz:", error))
            .finally(() => setLoading(false));
    }, [quizId]);

    useEffect(() => {
        axios.get(`/api/modules/quizzes/${quizId}/attempt`, { withCredentials: true })
            .then((response) => {
                setLastAttempt(response.data);
                if (response.data?.attemptId) {
                    return axios.get(`/api/quiz/feedback/${response.data.attemptId}`, { withCredentials: true });
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

        axios.post(`/api/quiz/feedback/${lastAttempt.attemptId}`, {}, { withCredentials: true })
            .then((response) => setFeedback(response.data))
            .catch((error) => console.error("Error generating feedback:", error))
            .finally(() => setGeneratingFeedback(false));
    };

    if (loading) return <p className="text-center mt-4 fs-4 fw-semibold">Loading...</p>;
    if (!quiz) return <p className="text-center text-danger fs-5">Quiz not found.</p>;

    const scoreData = lastAttempt ? {
        labels: ["Score", "Remaining"],
        datasets: [{
            data: [lastAttempt.score, 100 - lastAttempt.score],
            backgroundColor: ["#36A2EB", "#E0E0E0"],
            hoverBackgroundColor: ["#36A2EB", "#E0E0E0"]
        }]
    } : null;

    const formatFeedback = (text) => {
        if (!text) return "";

        return text
            .replace(/\*\*\*(.*?)\*\*\*/g, "<b><i>$1</i></b>")
            .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
            .replace(/\b\*(\S.*?\S)\*\b/g, "<i>$1</i>")
            .replace(/^\*\s(?!✅|❌)(.*)/gm, "• $1")
            .replace(/\n{2,}/g, "<br /><br />")
            .replace(/\n/g, "<br />");
    };

    return (
        <div className="container mt-5">
            <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>Артқа</button>

            <h1 className="fw-bold">{quiz.title}</h1>
            <hr />

            {lastAttempt && (
                <div className="alert text-center ${lastAttempt.passed ? 'alert-success' : 'alert-danger'}">
                    <h5>Last Attempt Score</h5>
                    <div style={{ width: "200px", margin: "auto" }}>
                        <Doughnut data={scoreData} />
                    </div>
                    <p className="mt-2"><strong>Score:</strong> {lastAttempt.score.toFixed(2)} / 100</p>
                    <p className={`fw-bold mt-2 ${lastAttempt.passed ? 'text-success' : 'text-danger'}`}>
                        {lastAttempt.passed ? "Passed ✅" : "Not Passed ❌ Try Again"}
                    </p>
                </div>
            )}

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
                    {generatingFeedback ? (
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                            style={{ display: "inline-block" }}
                        >
                            <Spinner animation="border" variant="primary" />
                        </motion.div>
                    ) : (
                        <button
                            className="btn btn-secondary"
                            onClick={handleGenerateFeedback}
                            disabled={generatingFeedback}
                        >
                            Generate AI Feedback
                        </button>
                    )}
                </div>
            )}

            <div className="text-center mt-4">
                <button className="btn btn-primary btn-lg" onClick={() => navigate(`/quiz/${quizId}`)}>
                    Start Quiz
                </button>
            </div>
        </div>
    );
};

export default QuizProfile;
