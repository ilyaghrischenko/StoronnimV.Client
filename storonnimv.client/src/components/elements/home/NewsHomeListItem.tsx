import {FC} from "react";
import {IHomeNewsItem} from "../../../models/home/IHomeNewsItem";
import {Container, Image} from "react-bootstrap";

import '../../../styles/elements/home/NewsHomeListItem.css';

interface INewsHomeListItemProps {
    item: IHomeNewsItem;
}

const NewsHomeListItem: FC<INewsHomeListItemProps> = ({item}) => {
    return (
        <Container className='news-home-list-item-container'>
            <Image className='news-home-list-item-image' src={item.photo} />
            <p className='news-home-list-item-title'>{item.title}</p>
        </Container>
    );
};

export {NewsHomeListItem};