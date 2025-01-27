import {FC, useContext, useEffect} from "react";
import {ListGroup} from "react-bootstrap";

import {MusicPlatformItem} from "./MusicPlatformItem";
import {MusicContext} from "../../contexts/MusicContext";
import {PageLoading} from "../shared/PageLoading";

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
            <PageLoading elementsCount={3} columns={3} />
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