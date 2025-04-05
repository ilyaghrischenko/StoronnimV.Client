import {FC, useContext} from "react";
import {Button} from "react-bootstrap";
import {GlobalContext} from "../../../contexts/shared/GlobalContext.tsx";

interface IScheduleDeleteModalProps {
    itemId: number;
}

const ScheduleDeleteModal: FC<IScheduleDeleteModalProps> = ({itemId}) => {
    const {OnHideModal, sendRequest} = useContext(GlobalContext)!;

    const handleDelete = async () => {
        try {
            const response = await sendRequest(
                `https://localhost:44315/api/admin/schedules/${itemId}`,
                'DELETE'
            );

            if (response.status === 204) {
                alert('афішу успішно видалено!');
                OnHideModal();
            } else {
                alert('афішу не видалено');
                OnHideModal();
            }
        } catch (error) {
            alert("Помилка при видаленні афіші");
        }
    };

    return (
        <>
            <p>Ви дійсно хочете видалити афішу?</p>
            <div className="d-flex justify-content-between">
                <Button variant="secondary" onClick={OnHideModal}>
                    Скасувати
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                    Видалити
                </Button>
            </div>
        </>
    )
        ;
};

export {ScheduleDeleteModal};