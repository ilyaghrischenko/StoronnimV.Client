import {FC, useContext, useEffect} from "react";
import {NewsContextProvider} from "../contexts/NewsContext";
import {Container} from "react-bootstrap";
import {NewsList} from "../elements/news/NewsList";
import {GlobalContext} from "../contexts/shared/GlobalContext.tsx";


const News: FC = () => {
    const globalContext = useContext(GlobalContext);

    if (!globalContext) {
        throw new Error("GlobalContext must be used within a GlobalContextProvider");
    }

    const {fetchIsAdmin} = globalContext;

    useEffect(() => {
        fetchIsAdmin();
    }, []);

    return (
        <NewsContextProvider>
                <Container className="page">

                    <NewsList/>
                </Container>
        </NewsContextProvider>
    );
};

export {News};
