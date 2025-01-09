import {FC} from "react";
import {MusicContextProvider} from "../contexts/MusicContext";
import {Container} from "react-bootstrap";

const Music: FC = () => {
    return (
        <MusicContextProvider>
            <Container>
                <p>Music</p>
            </Container>
        </MusicContextProvider>
    );
};

export {Music};