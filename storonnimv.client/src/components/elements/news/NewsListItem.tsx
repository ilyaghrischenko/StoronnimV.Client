import {FC} from "react";
import {INewsShortItem} from "../../../models/news/INewsShortItem";
import {Image, ListGroupItem} from "react-bootstrap";

import '../../../styles/elements/news/NewsListItem.css';

interface INewsListItemProps {
    newsItem: INewsShortItem;
}

const NewsListItem: FC<INewsListItemProps> = ({newsItem}) => {
    return (
        <ListGroupItem className='news-list-item'>
            <Image className='item-photo' src={newsItem.photo} fluid />
            <p>{newsItem.id}</p>
            <p className='item-title'>{newsItem.title}</p>
            <p className='item-date'>{newsItem.date}</p>
            <p className='item-priority'>{newsItem.priority}</p>
        </ListGroupItem>
    );
};

export {NewsListItem};