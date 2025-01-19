import {FC} from "react";
import {MusicContextProvider} from "../contexts/MusicContext";
import {Container} from "react-bootstrap";
import {SoundCloudContainer} from "../elements/music/SoundCloudContainer";
import {MusicPlatforms} from "../elements/music/MusicPlatforms";

const Music: FC = () => {
    return (
        <MusicContextProvider>
            <Container className='music-page page'>
                <MusicPlatforms />
                <SoundCloudContainer />
            </Container>
        </MusicContextProvider>
    );
};

export {Music};