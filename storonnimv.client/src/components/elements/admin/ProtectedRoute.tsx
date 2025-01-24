import {FC, ReactNode} from "react";
import {Navigate} from "react-router-dom";

interface IProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute: FC<IProtectedRouteProps> = ({children}) => {
    const token = sessionStorage.getItem("token");

    if (!token) {
        return <Navigate to='/' replace />
    }

    return children;
};

export {ProtectedRoute};