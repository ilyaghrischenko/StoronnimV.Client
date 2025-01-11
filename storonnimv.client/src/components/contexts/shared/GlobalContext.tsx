import React, {createContext, useState, ReactNode, FC} from "react";
import axios from "axios";

// Определяем интерфейс для значения контекста
interface GlobalContextType {
    sendRequest: (apiUrl: string, method?: string, body?: any, headers?: Record<string, string>) => Promise<any | undefined>;
    loading: boolean;
}

// Создаем контекст с типизацией
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

interface GlobalContextProviderProps {
    children: ReactNode;
}

const GlobalContextProvider: FC<GlobalContextProviderProps> = ({ children }) => {
    // Асинхронная функция для отправки запросов
    async function sendRequest(
        apiUrl: string,
        method: string = "GET",
        body: any = null,
        headers: Record<string, string> = {}
    ): Promise<any | undefined> {
        try {
            const config = {
                method,
                url: apiUrl,
                headers,
                data: body,
            };

            setLoading(true);
            const response = await axios(config);
            setLoading(false);
            return response.data;
        } catch (err: any) {
            console.error("HTTP Request failed: ", err.message);
            return undefined;
        }
    }

    const [loading, setLoading] = useState<boolean>(false);

    // Значение контекста
    const value: GlobalContextType = {
        sendRequest,
        loading
    };

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    );
};

export { GlobalContextProvider, GlobalContext };
