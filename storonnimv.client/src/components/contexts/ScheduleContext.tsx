import React, {createContext, ReactNode, useContext} from "react";
import {GlobalContext} from "./shared/GlobalContext";

// Тип контекста
interface ScheduleContextType {
    loading: boolean;
}

// Создаем контекст с типизацией
const ScheduleContext = createContext<ScheduleContextType | undefined>(undefined);

interface ScheduleContextProviderProps {
    children: ReactNode;
}

const ScheduleContextProvider: React.FC<ScheduleContextProviderProps> = ({ children }) => {
    const globalContext = useContext(GlobalContext);

    if (!globalContext) {
        throw new Error("GlobalContext must be used within a GlobalContextProvider");
    }

    const { sendRequest, loading } = globalContext;

    const value: ScheduleContextType = {
        loading
    };

    return (
        <ScheduleContext.Provider value={value}>
            {children}
        </ScheduleContext.Provider>
    );
};

export { ScheduleContextProvider, ScheduleContext };
