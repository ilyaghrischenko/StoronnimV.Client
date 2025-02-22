import { useContext, FC, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { GlobalContext } from "../contexts/shared/GlobalContext.tsx";
import { MdDeleteForever } from "react-icons/md";

interface ScheduleDeleteButtonProps {
    apiUrl: string;
    modalTitle: string;
    scheduleData: any; 
}

const ScheduleDeleteButton: FC<ScheduleDeleteButtonProps> = ({ apiUrl, modalTitle, scheduleData }) => {
    const context = useContext(GlobalContext);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [, setLoading] = useState<boolean>(false);

    if (!context) {
        return null;
    }

    const { sendRequest } = context;

    const handleClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleDelete = async () => {
        setLoading(true);

        try {
            const response = await sendRequest(`${apiUrl}/${scheduleData.id}`, "DELETE");
            if (response.status === 200) {
                alert(`${modalTitle} успішно видалено!`);
                handleCloseModal();
            }
        } catch (error) {
            alert(`Помилка при видаленні ${modalTitle.toLowerCase()}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button onClick={handleClick} variant="danger" className="position-absolute top-0 end-0 m-2">
                <MdDeleteForever />
            </Button>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Ви дійсно хочете видалити {modalTitle.toLowerCase()}?</p>
                    <div className="d-flex justify-content-between">
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Скасувати
                        </Button>
                        <Button variant="danger" onClick={handleDelete}>
                            Видалити
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export { ScheduleDeleteButton };
