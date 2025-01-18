    import {ListGroupItem} from "react-bootstrap";
    import {FC} from "react";
    import {IMusicPlatformItem} from "../../../models/music/IMusicPlatformItem";

    import '../../../styles/elements/music/MusicPlatformItem.css';

    interface MusicPlatformItemProps {
        item: IMusicPlatformItem;
    }

    const MusicPlatformItem: FC<MusicPlatformItemProps> = ({item}) => {
        return (
            <ListGroupItem
                className='music-platform-item'
                as='a'
                href={item.platformUrl}
                target='_blank'
                rel='noopener noreferrer'
                style={{backgroundImage: `url(${item.bgImageUrl})`}} />
        );
    };

    export {MusicPlatformItem};