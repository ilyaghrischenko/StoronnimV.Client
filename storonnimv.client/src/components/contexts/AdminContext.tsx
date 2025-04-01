import {createContext, FC, ReactNode, useContext, useState} from "react";
import { GlobalContext } from "./shared/GlobalContext.tsx";
import { ILogInRequest } from "../../models/admin/ILogInRequest.ts";
import { useNavigate } from "react-router-dom";
import {IBasicAdmin} from "../../models/admin/IBasicAdmin.ts";

interface AdminContextType {
    logIn: (logInRequest: ILogInRequest) => Promise<void>;
    loading: boolean;
    deleteAdmin: (adminId: number) => Promise<void>;
    basicAdmins: IBasicAdmin[];
    fetchBasicAdmins: () => Promise<void>;
    addAdmin: (login: string, password: string) => Promise<void>;
    editAdminLogin: (adminId: number, newLogin: string) => Promise<void>;
    editAdminPassword: (adminId: number, oldPassword: string, newPassword: string) => Promise<void>;
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

    const [basicAdmins, setBasicAdmins] = useState([{} as IBasicAdmin]);

    const fetchBasicAdmins = async () => {
        try {
            const response = await sendRequest("https://localhost:44315/api/super-admin/basic-admins");

            if (response.status === 200) {
                const data: IBasicAdmin[] = response.data;
                setBasicAdmins(data);
            }
        } catch (error) {
            console.error(`Error while fetching basic admins: ${error}`);
        }
    };

    const addAdmin = async (login: string, password: string) => {
        try {
            const response = await sendRequest(
                "https://localhost:44315/api/super-admin/basic-admins",
                "POST",
                JSON.stringify({ login, password }),
                { "Content-Type": "application/json" }
            );

            if (response.status === 200) {
                const addedAdmin: IBasicAdmin = response.data;
                setBasicAdmins((prevAdmins) => [...prevAdmins, addedAdmin]);

                alert('АДМІНА ДОДАНО');
            }
        } catch (error) {
            console.error(`Error while adding basic admin: ${error}`);
        }
    };

    const deleteAdmin = async (adminId: number) => {
        try {
            const response = await sendRequest(
                `https://localhost:44315/api/super-admin/basic-admins/${adminId}`,
                'DELETE'
            );

            if (response.status === 204) {
                basicAdmins.filter(admin => admin.id != adminId);
            }
        } catch (error) {
            console.error(`Error while deleting admin: ${error}`);
        }
    };

    const editAdminLogin = async (adminId: number, newLogin: string) => {
        try {
            const response = await sendRequest(
                `https://localhost:44315/api/super-admin/basic-admins/${adminId}/login`,
                'PATCH',
                JSON.stringify({ newLogin }),
                { 'Content-Type': 'application/json' }
            );

            if (response.status !== 200) {
                alert(response.statusText);
            }

            if (response.status === 200) {
                const updatedAdmin: IBasicAdmin = response.data;

                setBasicAdmins((prevAdmins) =>
                    prevAdmins.map((admin) =>
                        admin.id === adminId ? { ...admin, login: updatedAdmin.login } : admin
                    )
                );

                alert('ДАНІ АДМІНА ЗМІНЕНІ');
            }
        } catch (error) {
            console.error(`Error while editing admin login: ${error}`);
        }
    };

    const editAdminPassword = async (adminId: number, oldPassword: string, newPassword: string) => {
        if (oldPassword !== newPassword) {
            return;
        }

        try {
            const response = await sendRequest(
                `https://localhost:44315/api/super-admin/basic-admins/${adminId}/password`,
                'PATCH',
                JSON.stringify({ oldPassword, newPassword }),
                { 'Content-Type': 'application/json' }
            );

            if (response.status !== 200) {
                alert(response.statusText);
            }
        } catch (error) {
            console.error(`Error while editing admin password: ${error}`);
        }
    };

    const value: AdminContextType = {
        logIn,
        loading,
        deleteAdmin,
        basicAdmins,
        fetchBasicAdmins,
        addAdmin,
        editAdminLogin,
        editAdminPassword
    };

    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    );
};

export { AdminContextProvider, AdminContext };
