import React, {FC} from "react";
import {NewsContextProvider} from "../contexts/NewsContext";
import {Container} from "react-bootstrap";
import {NewsList} from "../elements/news/NewsList";

const News: FC = () => {
    return (
        <NewsContextProvider>
            <Container>
                <NewsList />
            </Container>
        </NewsContextProvider>
    );
};

export {News};