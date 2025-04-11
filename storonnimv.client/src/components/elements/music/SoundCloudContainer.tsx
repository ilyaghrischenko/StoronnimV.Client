import {FC, useContext} from "react";
import {MusicContext} from "../../contexts/MusicContext";
import {PageLoading} from "../shared/PageLoading";
import ReactPlayer from 'react-player/soundcloud';

const SoundCloudContainer: FC = () => {
    const musicContext = useContext(MusicContext);

    if (!musicContext) {
        throw new Error("MusicContext must be used within a MusicContextProvider");
    }

    const {loading} = musicContext;

    if (loading) {
        return (
            <PageLoading elementsCount={1} columns={1} />
        );
    }

    return (
        <div className='soundcloud-container'>
            <h2>Слухайте нашу музику на SoundCloud</h2>
            <ReactPlayer
                url="https://soundcloud.com/apostolkremenchug"
                width="100%"
                height="166"
                playing={false}
                controls={true}
            />
        </div>
    );
};

export {SoundCloudContainer};