import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import RegisterStudent from "./pages/RegisterStudent";
import RegisterTeacher from "./pages/RegisterTeacher";
import DashboardPage from "./pages/Dashboard";
import Course from "./pages/Course";
import Profile from "./pages/Profile";
import Lecture from "./pages/Lecture";
import QuizProfile from "./pages/QuizProfile";
import QuizTaker from "./pages/QuizTaker";
import Layout from "./components/Layout";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                {/* ✅ Public routes (no navbar) */}
                <Route path="/" element={<Login />} />
                <Route path="/register/student" element={<RegisterStudent />} />
                <Route path="/register/teacher" element={<RegisterTeacher />} />

                {/* ✅ Private routes (with navbar inside Layout) */}
                <Route path="/" element={<Layout student={{ firstname: "John" }} />}>
                    <Route path="dashboard" element={<DashboardPage />} />
                    <Route path="courses/:id" element={<Course />} />
                    <Route path="student/profile" element={<Profile />} />
                    <Route path="lectures/:id" element={<Lecture />} />
                    <Route path="quiz/:quizId/profile" element={<QuizProfile />} />
                    <Route path="quiz/:quizId" element={<QuizTaker />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default AppRoutes;
