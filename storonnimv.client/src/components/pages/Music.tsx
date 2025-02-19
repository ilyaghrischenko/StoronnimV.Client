import { FC } from "react";
import { MusicContextProvider } from "../contexts/MusicContext";
import { Container } from "react-bootstrap";
import { SoundCloudContainer } from "../elements/music/SoundCloudContainer";
import { MusicPlatforms } from "../elements/music/MusicPlatforms";
import { AddMusicPlatformButton } from "../buttons/AddMusicPlatformButton";

const Music: FC = () => {
    return (
        <MusicContextProvider>
            <Container className="music-page page">
            <AddMusicPlatformButton
                    apiUrl="/api/music/platform" 
                    modalTitle="Додати музичну платформу" 
                    buttonLabel="Додати платформу"
                />
                <MusicPlatforms />
                <SoundCloudContainer />
            </Container>
        </MusicContextProvider>
    );
};

export { Music };
