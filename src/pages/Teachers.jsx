import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Teachers = () => {
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:8080/api/teachers")
            .then((response) => {
                if (Array.isArray(response.data)) {
                    setTeachers(response.data);
                } else {
                    console.error("Invalid data format:", response.data);
                    setTeachers([]);
                }
            })
            .catch((error) => {
                console.error("Error fetching teachers:", error);
                setError("Failed to fetch teachers");
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <div className="text-center mt-4">Loading...</div>;
    }

    if (error) {
        return <div className="text-center mt-4 text-red-500">{error}</div>;
    }

    if (teachers.length === 0) {
        return <div className="text-center mt-4">No teachers available.</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Teachers</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {teachers.map((teacher) => (
                    <div key={teacher.id} className="p-4 border rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold">
                            <Link to={`/teachers/${teacher.id}`} className="text-blue-500 hover:underline">
                                {teacher.firstname} {teacher.lastname}
                            </Link>
                        </h2>
                        <p className="text-gray-700">{teacher.email}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Teachers;
