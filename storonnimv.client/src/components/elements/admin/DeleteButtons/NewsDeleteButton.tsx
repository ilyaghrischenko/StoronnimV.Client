import { FC, useContext } from "react";
import { Button } from "react-bootstrap";
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
            if (response.status === 200) {
                OnHideModal();
                window.location.reload();
            } else {
                throw new Error("Помилка при видаленні новини");
            }
        } catch (error) {
            console.error("Помилка при видаленні новини:", error);
        }
    };

    const confirmDelete = () => {
        OnShowModal(
            <div>
                <p style={{ color: "white" }}>Ви впевнені, що хочете видалити цю новину?</p>
                <div className="d-flex justify-content-end">
                    <Button variant="secondary" className="me-2" onClick={OnHideModal}>
                        Скасувати
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Видалити
                    </Button>
                </div>
            </div>,
        );
    };

    const isUserAuthenticated = sessionStorage.getItem("token") !== null;
    if (!isUserAuthenticated) return null;

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
