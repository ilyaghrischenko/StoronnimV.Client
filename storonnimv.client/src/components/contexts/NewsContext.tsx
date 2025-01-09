import {INewsShortItem} from "../../models/news/INewsShortItem";
import {createContext, FC, ReactNode, useContext} from "react";
import {GlobalContext} from "./shared/GlobalContext";

interface NewsContextType {
    getNews: () => Promise<INewsShortItem[] | undefined>;
}

const NewsContext = createContext<NewsContextType | undefined>(undefined);

interface NewsContextProviderProps {
    children: ReactNode;
}

const NewsContextProvider: FC<NewsContextProviderProps> = ({children}) => {
    const globalContext = useContext(GlobalContext);

    if (!globalContext) {
        throw new Error("GlobalContext must be used within a GlobalContextProvider");
    }

    const {sendRequest} = globalContext;

    const getNews = async (): Promise<INewsShortItem[] | undefined> => {
        try {
            const data: INewsShortItem[] = await sendRequest("http://localhost:8080/api/news");

            if (!data) {
                console.error("No data received from the API");
                return undefined;
            }

            return data;
        } catch (error) {
            console.error("Error fetching news:", error);
            return undefined;
        }
    }

    const value: NewsContextType = {
        getNews
    }

    return <NewsContext.Provider value={value}>{children}</NewsContext.Provider>
};

export {NewsContext, NewsContextProvider};