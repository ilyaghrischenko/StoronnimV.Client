import {FC, useContext, useEffect} from "react";
import {MusicContextProvider} from "../contexts/MusicContext";
import {Button, Container} from "react-bootstrap";
import {SpotifyContainer} from "../elements/music/SpotifyContainer.tsx";
import {MusicPlatforms} from "../elements/music/MusicPlatforms";
import {GlobalContext} from "../contexts/shared/GlobalContext.tsx";
import {AddMusicPlatformModalContent} from "../elements/music/forms/AddMusicPlatformModalContent.tsx";
import {FaPlusCircle} from "react-icons/fa";

const Music: FC = () => {
    const globalContext = useContext(GlobalContext);

    if (!globalContext) {
        throw new Error("GlobalContext must be used within a GlobalContextProvider");
    }

    const {fetchIsAdmin, isAdmin, OnShowModal} = globalContext;

    useEffect(() => {
        fetchIsAdmin();
    }, []);

    return (
        <MusicContextProvider>
                <Container className="music-page page">
                    {isAdmin && <Button
                        onClick={() => OnShowModal(<AddMusicPlatformModalContent/>)}
                    >
                        <FaPlusCircle className="me-2" />
                        Додати музичну платформу
                    </Button>}
                    <MusicPlatforms />
                    <SpotifyContainer />
                </Container>
        </MusicContextProvider>
    );
};

export { Music };
