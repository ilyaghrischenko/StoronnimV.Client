import {FC, useContext} from "react";
import { ListGroupItem } from "react-bootstrap";
import { MusicEditButton } from "../admin/EditsButtons/MusicEditButton";
import { MusicDeleteButton } from "../admin/DeleteButtons/MusicDeleteButton";
import { IMusicPlatformItem } from "../../../models/music/IMusicPlatformItem";
import {AdminContext} from "../../contexts/AdminContext.tsx";

interface MusicPlatformItemProps {
    item: IMusicPlatformItem;
}

const MusicPlatformItem: FC<MusicPlatformItemProps> = ({ item }) => {
    const adminContext = useContext(AdminContext);

    if (!adminContext) {
        throw new Error("AdminContext must be used within a AdminContextProvider");
    }

    const { isAdmin } = adminContext;

    return (
        <ListGroupItem
            className='music-platform-item position-relative'
            as='a'
            href={item.platformUrl}
            target='_blank'
            rel='noopener noreferrer'
            style={{ backgroundImage: `url(${item.bgImageUrl})` }}
        >
            { isAdmin && <MusicEditButton item={item} />}
            { isAdmin && <MusicDeleteButton item={item} />}
        </ListGroupItem>
    );
};

export { MusicPlatformItem };


// TODO : Сделать чтобы при нажимании на кнопку не перекидывало на муз. платформу + убрать видимость ссылки поверх кнопки