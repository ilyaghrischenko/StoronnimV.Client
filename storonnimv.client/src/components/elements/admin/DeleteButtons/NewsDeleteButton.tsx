import { FC, useContext } from "react";
import {Button, Container} from "react-bootstrap";
import { GlobalContext } from "../../../contexts/shared/GlobalContext.tsx";
import { MdDeleteForever } from "react-icons/md";

interface NewsDeleteButtonProps {
    newsId: number;
    apiUrl: string;
}

const NewsDeleteButton: FC<NewsDeleteButtonProps> = ({ newsId, apiUrl }) => {
    const globalContext = useContext(GlobalContext);

    if (!globalContext) return null;

    const { sendRequest, OnShowModal, OnHideModal } = globalContext;

    const handleDelete = async () => {
        try {
            const response = await sendRequest(`${apiUrl}/${newsId}`, "DELETE");
            if (response.status === 204) {
                OnHideModal();
                window.location.reload();
            } else {
                alert("Error while deleting news");
            }
        } catch (error) {
            console.error("Помилка при видаленні новини:", error);
        }
    };

    const confirmDelete = () => {
        OnShowModal(
            <Container className="form-modal">
                <h2 className="form-modal__title">Ви впевнені, що хочете видалити цю новину?</h2>
                <Container className="form-modal__form">
                    <Button className="form-modal__button form-modal__button--cancel" onClick={OnHideModal}>
                        Скасувати
                    </Button>
                    <Button className="form-modal__button form-modal__button--confirm" onClick={handleDelete}>
                        Видалити
                    </Button>
                </Container>
            </Container>,
        );
    };

    return (
        <Button
            className="btn btn-danger position-absolute top-0 end-0 m-2"
            onClick={confirmDelete}
        >
            <MdDeleteForever />
        </Button>
    );
};

export { NewsDeleteButton };
