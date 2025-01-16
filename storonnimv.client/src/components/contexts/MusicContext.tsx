import React, {createContext, ReactNode, useContext, useState} from "react";
import {GlobalContext} from "./shared/GlobalContext";
import {IMusicPlatformItem} from "../../models/music/IMusicPlatformItem";

// Тип контекста
interface MusicContextType {
    loading: boolean;
    fetchEmbedData: () => Promise<void>;
    embedHtml: string;
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

    const [embedHtml, setEmbedHtml] = useState<string>('');

    const fetchEmbedData = async () : Promise<void> => {
        try {
            const data = await sendRequest(`https://soundcloud.com/oembed?format=json&url=${encodeURIComponent('https://soundcloud.com/apostolkremenchug')}`)
            setEmbedHtml(data.html);
        } catch (error) {
            console.error('Error fetching SoundCloud embed data', error);
        }
    };

    const [musicPlatforms, setMusicPlatforms] = useState<IMusicPlatformItem[]>([]);

    const fetchMusicPlatforms = async () : Promise<void> => {
        try {
            const data: IMusicPlatformItem[] = await sendRequest('http://localhost:8080/api/music');
            setMusicPlatforms(data);
        } catch (error) {
            console.error('Error fetching music platforms', error);
        }
    };

    const value: MusicContextType = {
        loading,
        fetchEmbedData,
        embedHtml,
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
