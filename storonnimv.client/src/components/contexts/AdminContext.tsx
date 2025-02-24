import { createContext, FC, ReactNode, useContext, useState } from "react";
import { GlobalContext } from "./shared/GlobalContext.tsx";
import { ILogInRequest } from "../../models/admin/ILogInRequest.ts";
import { useNavigate } from "react-router-dom";

interface Admin {
    id: string;
    login: string;
}

interface AdminContextType {
    logIn: (logInRequest: ILogInRequest) => Promise<void>;
    loading: boolean;
    deleteAdmin: (adminId: string) => Promise<void>;
    editAdmin: (adminId: string, login: string, password: string) => Promise<void>;
    currentUser: Admin | null;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

interface AdminContextProviderProps {
    children: ReactNode;
}

const AdminContextProvider: FC<AdminContextProviderProps> = ({ children }) => {
    const globalContext = useContext(GlobalContext);

    if (!globalContext) {
        throw new Error("GlobalContext must be used within a GlobalContextProvider");
    }

    const { sendRequest, loading } = globalContext;
    const navigate = useNavigate();

    const [currentUser, setCurrentUser] = useState<Admin | null>(null);

    const logIn = async (logInRequest: ILogInRequest) => {
        try {
            const response = await sendRequest(
                'http://localhost:8080/api/account/login',
                'POST',
                JSON.stringify({ login: logInRequest.login, password: logInRequest.password }),
                { 'Content-Type': 'application/json' }
            );

            if (response.status === 401) {
                return;
            }

            const data: string = response.data;
            sessionStorage.setItem('token', data);
            navigate('/', { replace: true });

            const userRole = response.data.role; 
            sessionStorage.setItem('role', userRole);

            const userResponse = await sendRequest(
                'http://localhost:8080/api/account/current', 
                'GET',
                null,
                { 'Authorization': `Bearer ${data}` }
            );
            
            if (userResponse.status === 200) {
                setCurrentUser(userResponse.data);
            }

        } catch (error) {
            console.error(`Error while logging in: ${error}`);
        }
    };

    const deleteAdmin = async (adminId: string) => {
        try {
            const response = await sendRequest(
                `http://localhost:8080/api/admins/${adminId}`,
                'DELETE',
                null,
                { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` }
            );
            if (response.status === 200) {
                console.log('Admin deleted');
            }
        } catch (error) {
            console.error(`Error while deleting admin: ${error}`);
        }
    };

    const editAdmin = async (adminId: string, login: string, password: string) => {
        try {
            const response = await sendRequest(
                `http://localhost:8080/api/admins/${adminId}`,
                'PUT',
                JSON.stringify({ login, password }),
                { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` }
            );
            if (response.status === 200) {
                console.log('Admin edited');
            }
        } catch (error) {
            console.error(`Error while editing admin: ${error}`);
        }
    };

    const value: AdminContextType = {
        logIn,
        loading,
        deleteAdmin,
        editAdmin,
        currentUser
    };

    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    );
};

export { AdminContextProvider, AdminContext };
