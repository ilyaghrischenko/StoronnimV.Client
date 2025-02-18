import {FC, useContext, useEffect} from "react";
import {GlobalContext} from "../../contexts/shared/GlobalContext.tsx"; 
import {NewsContext} from "../../contexts/NewsContext.tsx";
import {Col, Container, Row, Image} from "react-bootstrap";
import {ModalLoading} from "../shared/ModalLoading.tsx";

interface NewsModalProps {
    newsId?: number;
}

const NewsModal: FC<NewsModalProps> = ({newsId}) => {
    const newsContext = useContext(NewsContext);
    const globalContext = useContext(GlobalContext); 

    if (!newsContext || !globalContext) {
        throw new Error("Contexts are not defined");
    }

    const {newsFullItem, fetchNewsFullItem, loading} = newsContext;
    const {OnShowModal} = globalContext;

    useEffect(() => {
        if (newsId) {
            fetchNewsFullItem(newsId); 
        }
    }, [newsId, fetchNewsFullItem]);

    // TODO: LOADING

    if (loading) {
        return <ModalLoading/>;
    }

    const handleShowModal = () => {
        OnShowModal(<NewsModal newsId={newsId} />); 
    };

    return (
        <Container className="news-modal">
            <Row className="mb-3">
                <Col xs={12} className="text-center">
                    {newsFullItem?.photo && <Image className="news-modal__photo" src={newsFullItem.photo} />}
                    {newsFullItem?.video && (
                        <video className="news-modal__video" src={newsFullItem.video} controls />
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
            <button onClick={handleShowModal}>Show in Modal</button>
        </Container>
    );
};

export {NewsModal};
