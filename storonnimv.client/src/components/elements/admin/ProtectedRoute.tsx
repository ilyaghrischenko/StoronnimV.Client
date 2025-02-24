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

    const { isAdminRoute } = globalContext;  
    const token = sessionStorage.getItem("token");
    const userRole = sessionStorage.getItem("role");

    if (!token || !userRole || userRole !== requiredRole || !isAdminRoute()) {
        //return <Navigate to="/403" replace />; Закоменчено для доступа к странице
    }

    return <>{children}</>;
};

export { ProtectedRoute };
