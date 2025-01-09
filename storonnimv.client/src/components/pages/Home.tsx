import {FC, useContext} from "react";
import {GlobalContext} from "../contexts/shared/GlobalContext";
import {HomeContextProvider} from "../contexts/HomeContext";
import {Container} from "react-bootstrap";

const Home: FC = () => {
    const globalContext = useContext(GlobalContext);

    if (!globalContext) {
        throw new Error("GlobalContext must be used within a GlobalContextProvider");
    }

    const {setBgImage, setHeaderTitle} = globalContext;

    return (
        <HomeContextProvider>
            <Container>
                <p>Home</p>
            </Container>
        </HomeContextProvider>
    );
};

export {Home};