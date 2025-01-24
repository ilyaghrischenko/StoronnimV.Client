import {createContext, FC, ReactNode, useContext} from "react";
import {GlobalContext} from "./shared/GlobalContext.tsx";
import {ILogInRequest} from "../../models/admin/ILogInRequest.ts";
import {useNavigate} from "react-router-dom";

interface AdminContextType {
    logIn: (logInRequest: ILogInRequest) => Promise<void>;
    loading: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

interface AdminContextProviderProps {
    children: ReactNode;
}

const AdminContextProvider: FC<AdminContextProviderProps> = ({children}) => {
    const globalContext = useContext(GlobalContext);

    if (!globalContext) {
        throw new Error("GlobalContext must be used within a GlobalContextProvider");
    }

    const { sendRequest, loading } = globalContext;

    const navigate = useNavigate();

    const logIn = async (logInRequest: ILogInRequest) => {
        try {
            const response = await sendRequest(
                'http://localhost:8080/api/account/login',
                'POST',
                JSON.stringify({login: logInRequest.login, password: logInRequest.password}),
                { 'Content-Type': 'application/json' });

            if (response.status === 401) {
                alert(response.statusText + '!!! Не вірні дані');
                return;
            }

            const data: string = response.data;

            sessionStorage.setItem('token', data);
            navigate('/admin/main', {replace: true});
        } catch (error) {
            console.error(`error while logging in: ${error}`);
            return;
        }
    };

    const value: AdminContextType = {
        logIn,
        loading
    };

    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    );
};

export { AdminContextProvider, AdminContext };