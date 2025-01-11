import React, {createContext, ReactNode, useContext} from "react";
import {GlobalContext} from "./shared/GlobalContext";

// Тип контекста
interface HomeContextType {
    loading: boolean;
}

// Создаем контекст с типизацией
const HomeContext = createContext<HomeContextType | undefined>(undefined);

interface HomeContextProviderProps {
    children: ReactNode;
}

const HomeContextProvider: React.FC<HomeContextProviderProps> = ({ children }) => {
    const globalContext = useContext(GlobalContext);

    if (!globalContext) {
        throw new Error("GlobalContext must be used within a GlobalContextProvider");
    }

    const { sendRequest, loading } = globalContext;

    const value: HomeContextType = {
        loading
    };

    return (
        <HomeContext.Provider value={value}>
            {children}
        </HomeContext.Provider>
    );
};

export { HomeContextProvider, HomeContext };
