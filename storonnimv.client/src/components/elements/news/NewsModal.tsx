// NewsModal.tsx
import {FC, useContext, useEffect} from "react";
import {GlobalContext} from "../../contexts/shared/GlobalContext.tsx";
import {NewsContext} from "../../contexts/NewsContext.tsx";
import {Col, Container, Row, Image, Button} from "react-bootstrap";
import {ModalLoading} from "../shared/ModalLoading.tsx";
import {NewsDeleteButton} from "../admin/DeleteButtons/NewsDeleteButton.tsx";
import {EditNewsItemModalContent} from "./forms/EditNewsItemModalContent.tsx";
import {FaEdit} from "react-icons/fa";

interface NewsModalProps {
    newsId?: number;
}

const NewsModal: FC<NewsModalProps> = ({newsId}) => {
    const newsContext = useContext(NewsContext);
    const globalContext = useContext(GlobalContext);

    if (!newsContext || !globalContext) {
        throw new Error("Context are not defined");
    }

    const {isAdmin, OnShowModal, modalLoading} = globalContext;
    const {newsFullItem, fetchNewsFullItem} = newsContext;

    useEffect(() => {
        if (newsId) {
            fetchNewsFullItem(newsId);
        }
    }, [newsId]);

    if (modalLoading) {
        return <ModalLoading/>;
    }

    return (
        <Container className="news-modal">
            <Row className="mb-3">
                <Col xs={12} className="text-center">
                    {newsFullItem?.photo && <Image className="news-modal__photo" src={newsFullItem.photo}/>}
                    {newsFullItem?.video && (
                        <video className="news-modal__video" src={newsFullItem.video} controls/>
                    )}
                </Col>
            </Row>
            <Row className="mb-3">
                <Col xs={12} className="news-modal__info">
                    <h1 className="news-modal__info-title">{newsFullItem?.title}</h1>
                    <p className="news-modal__info-description">{newsFullItem?.description}</p>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col xs={12} className="news-modal__details">
                    <p className="news-modal__details-date">{newsFullItem?.date}</p>
                </Col>
            </Row>

            {newsFullItem && isAdmin && (
                <Container className="d-flex justify-content-end gap-2">
                    <Button
                        className="btn btn-warning position-fixed bottom-0 right-0 m-3"
                        onClick={() => OnShowModal(<EditNewsItemModalContent newsItem={newsFullItem}/>)}
                    >
                        <FaEdit/>
                    </Button>
                    <NewsDeleteButton newsId={newsFullItem.id} apiUrl="https://localhost:44315/api/admin/news"/>
                </Container>
            )}


        </Container>
    );
};

export {NewsModal};
