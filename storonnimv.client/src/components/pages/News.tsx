import { FC } from "react";
import { NewsContextProvider } from "../contexts/NewsContext";
import { Container } from "react-bootstrap";
import { NewsList } from "../elements/news/NewsList";
import { AddNewsButton } from "../AddsButtons/AddNewsButton";

const News: FC = () => {
    const token = sessionStorage.getItem("token");

    return (
        <NewsContextProvider>
            <Container className="news-page page">
                {token && <AddNewsButton />}
                <NewsList />
            </Container>
        </NewsContextProvider>
    );
};

export { News };
