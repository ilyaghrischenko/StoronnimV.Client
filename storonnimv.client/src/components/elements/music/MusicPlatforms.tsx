import {FC, useContext, useEffect} from "react";
import {ListGroup} from "react-bootstrap";
import {MusicPlatformItem} from "./MusicPlatformItem";
import {MusicContext} from "../../contexts/MusicContext";
import {GlobalContext} from "../../contexts/shared/GlobalContext.tsx";
import {ModalLoading} from "../shared/ModalLoading.tsx";

const MusicPlatforms: FC = () => {
    const musicContext = useContext(MusicContext)!;
    const globalContext = useContext(GlobalContext)!;

    const {pageLoading} = globalContext;
    const {musicPlatforms, fetchMusicPlatforms} = musicContext;

    useEffect(() => {
        fetchMusicPlatforms();
    }, []);

    if (pageLoading) {
        return (
            <ModalLoading/>
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