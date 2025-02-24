import { FC } from "react";
import { ListGroupItem } from "react-bootstrap";
import { MusicEditButton } from "../../EditsButtons/MusicEditButton";
import { MusicDeleteButton } from "../../DeleteButtons/MusicDeleteButton";
import { IMusicPlatformItem } from "../../../models/music/IMusicPlatformItem";

interface MusicPlatformItemProps {
    item: IMusicPlatformItem;
}

const MusicPlatformItem: FC<MusicPlatformItemProps> = ({ item }) => {
    return (
        <ListGroupItem
            className='music-platform-item position-relative'
            as='a'
            href={item.platformUrl}
            target='_blank'
            rel='noopener noreferrer'
            style={{ backgroundImage: `url(${item.bgImageUrl})` }}
        >
            <MusicEditButton item={item} />
            <MusicDeleteButton item={item} />
        </ListGroupItem>
    );
};

export { MusicPlatformItem };


// TODO : Сделать чтобы при нажимании на кнопку не перекидывало на муз. платформу + убрать видимость ссылки поверх кнопки