import {FC, useContext, useEffect} from "react";
import {NewsContextProvider} from "../contexts/NewsContext";
import {Button, Container} from "react-bootstrap";
import {NewsList} from "../elements/news/NewsList";
import {GlobalContext} from "../contexts/shared/GlobalContext.tsx";
import {AddNewsItemModalContent} from "../elements/news/forms/AddNewsItemModalContent.tsx";
import { FaPlus } from "react-icons/fa";


const News: FC = () => {
    const globalContext = useContext(GlobalContext);

    if (!globalContext) {
        throw new Error("GlobalContext must be used within a GlobalContextProvider");
    }

    const {fetchIsAdmin, isAdmin, OnShowModal} = globalContext;

    useEffect(() => {
        fetchIsAdmin();
    }, []);

    return (
        <NewsContextProvider>
            <div className='page-wrapper'>
                <Container className="news-page page">
                    {isAdmin && <Button onClick={() => OnShowModal(<AddNewsItemModalContent/>)}>
                        <FaPlus/>
                    </Button>}
                    <NewsList/>
                </Container>
            </div>
        </NewsContextProvider>
    );
};

export {News};
