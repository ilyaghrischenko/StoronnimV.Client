import {FC} from "react";
import {INewsShortItem} from "../../../models/news/INewsShortItem";
import {Image, ListGroupItem} from "react-bootstrap";

interface INewsListItemProps {
    newsItem: INewsShortItem;
}

const NewsListItem: FC<INewsListItemProps> = ({newsItem}) => {
    return (
        <ListGroupItem className='news-list-item'>
            <Image className='news-list-item__photo' src={newsItem.photo} fluid />
            <p className='news-list-item__title'>{newsItem.title}</p>
            <p className='news-list-item__date'>{newsItem.date}</p>
            <p className='news-list-item__priority'>{newsItem.priority}</p>
        </ListGroupItem>
    );
};

export {NewsListItem};