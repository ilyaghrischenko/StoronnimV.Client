import React, { createContext, useState, ReactNode } from "react";
import axios from "axios";

// Определяем интерфейс для значения контекста
interface GlobalContextType {
    sendRequest: (apiUrl: string, method?: string, body?: any, headers?: Record<string, string>) => Promise<any | undefined>;
}

// Создаем контекст с типизацией
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

interface GlobalContextProviderProps {
    children: ReactNode;
}

const GlobalContextProvider: React.FC<GlobalContextProviderProps> = ({ children }) => {
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

            const response = await axios(config);
            return response.data;
        } catch (err: any) {
            console.error("HTTP Request failed: ", err.message);
            return undefined;
        }
    }

    // Значение контекста
    const value: GlobalContextType = {
        sendRequest,
    };

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    );
};

export { GlobalContextProvider, GlobalContext };
