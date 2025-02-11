import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

const Layout = ({ student }) => {
    return (
        <div>
            {/* ✅ Navbar - Always Visible */}
            <nav className="navbar navbar-light bg-light shadow-sm p-3">
                <div className="container">
                    <Link to="/dashboard" className="navbar-brand fw-bold fs-4">
                        My Learning
                    </Link>
                    {student && (
                        <div className="d-flex align-items-center">
                            <span className="me-2 fw-semibold">Profile</span>
                            <Link to="/student/profile">
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                                    alt="Profile"
                                    className="rounded-circle border"
                                    width="40"
                                    height="40"
                                />
                            </Link>
                        </div>
                    )}
                </div>
            </nav>

            {/* ✅ This will render different pages inside this layout */}
            <div className="container mt-4">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
