import React, {createContext, ReactNode, useContext, useState} from "react";
import {GlobalContext} from "./shared/GlobalContext";
import {IVideoModel} from "../../models/video/IVideoModel";
import {IPaginationResponse} from "../../models/shared/IPaginationResponse";


// Тип контекста
interface VideoContextType {
    videoList: IVideoModel[];
    currentPage: number;
    totalPages: number;
    fetchVideos: (videoType: string, pageNumber: number, pageSize?: number) => Promise<void>;
    paginate: (videoType: string, pageNumber?: number, pageSize?: number) => Promise<void>;
    loading: boolean;
}

// Создаем контекст с типизацией
const VideoContext = createContext<VideoContextType | undefined>(undefined);

interface VideoContextProviderProps {
    children: ReactNode;
}

const VideoContextProvider: React.FC<VideoContextProviderProps> = ({children}) => {
    const globalContext = useContext(GlobalContext);

    if (!globalContext) {
        throw new Error("GlobalContext must be used within a GlobalContextProvider");
    }

    const {sendRequest, loading} = globalContext;

    const [videoList, setVideoList] = useState<IVideoModel[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    const fetchVideos =
        async (videoType: string, pageNumber: number, pageSize: number = 9): Promise<void> => {

            try {
                const data: IPaginationResponse<IVideoModel> = await sendRequest(
                    `http://localhost:8080/api/videos/page/${videoType}/${pageNumber}?pageSize=${pageSize}`
                );
                setVideoList(data.items);
                setCurrentPage(data.currentPage);
                setTotalPages(data.totalPages);

                sessionStorage.setItem("videoCurrentPage", String(data.currentPage));
                sessionStorage.setItem("videoTotalPages", String(data.totalPages));
            } catch (error) {
                console.error("Error while fetching news: ", error);
            }
        };

    const paginate =
        async (videoType: string, pageNumber: number = currentPage, pageSize: number = 5): Promise<void> => {

            const savedTotalPagesString = sessionStorage.getItem("videoTotalPages");
            const savedTotalPages = savedTotalPagesString ? Number(savedTotalPagesString) : 0;

            if (savedTotalPages === 0) {
                await fetchVideos(videoType, pageNumber, pageSize);
            }

            if (pageNumber >= 1 && pageNumber <= savedTotalPages) {
                await fetchVideos(videoType, pageNumber, pageSize);
            }
        };

    const value: VideoContextType = {
        videoList,
        currentPage,
        totalPages,
        fetchVideos,
        paginate,
        loading
    };

    return (
        <VideoContext.Provider value={value}>
            {children}
        </VideoContext.Provider>
    );
};

export {VideoContextProvider, VideoContext};
