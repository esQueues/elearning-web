import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
    return (
        <div className="container mt-4">
            <h1>Admin Dashboard</h1>
            <div className="row">
                <div className="col-md-4">
                    <div className="card text-center">
                        <div className="card-body">
                            <h5 className="card-title">Manage Teachers</h5>
                            <p className="card-text">View and manage all teachers.</p>
                            <Link to="/admin/teachers" className="btn btn-primary">Go to Teachers</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-center">
                        <div className="card-body">
                            <h5 className="card-title">Manage Students</h5>
                            <p className="card-text">View and manage all students.</p>
                            <Link to="/admin/students" className="btn btn-primary">Go to Students</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-center">
                        <div className="card-body">
                            <h5 className="card-title">Manage Feedbacks</h5>
                            <p className="card-text">View and manage all feedbacks.</p>
                            <Link to="/admin/feedbacks" className="btn btn-primary">Go to Feedbacks</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
