import React, {createContext, ReactNode, useContext, useState} from "react";
import {GlobalContext} from "./shared/GlobalContext";
import {IMusicPlatformItem} from "../../models/music/IMusicPlatformItem";

// Тип контекста
interface MusicContextType {
    loading: boolean;
    musicPlatforms: IMusicPlatformItem[];
    fetchMusicPlatforms: () => Promise<void>;
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

    const [musicPlatforms, setMusicPlatforms] = useState<IMusicPlatformItem[]>([]);

    const fetchMusicPlatforms = async () : Promise<void> => {
        try {
            const response = await sendRequest('https://localhost:44315/api/music');

            const data: IMusicPlatformItem[] = response.data;

            setMusicPlatforms(data);
        } catch (error) {
            console.error('Error fetching music platforms', error);
        }
    };

    const value: MusicContextType = {
        loading,
        musicPlatforms,
        fetchMusicPlatforms
    };

    return (
        <MusicContext.Provider value={value}>
            {children}
        </MusicContext.Provider>
    );
};

export { MusicContextProvider, MusicContext };
