import React, {FC, useContext, useState} from "react";
import {Button, Form} from "react-bootstrap";
import {GlobalContext} from "../../../contexts/shared/GlobalContext.tsx";
import {IGroupPageFullInfo} from "../../../../models/group/IGroupInfo.ts";

interface IEditGroupModalProps {
    fullInfo: IGroupPageFullInfo;
}

const EditGroupModal: FC<IEditGroupModalProps> = ({ fullInfo }) => {
    const { OnHideModal, sendRequest } = useContext(GlobalContext)!;

    const [description, setDescription] = useState<string>(fullInfo.groupPage.description);
    const [photo, setPhoto] = useState<File>({} as File);

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPhoto(file);
        }
    };

    const handleDescriptionChange = async () => {
        try {
            const formData = new FormData();
            formData.append("id", fullInfo.groupPage.id.toString());
            formData.append("description", description);

            const response = await sendRequest(
                "https://localhost:44315/api/admin/group-pages",
                "PATCH",
                formData,
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

    const handlePhotoChange = async () => {
        try {
            const formData = new FormData();
            formData.append("id", fullInfo.groupPage.id.toString());
            formData.append("photo", photo);

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

    return (
        <div>
            <h3>Редагування інформації про групу</h3>
            <Form onSubmit={(e) => {
                e.preventDefault();
                handleDescriptionChange();
            }}>
                <div className="d-flex align-items-center mb-3">
                    <Form.Label className="me-3" style={{ color: "white" }}>Опис групи:</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        id="descriptionInput"
                        value={description}
                        required
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Введіть новий опис групи"
                        style={{ color: "white", backgroundColor: "#333" }}
                    />
                </div>
                <Button type="submit" variant="primary">Зберегти опис</Button>
            </Form>
            <Form onSubmit={(e) => {
                e.preventDefault();
                handlePhotoChange();
            }}>
                <div className="d-flex align-items-center mb-3">
                    <Form.Label className="me-3" style={{ color: "white" }}>Фото:</Form.Label>
                    <Form.Control
                        type="file"
                        accept="image/*"
                        required
                        onChange={handlePhotoUpload}
                        style={{ color: "white", backgroundColor: "#333" }}
                    />
                </div>
                <Button type="submit" variant="primary">Зберегти фото</Button>
            </Form>
        </div>
    );
};

export { EditGroupModal };