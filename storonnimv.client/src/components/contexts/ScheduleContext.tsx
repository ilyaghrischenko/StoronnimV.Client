import React, { createContext, ReactNode } from "react";

// Тип контекста
interface ScheduleContextType {
    // Определите свойства и методы, которые будут доступны через контекст
}

// Создаем контекст с типизацией
const ScheduleContext = createContext<ScheduleContextType | undefined>(undefined);

interface ScheduleContextProviderProps {
    children: ReactNode;
}

const ScheduleContextProvider: React.FC<ScheduleContextProviderProps> = ({ children }) => {
    const value: ScheduleContextType = {
        // Добавьте свойства или методы, которые хотите передавать через контекст
    };

    return (
        <ScheduleContext.Provider value={value}>
            {children}
        </ScheduleContext.Provider>
    );
};

export { ScheduleContextProvider, ScheduleContext };
