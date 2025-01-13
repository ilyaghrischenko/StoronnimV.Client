import React, {createContext, ReactNode, useContext, useState} from "react";
import {GlobalContext} from "./shared/GlobalContext";

// Тип контекста
interface MusicContextType {
    loading: boolean;
    fetchEmbedData: () => Promise<void>;
    embedHtml: string;
}

// Создаем контекст с типизацией
const MusicContext = createContext<MusicContextType | undefined>(undefined);

interface MusicContextProviderProps {
    children: ReactNode;
}

const MusicContextProvider: React.FC<MusicContextProviderProps> = ({ children }) => {
    const globalContext = useContext(GlobalContext);

    if (!globalContext) {
        throw new Error("GlobalContext must be used within a GlobalContextProvider");
    }

    const { sendRequest, loading } = globalContext;

    const [embedHtml, setEmbedHtml] = useState<string>('');

    const fetchEmbedData = async () : Promise<void> => {
        try {
            const data = await sendRequest(`https://soundcloud.com/oembed?format=json&url=${encodeURIComponent('https://soundcloud.com/apostolkremenchug')}`)
            setEmbedHtml(data.html);
            console.dir(data);
        } catch (error) {
            console.error('Error fetching SoundCloud embed data', error);
        }
    };

    const value: MusicContextType = {
        loading,
        fetchEmbedData,
        embedHtml
    };

    return (
        <MusicContext.Provider value={value}>
            {children}
        </MusicContext.Provider>
    );
};

export { MusicContextProvider, MusicContext };
