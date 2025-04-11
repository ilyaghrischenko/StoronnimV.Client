import {FC, useContext, useEffect} from "react";
import {NewsContext, NewsContextProvider} from "../../contexts/NewsContext";
import {Button, Container} from "react-bootstrap";
import {NewsListItem} from "./NewsListItem";
import {PageLoading} from "../shared/PageLoading";

import {List} from "../shared/GenericList/List";
import {ListItem} from "../shared/GenericList/ListItem";
import {INewsShortItem} from "../../../models/news/INewsShortItem";
import {GlobalContext} from "../../contexts/shared/GlobalContext";
import {NewsModal} from "./NewsModal.tsx";
import {PaginationSection} from "../shared/PaginationSection.tsx";
import {AddNewsItemModalContent} from "./forms/AddNewsItemModalContent.tsx";
import {FaPlus} from "react-icons/fa";

const NewsList: FC = () => {
    const newsContext = useContext(NewsContext);
    const globalContext = useContext(GlobalContext);

    if (!globalContext) {
        throw new Error("GlobalContext must be used within a GlobalContextProvider");
    }
    if (!newsContext) {
        throw new Error("NewsContext must be used within a NewsContextProvider");
    }

    const {OnShowModal, isAdmin} = globalContext;

    const {newsList, currentPage, totalPages, paginate, loading} = newsContext;

    useEffect(() => {
        const savedPage = sessionStorage.getItem("newsCurrentPage");
        const page = savedPage ? Number(savedPage) : 1;

        paginate(page, 6);
    }, []);

    if (loading) {
        return (
            <PageLoading/>
        );
    }

    return (
        <Container className='news-list'>
            {isAdmin && <Button onClick={() => OnShowModal(<AddNewsItemModalContent/>)}>
                <FaPlus/>
            </Button>}
            <List
                className="news-list__items"
                items={newsList}
                renderItem={(item: INewsShortItem) => (
                    <ListItem item={item}
                              renderItem={(item: INewsShortItem) =>
                                  <NewsListItem key={item.id} newsItem={item}/>}
                              onClick={() => OnShowModal(
                                  <NewsContextProvider>
                                      <NewsModal newsId={item.id}/>
                                  </NewsContextProvider>)}
                    />
                )}
            >
            </List>

            <PaginationSection
                currentPage={currentPage}
                totalPages={totalPages}
                paginate={paginate}/>
        </Container>
    );
};

export {NewsList};
