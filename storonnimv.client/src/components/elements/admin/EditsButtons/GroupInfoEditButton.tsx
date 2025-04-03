import {FC, useContext, useState, ChangeEvent} from "react";
import { Button, Form } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { GlobalContext } from "../../../contexts/shared/GlobalContext.tsx";
import {GroupContext} from "../../../contexts/GroupContext.tsx";

const GroupInfoEditButton: FC = () => {
    const globalContext = useContext(GlobalContext);
    const groupContext = useContext(GroupContext);

    const [newDescription, setNewDescription] = useState<string>("");
    const [newPhoto, setNewPhoto] = useState<File | null>(null);

    if (!globalContext) {
        return null;
    }
    if (!groupContext) {
        return null;
    }

    const { OnShowModal, OnHideModal, sendRequest } = globalContext;
    const { fullInfo } = groupContext;

    const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setNewDescription(e.target.value);
    };

    const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setNewPhoto(event.target.files[0]);
        }
    };

    const changeDescription = async () => {
        try {
            const formData = new FormData();
            formData.append("id", fullInfo.groupPage.id.toString());
            formData.append("description", newDescription);

            //TODO: не приходит описание новое на сервер (не обновляется стейт)
            const response = await sendRequest(
                "https://localhost:44315/api/admin/group-pages",
                "PATCH",
                JSON.stringify({
                    id: fullInfo.groupPage.id,
                    description: newDescription
                }),
                { "Content-Type": "application/json" }
            );

            if (response.status === 204) {
                alert('ОПИС ГРУППИ УСПІШНО ЗМІНЕНИЙ');
                OnHideModal();
            } else {
                console.error("Ошибка при обновлении информации о группе.");
            }
        } catch (error) {
            console.error("Ошибка при отправке данных: ", error);
        }
    };

    const changePhoto = async () => {
        try {
            const formData = new FormData();
            formData.append("id", fullInfo.groupPage.id.toString());
            if (newPhoto) {
                formData.append("photo", newPhoto);
            }

            const response = await sendRequest(
                "https://localhost:44315/api/admin/group-page/photo",
                "PATCH",
                formData
            );

            if (response.status === 204) {
                alert('ФОТО ГРУППИ УСПІШНО ЗМІНЕНО');
                OnHideModal();
            } else {
                console.error("Ошибка при обновлении информации о группе.");
            }
        } catch (error) {
            console.error("Ошибка при изменении фото: ", error);
        }
    };

    const openEditModal = () => {
        OnShowModal(
            <div>
                <h3>Редагування інформації про групу</h3>
                <Form>
                    <div className="d-flex align-items-center mb-3">
                        <Form.Label className="me-3" style={{ color: "white" }}>Опис групи:</Form.Label>
                        <Form.Control
                            // as="textarea"
                            // rows={3}
                            type="text"
                            id="descriptionInput"
                            value={newDescription}
                            onChange={handleDescriptionChange}
                            placeholder="Введіть новий опис групи"
                            style={{ color: "white", backgroundColor: "#333" }}
                        />
                    </div>
                    <Button variant="primary" onClick={changeDescription}>Зберегти опис</Button>
                </Form>
                <Form>
                    <div className="d-flex align-items-center mb-3">
                        <Form.Label className="me-3" style={{ color: "white" }}>Фото:</Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoChange}
                            style={{ color: "white", backgroundColor: "#333" }}
                        />
                    </div>
                    <Button variant="primary" onClick={changePhoto}>Зберегти фото</Button>
                </Form>
            </div>
        );
    };

    return (
        <Button variant="primary" onClick={openEditModal}>
            <FaEdit />
        </Button>
    );
};

export { GroupInfoEditButton };
