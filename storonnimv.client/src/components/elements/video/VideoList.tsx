import {FC, useContext, useEffect} from "react";
import {Container, Pagination} from "react-bootstrap";
import {GlobalContext} from "../../contexts/shared/GlobalContext";
import {Loading} from "../shared/Loading";
import {List} from "../shared/GenericList/List";
import {ListItem} from "../shared/GenericList/ListItem";
import {VideoContext} from "../../contexts/VideoContext";
import {useParams} from "react-router-dom";
import {IVideoModel} from "../../../models/video/IVideoModel";
import {VideoListItem} from "./VideoListItem";
import "../../../styles/elements/video/VideoList.css";

const VideoList: FC = () => {

    const {id} =  useParams<{id: string}>();

    const videoContext = useContext(VideoContext);
    const globalContext = useContext(GlobalContext);

    if (!id) {
        throw new Error("Video id must be provided");
    }
    if (!globalContext) {
        throw new Error("GlobalContext must be used within a GlobalContextProvider");
    }
    if (!videoContext) {
        throw new Error("NewsContext must be used within a NewsContextProvider");
    }


    const {videoList, currentPage, totalPages, paginate, loading} = videoContext;

    useEffect(() => {
        const savedPage = sessionStorage.getItem("currentPage");
        const page = savedPage ? Number(savedPage) : 1;

        paginate(id,page);
    }, []);

    if (loading) {
        return (
            <Loading/>
        );
    }

    return (
        <Container>

            <List
                className="video-list"
                items={videoList}
                renderItem={(item: IVideoModel) => (
                    <ListItem className="video-item"
                              item={item}
                              renderItem={(item: IVideoModel) =>
                                  <VideoListItem videoItem={item}/>}
                    />
                )}
            >
            </List>

            {/* Элементы управления пагинацией */}
            <Container className="pagination">
                <Pagination>
                    {/* Кнопка "Предыдущая страница" */}
                    <Pagination.Prev
                        onClick={() => paginate(id, currentPage - 1)}
                        disabled={currentPage === 1}
                    />

                    {/* Кнопки с номерами страниц */}
                    {[...Array(totalPages)].map((_, index) => (
                        <Pagination.Item
                            key={index}
                            onClick={() => paginate(id, index + 1)}
                            active={currentPage === index + 1}
                        >
                            {index + 1}
                        </Pagination.Item>
                    ))}

                    {/* Кнопка "Следующая страница" */}
                    <Pagination.Next
                        onClick={() => paginate(id, currentPage + 1)}
                        disabled={currentPage === totalPages}
                    />
                </Pagination>
            </Container>
        </Container>
    );
};

export {VideoList};