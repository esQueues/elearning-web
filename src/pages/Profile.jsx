import { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
    const [student, setStudent] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:8080/api/student/profile", { withCredentials: true })
            .then(response => {
                setStudent(response.data);
            })
            .catch(error => {
                console.error("Error fetching student profile:", error);
            });
    }, []);

    if (!student) return <p className="text-center fs-4 mt-4">Loading...</p>;

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Student Profile</h1>
            <div className="card shadow-sm p-4">
                <h2>{student.firstname} {student.lastname}</h2>
                <p className="text-muted">Email: {student.email}</p>
                <p className="text-muted">Grade: {student.gradeLevel}</p>
                <p className="text-muted">School: {student.schoolInfo}</p>
                <p className="text-muted">Birthday: {student.birthday}</p>
            </div>
        </div>
    );
};

export default Profile;
