import {FC, useContext} from "react";
import {GlobalContext} from "../../../contexts/shared/GlobalContext.tsx";
import {Button} from "react-bootstrap";

interface ISocialDeleteModalProps {
    itemId: number;
}

const SocialDeleteModal: FC<ISocialDeleteModalProps> = ({ itemId }) => {
    const {OnHideModal, sendRequest} = useContext(GlobalContext)!;

    const handleDelete = async () => {
        try {
            const response = await sendRequest(
                `https://localhost:44315/api/admin/socials/${itemId}`,
                'DELETE'
            );

            if (response.status === 204) {
                alert('Соціальну мережу успішно видалено');
                OnHideModal();
            } else {
                alert('Соціальну мережу не видалено');
            }
        } catch (error) {
            alert('Помилка при видаленні соціальної мережі');
        }
    };

    return (
        <>
            <p>Ви дійсно хочете видалити соціальну мережу?</p>
            <div className="d-flex justify-content-between">
                <Button variant="secondary" onClick={OnHideModal}>
                    Скасувати
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                    Видалити
                </Button>
            </div>
        </>
    );
};

export { SocialDeleteModal };