import { FC, useContext } from "react";
import { Button } from "react-bootstrap";
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

            if (response.status === 200) {
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
            <div>
                <p style={{ color: "white" }}>
                    Ви впевнені, що хочете видалити це відео?
                </p>
                <Button variant="danger" onClick={handleDelete} className="me-2">
                    Так, видалити
                </Button>
                <Button variant="secondary" onClick={OnHideModal}>
                    Скасувати
                </Button>
            </div>
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
