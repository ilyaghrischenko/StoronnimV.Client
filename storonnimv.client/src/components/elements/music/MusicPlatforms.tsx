import {FC} from "react";
import {ListGroup, ListGroupItem} from "react-bootstrap";

import '../../../styles/elements/music/MusicPlatforms.css';

const MusicPlatforms: FC = () => {
    return (
        <ListGroup className='music-platforms-container'>
            <ListGroupItem>
                <p>platform</p>
            </ListGroupItem>
            <ListGroupItem>
                <p>platform</p>
            </ListGroupItem>
            <ListGroupItem>
                <p>platform</p>
            </ListGroupItem>
        </ListGroup>
    );
};

export {MusicPlatforms};