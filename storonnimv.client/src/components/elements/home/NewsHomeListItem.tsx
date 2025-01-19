import {FC} from "react";
import {IHomeNewsItem} from "../../../models/home/IHomeNewsItem";
import {Container, Image} from "react-bootstrap";

interface INewsHomeListItemProps {
    item: IHomeNewsItem;
}

const NewsHomeListItem: FC<INewsHomeListItemProps> = ({item}) => {
    return (
        <Container className='news-home-list-item-container'>
            <Image className='news-home-list-item-container__image' src={item.photo} />
            <p className='news-home-list-item-container__title'>{item.title}</p>
        </Container>
    );
};

export {NewsHomeListItem};