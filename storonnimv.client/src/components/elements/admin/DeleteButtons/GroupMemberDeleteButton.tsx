import {FC, useContext} from "react";
import {Button} from "react-bootstrap";
import {GlobalContext} from "../../../contexts/shared/GlobalContext.tsx";
import {IMemberFullInfo} from "../../../../models/group/IMemberInfo.ts";
import {MdDeleteForever} from "react-icons/md";

interface GroupMemberDeleteButtonProps {
    item: IMemberFullInfo;
}

const GroupMemberDeleteButton: FC<GroupMemberDeleteButtonProps> = ({item}) => {
    const {OnShowModal, OnHideModal, sendRequest} = useContext(GlobalContext)!;

    const handleDelete = async () => {
        try {
            const response = await sendRequest(
                `https://localhost:44315/api/admin/group/members/${item.id}`,
                "DELETE"
            );

            if (response.status === 204) {
                console.log("Учасника успішно видалено:", item);
                alert("Учасника групи успішно видалено!");
            } else {
                alert("Помилка при видаленні учасника.");
            }
        } catch (error) {
            console.error("Помилка при видаленні учасника групи:", error);
            alert("Помилка при видаленні.");
        } finally {
            OnHideModal();
        }
    };

    const handleShowModal = () => {
        OnShowModal(
            <div className="form-modal">
                <h2 className="form-modal__title">Ви впевнені, що хочете видалити цей учасник?</h2>
                <div className="form-modal__form">
                    <Button onClick={handleDelete} className="form-modal__button form-modal__button--delete">
                        Так, видалити
                    </Button>
                    <Button onClick={OnHideModal} className="form-modal__button form-modal__button--cancel">
                        Скасувати
                    </Button>
                </div>
            </div>,
        );
    };

    return (
        <Button
            className="btn btn-danger position-absolute top-0 end-0 m-5"
            onClick={handleShowModal}
            title="Видалити учасника"
        >
            <MdDeleteForever/>
        </Button>
    );
};

export {GroupMemberDeleteButton};
