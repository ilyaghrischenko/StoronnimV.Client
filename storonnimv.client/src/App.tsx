import React, {JSX} from 'react';
import {GlobalContextProvider} from "./components/contexts/shared/GlobalContext";
import {Container} from "react-bootstrap";
import {BrowserRouter as Router} from "react-router-dom";
import {Header} from "./components/elements/shared/Header";
import {Page} from "./components/pages/shared/Page";
import {Footer} from "./components/elements/shared/Footer";

import './styles/shared/App.css';

function App() : JSX.Element {
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
