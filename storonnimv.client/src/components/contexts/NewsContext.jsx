import {createContext, useContext} from "react";
import {GlobalContext} from "./Shared/GlobalContext";

const NewsContext = createContext();

const NewsContextProvider = ({children}) => {
    const {sendRequest} = useContext(GlobalContext);

    const getNews = async () => {
        return await sendRequest("http://localhost:8080/api/news");
    };

    const value = {
        getNews,
    };
    
    return (
        <NewsContext.Provider value={value}>
            {children}
        </NewsContext.Provider>
    );
};

export {NewsContext, NewsContextProvider};