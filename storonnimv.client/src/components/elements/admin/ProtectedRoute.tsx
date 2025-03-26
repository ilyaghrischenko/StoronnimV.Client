import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    children: ReactNode;  
    requiredRole: string; 
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
    const adminRole = sessionStorage.getItem("role");

    if (!adminRole) {
        return <Navigate to="/error?statusCode=401&message=Unauthorised" replace />
    }

    if (adminRole !== requiredRole) {
        return <Navigate to="/error?statusCode=403&message=Forbidden" replace />;
    }

    return <>{children}</>;
};

export { ProtectedRoute };
