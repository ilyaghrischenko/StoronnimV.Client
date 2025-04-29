// NewsModal.tsx
import {FC, useContext, useEffect} from "react";
import {GlobalContext} from "../../contexts/shared/GlobalContext.tsx";
import {NewsContext} from "../../contexts/NewsContext.tsx";
import {Container, Image, Button} from "react-bootstrap";
import {ModalLoading} from "../shared/ModalLoading.tsx";
import {EditNewsItemModal} from "./forms/EditNewsItemModal.tsx";
import {FaEdit, FaTrash} from "react-icons/fa";
import {DeleteNewsItemModal} from "./forms/DeleteNewsItemModal.tsx";

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
            <h1 className="news-modal__title main-text">{newsFullItem?.title}</h1>

            //TODO: отступы сделать от фотки ровные
            <div>
                {newsFullItem?.photo && <Image className="news-modal__photo" src={newsFullItem.photo}/>}
                <p
                    className="news-modal__description secondary-text"
                    style={{textAlign: `${newsFullItem?.photo ? 'left' : 'center'}`}}
                >
                    {newsFullItem?.description}
                </p>
            </div>

            <div className="news-modal__info">
                {newsFullItem?.video && (
                    <video className="news-modal__video" src={newsFullItem.video} controls preload='auto'/>
                )}
            </div>

            <div className="news-modal__details">
                <p className="news-modal__details-date">{newsFullItem?.date}</p>
            </div>

            {newsFullItem && isAdmin && (
                <Container className="d-flex justify-content-end gap-2">
                    <Button
                        className="btn btn-warning position-fixed bottom-0 right-0 m-3"
                        onClick={() => OnShowModal(<EditNewsItemModal newsItem={newsFullItem}/>)}
                    >
                        <FaEdit/>
                    </Button>
                    <Button
                        className="btn btn-warning position-fixed bottom-0 right-0 m-3"
                        onClick={() => OnShowModal(<DeleteNewsItemModal newsItem={newsFullItem}/>)}
                    >
                        <FaTrash/>
                    </Button>
                </Container>
            )}
        </Container>
    );
};

export {NewsModal};
