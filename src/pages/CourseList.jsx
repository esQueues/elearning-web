import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CourseList = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("http://localhost:8080/api/courses")
            .then((response) => {
                console.log("Fetched courses:", response.data);
                if (Array.isArray(response.data)) {
                    setCourses(response.data);
                } else {
                    console.error("Invalid data format:", response.data);
                    setCourses([]);
                }
            })
            .catch((error) => {
                console.error("Error fetching courses:", error);
                setCourses([]);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <div className="text-center mt-4">Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Courses</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {courses.map((course) => (
                    <div key={course.id} className="p-4 border rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold">
                            <Link to={`/courses/${course.id}`} className="text-blue-500 hover:underline">
                                {course.title}
                            </Link>
                        </h2>
                        <p className="text-gray-700">{course.teacher?.firstname ?? "Unknown"} {course.teacher?.lastname ?? ""}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourseList;