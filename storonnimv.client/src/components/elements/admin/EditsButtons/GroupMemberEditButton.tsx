import {FC, useState, useContext} from "react";
import {Button, Form} from "react-bootstrap";
import {GlobalContext} from "../../../contexts/shared/GlobalContext.tsx";
import {IMemberFullInfo} from "../../../../models/group/IMemberInfo.ts";
import {FaEdit} from "react-icons/fa";

interface GroupMemberEditButtonProps {
    item: IMemberFullInfo;
}

const GroupMemberEditButton: FC<GroupMemberEditButtonProps> = ({item}) => {
    const {OnShowModal, OnHideModal, sendRequest} = useContext(GlobalContext)!;
    const [editedMember, setEditedMember] = useState<IMemberFullInfo>(item);
    const [photo, setPhoto] = useState<File | null>(null);

    const handleSave = async () => {
        try {
            const formData = new FormData();
            if (photo) {
                formData.append("photo", photo);
            }
            formData.append("fullName", editedMember.member.fullName);
            formData.append("description", editedMember.member.description);
            formData.append("role", editedMember.member.role);

            const apiUrl = "/api/group/member";
            const response = await sendRequest(apiUrl, "PUT", formData);

            if (response.status === 200) {
                alert("Інформацію про учасника успішно оновлено!");
                OnHideModal();
            } else {
                alert("Помилка при оновленні інформації учасника.");
            }
        } catch (error) {
            alert("Помилка при збереженні даних.");
        }
    };

    const handleShowModal = () => {
        OnShowModal(
            <div>
                <Form>
                    <div className="d-flex align-items-center mb-3">
                        <Form.Label className="me-3" style={{color: "white"}}>Фото учасника:</Form.Label>
                        <Form.Control
                            type="file"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                const file = e.target.files ? e.target.files[0] : null;
                                setPhoto(file);
                            }}
                            accept="image/*"
                            className="form-control"
                            style={{color: "white", backgroundColor: "#333"}}
                        />
                    </div>

                    <div className="d-flex align-items-center mb-3">
                        <Form.Label className="me-3" style={{color: "white"}}>Повне ім’я:</Form.Label>
                        <Form.Control
                            type="text"
                            name="fullName"
                            value={editedMember.member.fullName}
                            onChange={(e) => setEditedMember({
                                ...editedMember,
                                member: {...editedMember.member, fullName: e.target.value}
                            })}
                            className="form-control"
                            style={{color: "white", backgroundColor: "#333"}}
                        />
                    </div>
                    <div className="d-flex align-items-center mb-3">
                        <Form.Label className="me-3" style={{color: "white"}}>Опис:</Form.Label>
                        <Form.Control
                            type="text"
                            name="description"
                            value={editedMember.member.description}
                            onChange={(e) => setEditedMember({
                                ...editedMember,
                                member: {...editedMember.member, description: e.target.value}
                            })}
                            className="form-control"
                            style={{color: "white", backgroundColor: "#333"}}
                        />
                    </div>
                    <div className="d-flex align-items-center mb-3">
                        <Form.Label className="me-3" style={{color: "white"}}>Роль:</Form.Label>
                        <Form.Control
                            type="text"
                            name="role"
                            value={editedMember.member.role}
                            onChange={(e) => setEditedMember({
                                ...editedMember,
                                member: {...editedMember.member, role: e.target.value}
                            })}
                            className="form-control"
                            style={{color: "white", backgroundColor: "#333"}}
                        />
                    </div>
                </Form>
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
                <FaEdit/>
            </Button>
        </>
    );
};

export {GroupMemberEditButton};
