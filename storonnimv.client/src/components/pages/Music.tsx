import {FC, useContext, useEffect} from "react";
import {MusicContextProvider} from "../contexts/MusicContext";
import {Container} from "react-bootstrap";
import {SoundCloudContainer} from "../elements/music/SoundCloudContainer";
import {MusicPlatforms} from "../elements/music/MusicPlatforms";
import {AddMusicPlatformButton} from "../elements/admin/AddsButtons/AddMusicPlatformButton";
import {GlobalContext} from "../contexts/shared/GlobalContext.tsx";

const Music: FC = () => {
    const globalContext = useContext(GlobalContext);

    if (!globalContext) {
        throw new Error("GlobalContext must be used within a GlobalContextProvider");
    }

    const {fetchIsAdmin, isAdmin} = globalContext;

    useEffect(() => {
        fetchIsAdmin();
    }, []);

    return (
        <MusicContextProvider>
            <div className='page-wrapper'>
                <Container className="music-page page">
                    {isAdmin && <AddMusicPlatformButton
                        apiUrl="/api/music/platform"
                        modalTitle="Додати музичну платформу"
                        buttonLabel="Додати платформу"
                    />}
                    <MusicPlatforms/>
                    <SoundCloudContainer/>
                </Container>
            </div>
        </MusicContextProvider>
    );
};

export {Music};
