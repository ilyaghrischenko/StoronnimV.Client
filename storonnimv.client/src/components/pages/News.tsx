import React, {FC, useContext} from "react";
import {GlobalContext} from "../contexts/shared/GlobalContext";
import {NewsContextProvider} from "../contexts/NewsContext";
import {Container} from "react-bootstrap";

const News: FC = () => {
    const globalContext = useContext(GlobalContext);

    if (!globalContext) {
        throw new Error("GlobalContext must be used within a GlobalContextProvider");
    }

    const {setBgImage, setHeaderTitle} = globalContext;

    return (
        <NewsContextProvider>
            <Container>
                <p>News</p>
            </Container>
        </NewsContextProvider>
    );
};

export {News};