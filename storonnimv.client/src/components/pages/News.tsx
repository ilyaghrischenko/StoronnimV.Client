import {FC} from "react";
import {NewsContextProvider} from "../contexts/NewsContext";
import {Container} from "react-bootstrap";
import {NewsList} from "../elements/news/NewsList";

const News: FC = () => {
    return (
        <NewsContextProvider>
            <Container className='news-page page'>
                <NewsList />
            </Container>
        </NewsContextProvider>
    );
};

export {News};