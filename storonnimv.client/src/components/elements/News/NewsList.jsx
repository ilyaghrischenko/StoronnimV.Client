import {useContext, useEffect, useState} from "react";

import {ListGroup} from "react-bootstrap";

import {NewsListItem} from "./NewsListItem";
import {NewsContext} from "../../contexts/NewsContext";

const NewsList = () => {
    const {getNews} = useContext(NewsContext);
    const [newsList, setNewsList] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            const data = await getNews();
            setNewsList(data);
        };

        fetchNews();
    }, [getNews]);
    
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
}

export {NewsList};