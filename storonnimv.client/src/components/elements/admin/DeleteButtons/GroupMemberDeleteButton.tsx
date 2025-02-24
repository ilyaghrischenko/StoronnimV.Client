import { FC, useContext } from "react";
import { Button } from "react-bootstrap";
import { GlobalContext } from "../../../contexts/shared/GlobalContext.tsx";
import { IMemberFullInfo } from "../../../../models/group/IMemberInfo.ts";
import { MdDeleteForever } from "react-icons/md";

interface GroupMemberDeleteButtonProps {
    item: IMemberFullInfo;
}

const GroupMemberDeleteButton: FC<GroupMemberDeleteButtonProps> = ({ item }) => {
    const { OnShowModal, OnHideModal, sendRequest } = useContext(GlobalContext)!;

    const handleDelete = async () => {
        try {
            const apiUrl = `/api/group/member/${item.member.id}`;
            const response = await sendRequest(apiUrl, "DELETE");

            if (response.status === 200) {
                console.log("Учасника успішно видалено:", item);
                alert("Учасника групи успішно видалено!");
                OnHideModal();
            } else {
                alert("Помилка при видаленні учасника.");
            }
        } catch (error) {
            console.error("Помилка при видаленні учасника групи:", error);
            alert("Помилка при видаленні.");
        }
    };

    const handleShowModal = () => {
        OnShowModal(
            <div>
                <p style={{ color: "white" }}>
                    Ви впевнені, що хочете видалити цього учасника групи?
                </p>
                <Button variant="danger" onClick={handleDelete} className="me-2">
                    Так, видалити
                </Button>
                <Button variant="secondary" onClick={OnHideModal}>
                    Скасувати
                </Button>
            </div>,
        );
    };

    return (
        <>
            <Button
                className="btn btn-danger position-absolute top-0 end-0 m-5"
                onClick={handleShowModal}
                title="Видалити учасника"
            >
                <MdDeleteForever />
            </Button>
        </>
    );
};

export { GroupMemberDeleteButton };
