import React, { createContext, ReactNode } from "react";

// Тип контекста
interface MusicContextType {
    // Определите свойства и методы, которые будут доступны через контекст
}

// Создаем контекст с типизацией
const MusicContext = createContext<MusicContextType | undefined>(undefined);

interface MusicContextProviderProps {
    children: ReactNode;
}

const MusicContextProvider: React.FC<MusicContextProviderProps> = ({ children }) => {
    const value: MusicContextType = {
        // Добавьте свойства или методы, которые хотите передавать через контекст
    };

    return (
        <MusicContext.Provider value={value}>
            {children}
        </MusicContext.Provider>
    );
};

export { MusicContextProvider, MusicContext };
