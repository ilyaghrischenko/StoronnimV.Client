import {FC, useContext} from "react";
import { MusicContextProvider } from "../contexts/MusicContext";
import { Container } from "react-bootstrap";
import { SoundCloudContainer } from "../elements/music/SoundCloudContainer";
import { MusicPlatforms } from "../elements/music/MusicPlatforms";
import { AddMusicPlatformButton } from "../elements/admin/AddsButtons/AddMusicPlatformButton";
import {AdminContext} from "../contexts/AdminContext.tsx";

const Music: FC = () => {
    const adminContext = useContext(AdminContext);

    if (!adminContext) {
        throw new Error("AdminContext must be used within a AdminContextProvider");
    }

    const { isAdmin } = adminContext;

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
