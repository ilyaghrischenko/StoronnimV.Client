import {FC, useContext, useEffect} from "react";
import {MusicContextProvider} from "../contexts/MusicContext";
import {Button, Container} from "react-bootstrap";
import {SoundCloudContainer} from "../elements/music/SoundCloudContainer";
import {MusicPlatforms} from "../elements/music/MusicPlatforms";
import {GlobalContext} from "../contexts/shared/GlobalContext.tsx";
import {AddMusicPlatformModal} from "../elements/music/forms/AddMusicPlatformModal.tsx";
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
                        onClick={() => OnShowModal(<AddMusicPlatformModal/>)}
                    >
                        <FaPlusCircle className="me-2" />
                        Додати музичну платформу
                    </Button>}
                    <SoundCloudContainer />
                    <MusicPlatforms />
                </Container>
        </MusicContextProvider>
    );
};

export { Music };
