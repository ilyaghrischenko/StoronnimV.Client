import React, { createContext, ReactNode } from "react";

// Тип контекста
interface HomeContextType {
    // Здесь можно указать свойства и методы, которые будут доступны в контексте
}

// Создаем контекст с типизацией
const HomeContext = createContext<HomeContextType | undefined>(undefined);

interface HomeContextProviderProps {
    children: ReactNode;
}

const HomeContextProvider: React.FC<HomeContextProviderProps> = ({ children }) => {
    const value: HomeContextType = {
        // Добавьте свойства или методы, которые должны быть доступны в контексте
    };

    return (
        <HomeContext.Provider value={value}>
            {children}
        </HomeContext.Provider>
    );
};

export { HomeContextProvider, HomeContext };
