import React, {FC, useContext, useState} from "react";
import {Button, Form} from "react-bootstrap";
import {IMemberFullInfo} from "../../../../models/group/IMemberInfo.ts";
import {GlobalContext} from "../../../contexts/shared/GlobalContext.tsx";

interface IEditMemberModalProps {
    item: IMemberFullInfo;
}

const EditMemberModal: FC<IEditMemberModalProps> = ({ item }) => {
    const { OnHideModal, sendRequest } = useContext(GlobalContext)!;

    const [fullName, setFullName] = useState<string>(item.fullName);
    const [description, setDescription] = useState<string>(item.description);
    const [role, setRole] = useState<string>(item.role);
    const [photo, setPhoto] = useState<File>({} as File);

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPhoto(file);
        }
    };

    const handlePhotoEdit = async () => {
        try {
            if (!photo) {
                alert("Спочатку оберіть фото");
                return;
            }

            const formData = new FormData();
            formData.append("id", item.id.toString());
            formData.append("photo", photo);

            const response = await sendRequest(
                "https://localhost:44315/api/admin/group-page/members/photo",
                "PATCH",
                formData
            );

            if (response.status === 204) {
                alert("Дані успішно змінено");
                OnHideModal();
            } else {
                alert("Сталася помилка при зміні");
            }
        } catch (error) {
            alert("Помилка при збереженні даних.");
        }
    };

    const handleEdit = async () => {
        try {
            const formData = new FormData();
            formData.append("id", item.id.toString());
            formData.append("fullName", fullName);
            formData.append("description", description);
            formData.append("role", role);

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

    return (
        <div>
            <Form onSubmit={(e) => {
                e.preventDefault();
                handlePhotoEdit();
            }}>
                <div className="d-flex align-items-center mb-3">
                    <Form.Label className="me-3" style={{ color: "white" }}>
                        Фото учасника:
                    </Form.Label>
                    <Form.Control
                        type="file"
                        accept="image/*"
                        className="form-control"
                        required
                        onChange={handlePhotoUpload}
                        style={{ color: "white", backgroundColor: "#333" }}
                    />
                </div>

                <Button type="submit" className="mt-3">
                    Змінити фото
                </Button>
            </Form>
            <Form onSubmit={(e) => {
                e.preventDefault();
                handleEdit();
            }}>
                <div className="d-flex align-items-center mb-3">
                    <Form.Label className="me-3" style={{ color: "white" }}>
                        Повне ім’я:
                    </Form.Label>
                    <Form.Control
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="form-control"
                        style={{ color: "white", backgroundColor: "#333" }}
                    />
                </div>
                <div className="d-flex align-items-center mb-3">
                    <Form.Label className="me-3" style={{ color: "white" }}>
                        Опис:
                    </Form.Label>
                    <Form.Control
                        type="text"
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="form-control"
                        style={{ color: "white", backgroundColor: "#333" }}
                    />
                </div>
                <div className="d-flex align-items-center mb-3">
                    <Form.Label className="me-3" style={{ color: "white" }}>
                        Роль:
                    </Form.Label>
                    <Form.Control
                        type="text"
                        required
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="form-control"
                        style={{ color: "white", backgroundColor: "#333" }}
                    />
                </div>

                <Button type="submit" className="mt-3">
                    Змінити
                </Button>
            </Form>
        </div>
    );
};

export {EditMemberModal};