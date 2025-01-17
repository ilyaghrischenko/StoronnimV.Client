import { INewsShortItem } from "../../models/news/INewsShortItem";
import { createContext, FC, ReactNode, useContext, useState } from "react";
import { GlobalContext } from "./shared/GlobalContext";
import {IPaginationResponse} from "../../models/shared/IPaginationResponse";

interface NewsContextType {
    newsList: INewsShortItem[];
    currentPage: number;
    totalPages: number;
    fetchNews: (pageNumber?: number, pageSize?: number) => Promise<void>;
    paginate: (pageNumber: number, pageSize?: number) => void;
    loading: boolean;
}

const NewsContext = createContext<NewsContextType | undefined>(undefined);

interface NewsContextProviderProps {
    children: ReactNode;
}

const NewsContextProvider: FC<NewsContextProviderProps> = ({ children }) => {
    const globalContext = useContext(GlobalContext);

    if (!globalContext) {
        throw new Error("GlobalContext must be used within a GlobalContextProvider");
    }

    const { sendRequest, loading } = globalContext;

    const [newsList, setNewsList] = useState<INewsShortItem[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    const fetchNews = async (pageNumber: number = currentPage, pageSize: number = 9): Promise<void> => {
        try {
            const data: IPaginationResponse<INewsShortItem> = await sendRequest(
                `http://localhost:8080/api/news/page/${pageNumber}?pageSize=${pageSize}`
            );
            setNewsList(data.items);
            setCurrentPage(data.currentPage);
            setTotalPages(data.totalPages);

            sessionStorage.setItem("currentPage", String(data.currentPage));
            sessionStorage.setItem("totalPages", String(data.totalPages));
        } catch (error) {
            console.error("Error while fetching news: ", error);
        }
    };

    const paginate =
        async (pageNumber: number, pageSize: number = 9): Promise<void> => {
        const savedTotalPagesString = sessionStorage.getItem("totalPages");
        const savedTotalPages = savedTotalPagesString ? Number(savedTotalPagesString) : 0;

        if (savedTotalPages === 0) {
            await fetchNews(pageNumber, pageSize);
        }

        if (pageNumber >= 1 && pageNumber <= savedTotalPages) {
            await fetchNews(pageNumber, pageSize);
        }
    };

    const value: NewsContextType = {
        newsList,
        currentPage,
        totalPages,
        fetchNews,
        paginate,
        loading
    };

    return <NewsContext.Provider value={value}>{children}</NewsContext.Provider>;
};

export { NewsContext, NewsContextProvider };
