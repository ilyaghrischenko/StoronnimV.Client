import {JSX, useContext} from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import {Header} from "./components/elements/shared/Header";
import {Page} from "./components/pages/shared/Page";
// import {Footer} from "./components/elements/shared/Footer";
import {ModalWindow} from "./components/elements/shared/ModalWindow";
import {GlobalContext} from "./components/contexts/shared/GlobalContext.tsx";

function App(): JSX.Element {
    const globalContext = useContext(GlobalContext);

    if (!globalContext) {
        throw new Error("GlobalContext must be used within a GlobalContextProvider");
    }

    const {isAdminRoute} = globalContext;

    return (
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
                            <Header/>
                        </div>
                    )}
                </Router>
            </div>
        </div>
    );

}

export default App;
