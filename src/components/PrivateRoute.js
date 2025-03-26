import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ allowedRoles }) => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("userRole");

    if (!token) {
        return <Navigate to="/" replace />;
    }

    if (!allowedRoles.includes(userRole)) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default PrivateRoute;
