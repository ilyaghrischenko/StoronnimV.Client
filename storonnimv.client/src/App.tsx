import {JSX, useContext} from 'react';
import {Container} from "react-bootstrap";
import {BrowserRouter as Router} from "react-router-dom";
import {Header} from "./components/elements/shared/Header";
import {Page} from "./components/pages/shared/Page";
import {Footer} from "./components/elements/shared/Footer";
import {ModalWindow} from "./components/elements/shared/ModalWindow";
import {GlobalContext} from "./components/contexts/shared/GlobalContext.tsx";

function App(): JSX.Element {
    const globalContext = useContext(GlobalContext);

    if (!globalContext) {
        throw new Error("GlobalContext must be used within a GlobalContextProvider");
    }

    const {isAdminRoute} = globalContext;

    return (
        <Container className='app-container' fluid>
            <ModalWindow/>
            <Router>
                {!isAdminRoute() && <Header/>}
                <Page/>
                {!isAdminRoute() && <Footer/>}
            </Router>
        </Container>
    );
}

export default App;
