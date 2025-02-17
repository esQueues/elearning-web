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
            <h1 className="mb-4 text-center">Student Profile</h1>
            <div className="card shadow-sm p-4 d-flex flex-row align-items-center">
                {/* Квадратная аватарка */}
                <div className="p-3">
                    <div style={{
                        width: "150px",
                        height: "150px",
                        backgroundColor: "#d1d1d1",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "10px"
                    }}>
                        <i className="fas fa-user text-secondary" style={{ fontSize: "80px" }}></i>
                    </div>
                </div>

                {/* Информация о студенте */}
                <div className="p-3">
                    <h2 className="mt-3">{student.firstname} {student.lastname}</h2>
                    <p className="text-muted"><strong>Email:</strong> {student.email}</p>
                    <p className="text-muted"><strong>Grade:</strong> {student.gradeLevel}</p>
                    <p className="text-muted"><strong>School:</strong> {student.schoolInfo}</p>
                    <p className="text-muted"><strong>Birthday:</strong> {student.birthday}</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
