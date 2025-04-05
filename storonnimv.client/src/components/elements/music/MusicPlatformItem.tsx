import {FC, useContext} from "react";
import { ListGroupItem } from "react-bootstrap";
import { MusicEditButton } from "../admin/EditsButtons/MusicEditButton";
import { MusicDeleteButton } from "../admin/DeleteButtons/MusicDeleteButton";
import { IMusicPlatformItem } from "../../../models/music/IMusicPlatformItem";
import {GlobalContext} from "../../contexts/shared/GlobalContext.tsx";

interface MusicPlatformItemProps {
    item: IMusicPlatformItem;
}

const MusicPlatformItem: FC<MusicPlatformItemProps> = ({ item }) => {
    const globalContext = useContext(GlobalContext);

    if (!globalContext) {
        throw new Error("GlobalContext must be used within a GlobalContextProvider");
    }

    const { isAdmin } = globalContext;

    const formatUrl = (url: string): string => {
        // Проверка: начинается ли с чего-то вроде "scheme:"
        return /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(url)
            ? url
            : `https://${url}`;
    };



    return (
        <ListGroupItem
            className='music-platform-item position-relative'
            as='a'
            href={formatUrl(item.platformUrl)}
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