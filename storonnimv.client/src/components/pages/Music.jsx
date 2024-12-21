import {useContext} from "react";
import {Container} from "react-bootstrap";

import {GlobalContext} from "../contexts/Shared/GlobalContext";
import {MusicContextProvider} from "../contexts/MusicContext";

const Music = () => {
    const {setBgImage, setHeaderTitle} = useContext(GlobalContext);
    setBgImage('photo.jpg');
    setHeaderTitle('Музика');
    
    return (
        <MusicContextProvider>
            <Container>
                <h1>MUSIC</h1>
            </Container>
        </MusicContextProvider>
    );
};

export { Music };