import {FC, useContext, useEffect} from "react";
import {ListGroup, ListGroupItem} from "react-bootstrap";

import '../../../styles/elements/music/MusicPlatforms.css';
import {IMusicPlatformItem} from "../../../models/music/IMusicPlatformItem";
import {MusicPlatformItem} from "./MusicPlatformItem";
import {MusicContext} from "../../contexts/MusicContext";
import {Loading} from "../shared/Loading";

const MusicPlatforms: FC = () => {
    const musicContext = useContext(MusicContext);

    if (!musicContext) {
        throw new Error("MusicContext must be used within a MusicContextProvider");
    }

    const {musicPlatforms, fetchMusicPlatforms, loading} = musicContext;

    useEffect(() => {
        fetchMusicPlatforms();
    }, []);

    if (loading) {
        return (
            <Loading />
        );
    }

    return (
        <ListGroup className='music-platforms-container'>
            {musicPlatforms.map((item, key) =>
                <MusicPlatformItem item={item} key={item.id}/>)}
        </ListGroup>
    );
};

export {MusicPlatforms};