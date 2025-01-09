import {FC, useContext, useEffect, useState} from "react";
import {NewsContext} from "../../contexts/NewsContext";
import {NewsListItem} from "./NewsListItem";
import {ListGroup} from "react-bootstrap";
import {INewsShortItem} from "../../../models/news/INewsShortItem";

const NewsList: FC = () => {
    const newsContext = useContext(NewsContext);

    if (!newsContext) {
        throw new Error("NewsContext must be used within a NewsContextProvider");
    }

    const { getNews } = newsContext;

    const [newsList, setNewsList] = useState<INewsShortItem[]>([]);
    useEffect(() => {
        const fetchNews = async (): Promise<void> => {
            try {
                const data = await getNews();
                if (!data) {
                    console.error("No data received from the API");
                    return;
                }

                setNewsList(data);
            } catch (error) {
                console.error("Error fetching news:", error);
            }
        };

        fetchNews();
    }, [])

    return (
        <ListGroup className="news-list">
            {newsList.length > 0 ? (
                newsList.map((item) => (
                    <NewsListItem newsItem={item} key={item.id} />
                ))
            ) : (
                <p>Новин поки нема</p>
            )}
        </ListGroup>
    );
};

export {NewsList};