import { createContext, FC, ReactNode, useContext } from "react";
import { GlobalContext } from "./shared/GlobalContext.tsx";
import { ILogInRequest } from "../../models/admin/ILogInRequest.ts";
import { useNavigate } from "react-router-dom";

interface AdminContextType {
    logIn: (logInRequest: ILogInRequest) => Promise<void>;
    loading: boolean;
    deleteAdmin: (adminId: string) => Promise<void>;
    editAdmin: (adminId: string, login: string, password: string) => Promise<void>;
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

    const { sendRequest, loading, setIsAdmin } = globalContext;
    const navigate = useNavigate();

    const logIn = async (logInRequest: ILogInRequest) => {
        try {
            const response = await sendRequest(
                'https://localhost:44315/api/account/login',
                'POST',
                JSON.stringify({ login: logInRequest.login, password: logInRequest.password }),
                { 'Content-Type': 'application/json' }
            );

            if (response.status === 401) {
                return;
            }

            if (response.status === 200) {
                setIsAdmin(true);
            }

            navigate('/', { replace: true });

            const adminRole: string = response.data;
            sessionStorage.setItem('role', adminRole);
        } catch (error) {
            console.error(`Error while logging in: ${error}`);
        }
    };

    const deleteAdmin = async (adminId: string) => {
        try {
            const response = await sendRequest(
                `https://localhost:44315/api/admins/${adminId}`,
                'DELETE'
            );
            if (response.status === 200) {
                console.log('Admin deleted');
            }
        } catch (error) {
            console.error(`Error while deleting admin: ${error}`);
        }
    };

    //TODO: edit login, edit pass 2 разных
    const editAdmin = async (adminId: string, login: string, password: string) => {
        try {
            const response = await sendRequest(
                `https://localhost:44315/api/admins/${adminId}`,
                'PUT',
                JSON.stringify({ login, password })
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
    };

    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    );
};

export { AdminContextProvider, AdminContext };
