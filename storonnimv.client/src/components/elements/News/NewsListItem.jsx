import "../../../styles/elements/News/NewsListItem.css";

import {ListGroupItem, Container} from "react-bootstrap";

const NewsListItem = ({newsItem}) => {
    return (
        <ListGroupItem className='news-list-item'>
            <img
                src="http://localhost:8080/photo/news.jpg"
                alt="News photo000"
                className="news-item-photo" />

            <Container className="news-item-info-container">
                <p className="news-item-title">{newsItem.title}</p>
                <br/>
                <p className="news-item-date">{newsItem.date}</p>
            </Container>
        </ListGroupItem>
    );
};

export {NewsListItem};