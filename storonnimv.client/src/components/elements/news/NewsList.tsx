import { FC, useContext, useEffect } from "react";
import { NewsContext } from "../../contexts/NewsContext";
import { Container, ListGroup, Pagination } from "react-bootstrap";
import { NewsListItem } from "./NewsListItem";

// import "../../../styles/elements/news/NewsList.css";

const NewsList: FC = () => {
    const newsContext = useContext(NewsContext);

    if (!newsContext) {
        throw new Error("NewsContext must be used within a NewsContextProvider");
    }

    const { newsList, currentPage, totalPages, paginate } = newsContext;

    useEffect(() => {
        paginate(currentPage);
    }, []);

    return (
        <Container>
            <ListGroup className="news-list">
                {newsList.length > 0 ? (
                    newsList.map((item) => (
                        <NewsListItem newsItem={item} key={item.id} />
                    ))
                ) : (
                    <p>Новин поки нема</p>
                )}
            </ListGroup>

            {/* Элементы управления пагинацией */}
            <Container className="pagination">
                <Pagination>
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

export { NewsList };
