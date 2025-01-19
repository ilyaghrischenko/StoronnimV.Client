import {FC, useContext, useEffect} from "react";
import {ListGroup} from "react-bootstrap";

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
            {musicPlatforms.map((item) =>
                <MusicPlatformItem item={item} key={item.id}/>)}
        </ListGroup>
    );
};

export {MusicPlatforms};