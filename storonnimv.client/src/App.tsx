import {JSX} from 'react';
import {Container} from "react-bootstrap";
import {BrowserRouter as Router} from "react-router-dom";
import {Header} from "./components/elements/shared/Header";
import {Page} from "./components/pages/shared/Page";
import {Footer} from "./components/elements/shared/Footer";
import {ModalWindow} from "./components/elements/shared/ModalWindow";

function App(): JSX.Element {
    return (
        <Container className='app-container' fluid>
            <ModalWindow/>
            <Router>
                <Header/>
                <Page/>
                <Footer/>
            </Router>
        </Container>
    );
}

export default App;
