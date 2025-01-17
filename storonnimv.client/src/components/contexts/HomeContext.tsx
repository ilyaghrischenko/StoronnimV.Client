import React, {createContext, ReactNode, useContext, useState} from "react";
import {GlobalContext} from "./shared/GlobalContext";
import {IHomeNewsItem} from "../../models/home/IHomeNewsItem";
import {IVideoModel} from "../../models/video/IVideoModel";
import {IScheduleHomeItem} from "../../models/home/IScheduleHomeItem";

// Тип контекста
interface HomeContextType {
    loading: boolean;
    homeSchedule: IScheduleHomeItem;
    fetchHomeSchedule: () => Promise<void>;
    homeNewsList: IHomeNewsItem[];
    fetchHomeNewsList: () => Promise<void>;
    onClickHomeElementHandler: (section: string) => void;
    homePromotionVideo: IVideoModel;
    fetchHomePromotionVideo: () => Promise<void>;
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

    const [homeSchedule, setHomeSchedule] = useState<IScheduleHomeItem>({
        id: 1,
        photo: '',
        title: '',
        performanceDateTime: '',
        location: ''
    });

    const fetchHomeSchedule = async () : Promise<void> => {
        try {
            const data: IScheduleHomeItem = await sendRequest('http://localhost:8080/api/home/schedule');
            setHomeSchedule(data);
        } catch (error) {
            console.error("Error while fetching schedule for home: ", error);
        }
    };

    const [homeNewsList, setHomeNewsList] = useState<IHomeNewsItem[]>([]);

    const fetchHomeNewsList = async () : Promise<void> => {
        try {
            const data: IHomeNewsItem[] = await sendRequest('http://localhost:8080/api/home/news/4');
            setHomeNewsList(data);
        } catch (error) {
            console.error("Error while fetching news for home: ", error);
        }
    };

    const [homePromotionVideo, setHomePromotionVideo] = useState<IVideoModel>({
        id: 0,
        title: '',
        url: ''
    });

    const fetchHomePromotionVideo = async () : Promise<void> => {
        try {
            const data: IVideoModel = await sendRequest('http://localhost:8080/api/home/video');
            setHomePromotionVideo(data);
        } catch (error) {
            console.error("Error while fetching video for home: ", error);
        }
    };

    const onClickHomeElementHandler = (section: string) => {
        window.location.href = `http://localhost:3000/${section}`;
    };

    const value: HomeContextType = {
        loading,
        homeSchedule,
        fetchHomeSchedule,
        homeNewsList,
        fetchHomeNewsList,
        onClickHomeElementHandler,
        homePromotionVideo,
        fetchHomePromotionVideo
    };

    return (
        <HomeContext.Provider value={value}>
            {children}
        </HomeContext.Provider>
    );
};

export { HomeContextProvider, HomeContext };
