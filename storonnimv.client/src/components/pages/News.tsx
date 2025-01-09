import React, {FC} from "react";
import {NewsContextProvider} from "../contexts/NewsContext";
import {Container} from "react-bootstrap";

const News: FC = () => {
    return (
        <NewsContextProvider>
            <Container>
                <p>News</p>
            </Container>
        </NewsContextProvider>
    );
};

export {News};