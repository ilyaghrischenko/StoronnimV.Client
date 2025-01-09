import {FC} from "react";
import {HomeContextProvider} from "../contexts/HomeContext";
import {Container} from "react-bootstrap";

const Home: FC = () => {
    return (
        <HomeContextProvider>
            <Container>
                <p>Home</p>
            </Container>
        </HomeContextProvider>
    );
};

export {Home};