import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import RegisterStudent from "./pages/RegisterStudent";
import RegisterTeacher from "./pages/RegisterTeacher";
import DashboardPage from "./pages/Dashboard";
import Course from "./pages/Course";
import Profile from "./pages/Profile";
import Lecture from "./pages/Lecture";
import QuizProfile from "./pages/QuizProfile";
import QuizTaker from "./pages/QuizTaker";
import TeacherProfile from "./pages/TeacherProfile";
import CourseList from "./pages/CourseList";
import Teachers from "./pages/Teachers";
import Navbar from "./components/Navbar";
import TeacherDashboard from "./pages/TeacherDashboard";
import CourseManage from "./pages/CourseManage";
import AddQuiz from "./pages/AddQuiz";
import ManageQuiz from "./pages/ManageQuiz";
import ManageLecture from "./pages/ManageLecture";

const AppRoutes = () => {
    return (
        <>
            <Navbar /> {/* Include the Navbar here */}
            <Routes>
                {/* ✅ Public routes (без навбара) */}
                <Route path="/" element={<Login />} />
                <Route path="/register/student" element={<RegisterStudent />} />
                <Route path="/register/teacher" element={<RegisterTeacher />} />

                {/* ✅ Private routes (с навбаром) */}
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
                <Route path="/courses/:id" element={<Course />} />
                <Route path="/courses/:id/manage" element={<CourseManage />} /> {/* New Route */}
                <Route path="/modules/:id/add-quiz" element={<AddQuiz />} />
                <Route path="/modules/:id/manage-lectures" element={<ManageLecture />} />
                <Route path="/quizzes/:id/manage" element={<ManageQuiz />} />

                <Route path="/student/profile" element={<Profile />} />
                <Route path="/lectures/:id" element={<Lecture />} />
                <Route path="/quiz/:quizId/profile" element={<QuizProfile />} />
                <Route path="/quiz/:quizId" element={<QuizTaker />} />
                <Route path="/teachers/:teacherId" element={<TeacherProfile />} />
                <Route path="/courses" element={<CourseList />} />
                <Route path="/teachers" element={<Teachers />} />
            </Routes>
        </>
    );
};

export default AppRoutes;
