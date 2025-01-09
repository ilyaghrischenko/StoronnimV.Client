import {FC, useContext} from "react";
import {GlobalContext} from "../contexts/shared/GlobalContext";
import {MusicContextProvider} from "../contexts/MusicContext";
import {Container} from "react-bootstrap";

const Music: FC = () => {
    const globalContext = useContext(GlobalContext);

    if (!globalContext) {
        throw new Error("GlobalContext must be used within a GlobalContextProvider");
    }

    const {setBgImage, setHeaderTitle} = globalContext;

    return (
        <MusicContextProvider>
            <Container>
                <p>Music</p>
            </Container>
        </MusicContextProvider>
    );
};

export {Music};