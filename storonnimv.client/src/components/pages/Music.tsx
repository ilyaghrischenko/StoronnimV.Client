import {FC, useContext} from "react";
import { MusicContextProvider } from "../contexts/MusicContext";
import { Container } from "react-bootstrap";
import { SoundCloudContainer } from "../elements/music/SoundCloudContainer";
import { MusicPlatforms } from "../elements/music/MusicPlatforms";
import { AddMusicPlatformButton } from "../elements/admin/AddsButtons/AddMusicPlatformButton";
import {GlobalContext} from "../contexts/shared/GlobalContext.tsx";

const Music: FC = () => {
    const globalContext = useContext(GlobalContext);

    if (!globalContext) {
        throw new Error("GlobalContext must be used within a GlobalContextProvider");
    }

    const { isAdmin } = globalContext;

    return (
        <MusicContextProvider>
            <Container className="music-page page">
                {isAdmin && <AddMusicPlatformButton
                    apiUrl="/api/music/platform"
                    modalTitle="Додати музичну платформу" 
                    buttonLabel="Додати платформу"
                />}
                <MusicPlatforms />
                <SoundCloudContainer />
            </Container>
        </MusicContextProvider>
    );
};

export { Music };
