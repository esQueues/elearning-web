import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Navbar = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userType, setUserType] = useState(null); // Track user role

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/auth/check-session', {
                    method: 'GET',
                    credentials: 'include',
                });

                if (response.ok) {
                    setIsAuthenticated(true);
                    // Fetch user role
                    const userResponse = await fetch('http://localhost:8080/api/auth/user', {
                        method: 'GET',
                        credentials: 'include',
                    });

                    if (userResponse.ok) {
                        const userData = await userResponse.json();
                        setUserType(userData.role); // Expected response: { role: "teacher" } or { role: "student" }
                    }
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error('Error checking authentication:', error);
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/auth/logout', {
                method: 'GET',
                credentials: 'include',
            });

            if (response.ok) {
                setIsAuthenticated(false);
                setUserType(null);
                navigate('/'); // Redirect to login page
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    // Define student and teacher dashboard/profile links
    const dashboardLink = userType === "TEACHER" ? "/teacher-dashboard" : "/dashboard";
    const profileLink = userType === "TEACHER" ? "/teachers/profile" : "/student/profile";

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
            <div className="container d-flex justify-content-between align-items-center">
                {/* Logo / Brand (Links to Dashboard) */}
                <Link className="navbar-brand fw-bold mx-auto" to={dashboardLink}>LMS</Link>

                {/* Navbar Toggler for Mobile */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navbar Content */}
                <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                    <ul className="navbar-nav gap-4">
                        <li className="nav-item">
                            <Link className="nav-link" to="/courses">Courses</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/teachers">Teachers</Link>
                        </li>
                    </ul>
                </div>

                {/* Profile & Auth Buttons */}
                <div className="d-flex align-items-center gap-2">
                    {isAuthenticated ? (
                        <div className="dropdown">
                            {/* Profile Icon (Dropdown Toggle) */}
                            <button className="btn btn-light dropdown-toggle" id="profileDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="fas fa-user-circle fs-3"></i>
                            </button>

                            {/* Dropdown Menu */}
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                                <li>
                                    <Link className="dropdown-item" to={profileLink}>
                                        <i className="fas fa-user"></i> Profile
                                    </Link>
                                </li>
                                <li><hr className="dropdown-divider" /></li>
                                <li>
                                    <button className="dropdown-item text-danger" onClick={handleLogout}>
                                        <i className="fas fa-sign-out-alt"></i> Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        /* Login Button */
                        <Link className="btn btn-primary btn-sm ms-2" to="/">
                            <i className="fas fa-sign-in-alt"></i> Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
