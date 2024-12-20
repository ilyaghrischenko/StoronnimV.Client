import {ListGroupItem} from "react-bootstrap";

const NewsListItem = ({newsItem}) => {
    return (
        <ListGroupItem className='news-list-item'>
            <img src="http://localhost:8080/photo/news.jpg" alt="News photo000" />
            <p>{newsItem.title}</p>
            <p>{newsItem.priority}</p>
            <p>{newsItem.date}</p>
        </ListGroupItem>
    );
};

export {NewsListItem};