import {Container} from 'react-bootstrap';
import {BrowserRouter as Router} from "react-router-dom";

import './styles/Shared/App.css';
import './styles/Shared/Scroll.css';

// Components
import {GlobalContextProvider} from "./components/contexts/Shared/GlobalContext";
import {Page} from "./components/pages/Shared/Page";
import {Footer} from "./components/elements/Shared/Footer";
import {Header} from "./components/elements/Shared/Header";

function App() {
    return (
        <GlobalContextProvider>
            <Container className='app-container' fluid>
                <Router>
                    <Header />
                    <Page />
                    <Footer />
                </Router>
            </Container>
        </GlobalContextProvider>
    );
}

export default App;
