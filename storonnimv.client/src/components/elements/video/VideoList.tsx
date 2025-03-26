import { FC, useContext, useEffect } from "react";
import {Container, Pagination} from "react-bootstrap";
import { GlobalContext } from "../../contexts/shared/GlobalContext";
import { PageLoading } from "../shared/PageLoading";
import { List } from "../shared/GenericList/List";
import { ListItem } from "../shared/GenericList/ListItem";
import { VideoContext } from "../../contexts/VideoContext";
import { useParams } from "react-router-dom";
import { IVideoModel } from "../../../models/video/IVideoModel";
import { VideoListItem } from "./VideoListItem";

const VideoList: FC = () => {
    const { id } = useParams<{ id: string }>();

    const videoContext = useContext(VideoContext);
    const globalContext = useContext(GlobalContext);

    if (!id) {
        throw new Error("Video id must be provided");
    }
    if (!globalContext) {
        throw new Error("GlobalContext must be used within a GlobalContextProvider");
    }
    if (!videoContext) {
        throw new Error("VideoContext must be used within a VideoContextProvider");
    }

    const { videoList, currentPage, totalPages, paginate, loading } = videoContext;

    useEffect(() => {
        const savedPage = sessionStorage.getItem("videoCurrentPage");
        const page = savedPage ? Number(savedPage) : 1;

        paginate(id, page);
    }, []);

    if (loading) {
        return <PageLoading elementsCount={4}  columns={2} />;
    }

    return (
        <Container className="video-list-container">
            <List
                className="video-list"
                items={videoList}
                renderItem={(item: IVideoModel) => (
                    <ListItem
                        className="video-list__item"
                        item={item}
                        renderItem={(item: IVideoModel) => (
                            <VideoListItem videoItem={item} />
                        )}
                    />
                )}
            ></List>

            {/* Элементы управления пагинацией */}
            <Container>
                <Pagination className="video-list__pagination">
                    {/* Кнопка "Предыдущая страница" */}
                    <Pagination.Prev
                        className="video-list__pagination-item"
                        onClick={() => paginate(id, currentPage - 1)}
                        disabled={currentPage === 1}
                    />

                    {/* Кнопки с номерами страниц */}
                    {[...Array(totalPages)].map((_, index) => (
                        <Pagination.Item
                            key={index}
                            className="video-list__pagination-item"
                            onClick={() => paginate(id, index + 1)}
                            active={currentPage === index + 1}
                        >
                            {index + 1}
                        </Pagination.Item>
                    ))}

                    {/* Кнопка "Следующая страница" */}
                    <Pagination.Next
                        className="video-list__pagination-item"
                        onClick={() => paginate(id, currentPage + 1)}
                        disabled={currentPage === totalPages}
                    />
                </Pagination>
            </Container>
        </Container>
    );
};

export { VideoList };
