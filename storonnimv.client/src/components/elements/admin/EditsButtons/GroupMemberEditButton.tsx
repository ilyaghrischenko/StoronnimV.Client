import React, {FC, useState, useContext} from "react";
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

    const handlePhotoChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        setPhoto: React.Dispatch<React.SetStateAction<File | null>>
    ) => {
        const file = e.target.files ? e.target.files![0] : null;
        setPhoto(file);
    };

    const handlePhotoEdit = async () => {
        try {
            if (!photo) {
                alert('Спочатку оберіть фото');
                return;
            }

            const formData = new FormData();
            formData.append("id", editedMember.id.toString());
            console.dir(photo);
            formData.append("photo", photo);

            const response = await sendRequest(
                "https://localhost:44315/api/admin/group-page/members/photo",
                "PATCH",
                formData
            );

            if (response.status === 204) {
                alert('Дані успішно змінено');
                OnHideModal();
            }
            else {
                alert('Сталася помилка при зміні');
            }
        } catch (error) {
            alert("Помилка при збереженні даних.");
        }
    };

    const handleEdit = async () => {
        try {
            const formData = new FormData();
            formData.append("id", editedMember.id.toString());
            formData.append("fullName", editedMember.fullName);
            formData.append("description", editedMember.description);
            formData.append("role", editedMember.role);

            const response = await sendRequest(
                "https://localhost:44315/api/admin/group-pages/members",
                "PATCH",
                formData,
                {"Content-Type": "application/json"}
            );

            if (response.status === 204) {
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
                        <input
                            type="file"
                            onChange={(e) => handlePhotoChange(e, setPhoto)}
                            accept="image/*"
                            className="form-control"
                            style={{color: "white", backgroundColor: "#333"}}
                        />
                    </div>

                    <Button className="mt-3" onClick={handlePhotoEdit}>Змінити фото</Button>
                </Form>

                <Form>
                    <div className="d-flex align-items-center mb-3">
                        <Form.Label className="me-3" style={{color: "white"}}>Повне ім’я:</Form.Label>
                        <Form.Control
                            type="text"
                            name="fullName"
                            value={editedMember.fullName}
                            onChange={(e) => setEditedMember({
                                ...editedMember,
                                fullName: e.target.value
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
                            value={editedMember.description}
                            onChange={(e) => setEditedMember({
                                ...editedMember,
                                description: e.target.value
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
                            value={editedMember.role}
                            onChange={(e) => setEditedMember({
                                ...editedMember,
                                role: e.target.value
                            })}
                            className="form-control"
                            style={{color: "white", backgroundColor: "#333"}}
                        />
                    </div>
                </Form>
                <Button className="mt-3" onClick={handleEdit}>Змінити</Button>
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
