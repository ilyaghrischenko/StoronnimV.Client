import { FC, useState, useContext } from "react";
import { Button } from "react-bootstrap";
import { GlobalContext } from "../../../contexts/shared/GlobalContext.tsx";
import { IMemberFullInfo } from "../../../../models/group/IMemberInfo.ts";
import { FaEdit } from "react-icons/fa";

interface GroupMemberEditButtonProps {
    item: IMemberFullInfo;
}

const GroupMemberEditButton: FC<GroupMemberEditButtonProps> = ({ item }) => {
    const { OnShowModal, OnHideModal, sendRequest } = useContext(GlobalContext)!;
    const [editedMember, setEditedMember] = useState<IMemberFullInfo>(item);
    
    const handleSave = async () => {
        try {
            const apiUrl = "/api/group/member"; 
            const response = await sendRequest(apiUrl, "PUT", editedMember);
            
            if (response.status === 200) {
                console.log("Учасник успешно обновлен:", editedMember);
                alert("Інформацію про учасника успішно оновлено!");
                OnHideModal(); 
            } else {
                alert("Помилка при оновленні інформації учасника.");
            }
        } catch (error) {
            console.error("Помилка при збереженні інформації про учасника групи:", error);
            alert("Помилка при збереженні даних.");
        }
    };

    const handleShowModal = () => {
        OnShowModal(
            <div>
                <label>Фото учасника:</label>
                <input
                    type="text"
                    name="photoUrl"
                    value={editedMember.member.photoUrl}
                    onChange={(e) => setEditedMember({ ...editedMember, member: { ...editedMember.member, photoUrl: e.target.value } })}
                    className="form-control"
                />
                <label>Повне ім’я:</label>
                <input
                    type="text"
                    name="fullName"
                    value={editedMember.member.fullName}
                    onChange={(e) => setEditedMember({ ...editedMember, member: { ...editedMember.member, fullName: e.target.value } })}
                    className="form-control"
                />
                <label>Опис:</label>
                <input
                    type="text"
                    name="description"
                    value={editedMember.member.description}
                    onChange={(e) => setEditedMember({ ...editedMember, member: { ...editedMember.member, description: e.target.value } })}
                    className="form-control"
                />
                <label>Роль:</label>
                <input
                    type="text"
                    name="role"
                    value={editedMember.member.role}
                    onChange={(e) => setEditedMember({ ...editedMember, member: { ...editedMember.member, role: e.target.value } })}
                    className="form-control"
                />
                <Button className="mt-3" onClick={handleSave}>Зберегти</Button>
            </div>
        );
    };

    return (
        <>
            <Button
                className="btn btn-warning position-absolute top-0 end-0 m-2"
                onClick={handleShowModal}
                title="Редагувати інформацію"
            >
                <FaEdit />
            </Button>
        </>
    );
};

export { GroupMemberEditButton };
