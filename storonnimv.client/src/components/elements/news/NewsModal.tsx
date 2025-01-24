import {FC, useContext, useEffect} from "react";
import {NewsContext} from "../../contexts/NewsContext.tsx";
import {Col, Container, Row, Image} from "react-bootstrap";
import {Loading} from "../shared/Loading.tsx";

interface NewsModalProps {
    newsId: number;
}

const NewsModal: FC<NewsModalProps> = ({newsId}) => {
    const newsContext = useContext(NewsContext);

    if (!newsContext) {
        throw new Error("NewsContext is not defined");
    }

    const {newsFullItem, fetchNewsFullItem, loading} = newsContext;

    useEffect(() => {
        fetchNewsFullItem(newsId);
    }, []);

    if (loading) {
        return <Loading/>;
    }

    return (
        <Container className="news-modal">
            <Row className="mb-3">
                <Col xs={12} className="text-center">
                    {newsFullItem.photo && <Image className="news-modal__photo" src={newsFullItem.photo}/>}
                    {newsFullItem.video && (
                        <video className="news-modal__video" src={newsFullItem.video} controls/>
                    )}
                </Col>
            </Row>
            <Row className="mb-3">
                <Col xs={12} className="news-modal__info">
                    <h1 className="news-modal__info-title">{newsFullItem.title}</h1>
                    <p className="news-modal__info-description">{newsFullItem.description}</p>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col xs={12} className="news-modal__details">
                    <p className="news-modal__details-date">{newsFullItem.date}</p>
                </Col>
            </Row>
        </Container>
    );
};

export {NewsModal};
