import { FC, useContext } from "react";
import { NewsContextProvider } from "../contexts/NewsContext";
import { Container } from "react-bootstrap";
import { NewsList } from "../elements/news/NewsList";
import { AddNewsButton } from "../elements/admin/AddsButtons/AddNewsButton";
import {GlobalContext} from "../contexts/shared/GlobalContext.tsx";

const News: FC = () => {
    const globalContext = useContext(GlobalContext);

    if (!globalContext) {
        throw new Error("GlobalContext must be used within a GlobalContextProvider");
    }

    const { isAdmin } = globalContext;

    return (
        <NewsContextProvider>
            <Container className="news-page page">
                {isAdmin && <AddNewsButton />}
                <NewsList />
            </Container>
        </NewsContextProvider>
    );
};

export { News };
