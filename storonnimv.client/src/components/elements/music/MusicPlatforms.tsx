import {FC} from "react";
import {ListGroup, ListGroupItem} from "react-bootstrap";

import '../../../styles/elements/music/MusicPlatforms.css';
import {IMusicPlatformItem} from "../../../models/music/IMusicPlatformItem";
import {MusicPlatformItem} from "./MusicPlatformItem";

const platforms: IMusicPlatformItem[] = [
    {
        id: 1,
        bgImageUrl: 'https://www.scdn.co/i/_global/open-graph-default.png',
        platformUrl: 'https://open.spotify.com/artist/1Xyo4u8uXC1ZmMpatF05PJ'
    },
    {
        id: 2,
        bgImageUrl: 'https://www.scdn.co/i/_global/open-graph-default.png',
        platformUrl: 'https://open.spotify.com/artist/1Xyo4u8uXC1ZmMpatF05PJ'
    }
];

const MusicPlatforms: FC = () => {
    return (
        <ListGroup className='music-platforms-container'>
            {platforms.map((item, key) =>
                <MusicPlatformItem item={item} key={item.id}/>)}
        </ListGroup>
    );
};

export {MusicPlatforms};