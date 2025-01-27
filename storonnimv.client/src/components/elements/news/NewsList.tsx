import {FC, useContext, useEffect} from "react";
import {NewsContext, NewsContextProvider} from "../../contexts/NewsContext";
import {Container, Pagination} from "react-bootstrap";
import {NewsListItem} from "./NewsListItem";
import {PageLoading} from "../shared/PageLoading";

import {List} from "../shared/GenericList/List";
import {ListItem} from "../shared/GenericList/ListItem";
import {INewsShortItem} from "../../../models/news/INewsShortItem";
import {GlobalContext} from "../../contexts/shared/GlobalContext";
import {NewsModal} from "./NewsModal.tsx";

const NewsList: FC = () => {
    const newsContext = useContext(NewsContext);
    const globalContext = useContext(GlobalContext);

    if (!globalContext) {
        throw new Error("GlobalContext must be used within a GlobalContextProvider");
    }
    if (!newsContext) {
        throw new Error("NewsContext must be used within a NewsContextProvider");
    }

    const {OnShowModal} = globalContext;

    const {newsList, currentPage, totalPages, paginate, loading} = newsContext;

    useEffect(() => {
        const savedPage = sessionStorage.getItem("newsCurrentPage");
        const page = savedPage ? Number(savedPage) : 1;

        paginate(page);
    }, []);

    if (loading) {
        return (
            <PageLoading/>
        );
    }

    return (
        <Container className='news-list'>
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

            {/* Элементы управления пагинацией */}
            <Container>
                <Pagination className="news-list__pagination">
                    {/* Кнопка "Предыдущая страница" */}
                    <Pagination.Prev
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                    />

                    {/* Кнопки с номерами страниц */}
                    {[...Array(totalPages)].map((_, index) => (
                        <Pagination.Item
                            key={index}
                            onClick={() => paginate(index + 1)}
                            active={currentPage === index + 1}
                        >
                            {index + 1}
                        </Pagination.Item>
                    ))}

                    {/* Кнопка "Следующая страница" */}
                    <Pagination.Next
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    />
                </Pagination>
            </Container>
        </Container>
    );
};

export {NewsList};
