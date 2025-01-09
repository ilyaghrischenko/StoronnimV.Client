import {FC} from "react";
import {INewsShortItem} from "../../../models/news/INewsShortItem";
import {ListGroupItem} from "react-bootstrap";

interface INewsListItemProps {
    newsItem: INewsShortItem;
}

const NewsListItem: FC<INewsListItemProps> = ({newsItem}) => {
    return (
        <ListGroupItem>
            <p>{newsItem.id}</p>
            <p>{newsItem.title}</p>
            <p>{newsItem.date}</p>
            <p>{newsItem.photo}</p>
            <p>{newsItem.priority}</p>
        </ListGroupItem>
    );
};

export {NewsListItem};