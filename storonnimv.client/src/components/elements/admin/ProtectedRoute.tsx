import React, { ReactNode, useContext } from "react";
import { GlobalContext } from "../../contexts/shared/GlobalContext";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    children: ReactNode;  
    requiredRole: string; 
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
    const globalContext = useContext(GlobalContext);

    if (!globalContext) {
        throw new Error("GlobalContext must be used within a GlobalContextProvider");
    }

    const { isAdmin, isAdminRoute } = globalContext;

    const adminRole = sessionStorage.getItem("role");
    if (!adminRole) {
        return;
    }

    if (!isAdmin || adminRole !== requiredRole || !isAdminRoute()) {
        return <Navigate to="/403" replace />;
    }

    return <>{children}</>;
};

export { ProtectedRoute };
