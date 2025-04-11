import {FC, useContext} from "react";
import {Button, ListGroupItem} from "react-bootstrap";
import {IMusicPlatformItem} from "../../../models/music/IMusicPlatformItem";
import {GlobalContext} from "../../contexts/shared/GlobalContext.tsx";
import {EditMusicPlatformModalContent} from "./forms/EditMusicPlatformModalContent.tsx";
import {FaEdit, FaTrash} from "react-icons/fa";
import {DeleteMusicPlatformModalContent} from "./forms/DeleteMusicPlatformModalContent.tsx";

interface MusicPlatformItemProps {
    item: IMusicPlatformItem;
}

const MusicPlatformItem: FC<MusicPlatformItemProps> = ({item}) => {
    const globalContext = useContext(GlobalContext);

    if (!globalContext) {
        throw new Error("GlobalContext must be used within a GlobalContextProvider");
    }

    const {isAdmin, OnShowModal} = globalContext;

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
            style={{backgroundImage: `url(${item.bgImageUrl})`}}
        >
            {isAdmin && <Button onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();

                OnShowModal(<EditMusicPlatformModalContent item={item}/>)
            }}>
                <FaEdit/>
            </Button>}

            {isAdmin && <Button onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();

                OnShowModal(<DeleteMusicPlatformModalContent item={item}/>)
            }}>
                <FaTrash/>
            </Button>}
        </ListGroupItem>
    );
};

export {MusicPlatformItem};


// TODO : Сделать чтобы при нажимании на кнопку не перекидывало на муз. платформу + убрать видимость ссылки поверх кнопки