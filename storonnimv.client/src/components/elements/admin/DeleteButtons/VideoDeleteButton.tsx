import { FC, useContext } from "react";
import { Button, Container } from "react-bootstrap";
import { GlobalContext } from "../../../contexts/shared/GlobalContext.tsx";
import { IVideoModel } from "../../../../models/video/IVideoModel.ts";
import { MdDeleteForever } from "react-icons/md";

interface VideoDeleteButtonProps {
    video: IVideoModel;
    apiUrl: string;
}

const VideoDeleteButton: FC<VideoDeleteButtonProps> = ({ video, apiUrl }) => {
    const globalContext = useContext(GlobalContext);

    if (!globalContext) return null;

    const { OnShowModal, OnHideModal, sendRequest } = globalContext;

    const handleDelete = async () => {
        try {
            const response = await sendRequest(`${apiUrl}/${video.id}`, "DELETE");

            if (response.status === 204) {
                console.log("Відео успішно видалено:", video);
                alert("Відео успішно видалено!");
                OnHideModal();
                window.location.reload();
            } else {
                alert("Помилка при видаленні відео.");
            }
        } catch (error) {
            console.error("Помилка при видаленні відео:", error);
            alert("Сталася помилка при видаленні відео.");
        }
    };

    const handleShowModal = () => {
        OnShowModal(
            <Container className="form-modal">
                <h2 className="form-modal__title">
                    Ви впевнені, що хочете видалити це відео?
                </h2>
                <Container className="form-modal__form">
                    <Button
                        variant="danger"
                        onClick={handleDelete}
                        className="form-modal__button form-modal__button--delete"
                    >
                        Так, видалити
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={OnHideModal}
                        className="form-modal__button form-modal__button--cancel"
                    >
                        Скасувати
                    </Button>
                </Container>
            </Container>
        );
    };

    return (
        <Button
            className="btn btn-danger position-absolute top-0 end-0 m-5"
            onClick={handleShowModal}
            title="Видалити відео"
        >
            <MdDeleteForever />
        </Button>
    );
};

export { VideoDeleteButton };
