import {FC} from "react";
import {NewsContextProvider} from "../contexts/NewsContext";
import {Container} from "react-bootstrap";
import {NewsList} from "../elements/news/NewsList";
import {AddContentButton} from "../buttons/AddContentButton";

const News: FC = () => {
    const token = sessionStorage.getItem("token");

    return (
        <NewsContextProvider>
            <Container className="news-page page">
                {token && (
                    <AddContentButton
                        apiUrl="/api/news"
                        modalTitle="Новость"
                        buttonLabel="Добавить новость"
                    />
                )}
                <NewsList />
            </Container>
        </NewsContextProvider>
    );
};

export {News};
