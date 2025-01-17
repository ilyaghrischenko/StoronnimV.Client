import {FC} from "react";
import {IHomeNewsItem} from "../../../models/home/IHomeNewsItem";
import {Container} from "react-bootstrap";

interface INewsHomeListItemProps {
    item: IHomeNewsItem;
}

const NewsHomeListItem: FC<INewsHomeListItemProps> = ({item}) => {
    return (
        <Container>
            <p>{item.id}</p>
            <p>{item.title}</p>
            <p>{item.date}</p>
        </Container>
    );
};

export {NewsHomeListItem};