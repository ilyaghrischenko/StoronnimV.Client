import {JSX, useContext} from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import {Page} from "./components/pages/shared/Page";
import {ModalWindow} from "./components/elements/shared/ModalWindow";
import {GlobalContext} from "./components/contexts/shared/GlobalContext.tsx";
import {HeaderWithFooter} from "./components/elements/shared/HeaderWithFooter.tsx";
import {ResolutionWrapper} from "./components/elements/shared/ResolutionWrapper.tsx";

function App(): JSX.Element {
    const globalContext = useContext(GlobalContext);

    if (!globalContext) {
        throw new Error("GlobalContext must be used within a GlobalContextProvider");
    }

    const {isAdminRoute} = globalContext;

    return (
        <ResolutionWrapper>
            <div className='border-wrapper'>
                <div className="app-container">
                    <Router>
                        <ModalWindow/>
                        <div className="app-container__left">
                            <div className="app-container__main">
                                <Page/>
                            </div>
                        </div>

                        {!isAdminRoute() && (
                            <div className="app-container__right">
                                <HeaderWithFooter/>
                            </div>
                        )}
                    </Router>
                </div>
            </div>
        </ResolutionWrapper>
    );

}

export default App;
