import {useContext} from "react";
import {Container} from "react-bootstrap";

import {GlobalContext} from "../contexts/Shared/GlobalContext";
import {NewsContextProvider} from "../contexts/NewsContext";
import {NewsList} from "../elements/News/NewsList";

const News = () => {
    const {setBgImage, setHeaderTitle} = useContext(GlobalContext);
    setBgImage('photo.jpg');
    setHeaderTitle('Новини');
    
    return (
        <NewsContextProvider>
            <Container>
                <NewsList />
            </Container>
        </NewsContextProvider>
    );
};

export {News};