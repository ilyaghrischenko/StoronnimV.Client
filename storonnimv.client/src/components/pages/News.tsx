import { FC, useContext } from "react";
import { NewsContextProvider } from "../contexts/NewsContext";
import { Container } from "react-bootstrap";
import { NewsList } from "../elements/news/NewsList";
import { AddNewsButton } from "../elements/admin/AddsButtons/AddNewsButton";
import {AdminContext} from "../contexts/AdminContext.tsx";

const News: FC = () => {
    const adminContext = useContext(AdminContext);

    if (!adminContext) {
        throw new Error("AdminContext must be used within a AdminContextProvider");
    }

    const { isAdmin } = adminContext;

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
