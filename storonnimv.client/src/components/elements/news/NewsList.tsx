import {FC, useContext, useEffect} from "react";
import {NewsContext} from "../../contexts/NewsContext";
import {NewsListItem} from "./NewsListItem";
import {ListGroup} from "react-bootstrap";

const NewsList: FC = () => {
    const newsContext = useContext(NewsContext);

    if (!newsContext) {
        throw new Error("NewsContext must be used within a NewsContextProvider");
    }

    const { fetchNews, newsList } = newsContext;

    useEffect(() => {
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