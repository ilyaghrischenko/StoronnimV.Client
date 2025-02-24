import { FC, useContext, useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { IGroupInfo } from "../../../../models/group/IGroupInfo.ts";
import { GlobalContext } from "../../../contexts/shared/GlobalContext.tsx";

interface GroupInfoEditButtonProps {
    groupInfo: IGroupInfo;
}

const GroupInfoEditButton: FC<GroupInfoEditButtonProps> = ({ groupInfo }) => {
    const [newDescription, setNewDescription] = useState(groupInfo.description);
    const [newPhoto, setNewPhoto] = useState<File | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const globalContext = useContext(GlobalContext);

    if (!globalContext) {
        return null;
    }

    const { OnShowModal, OnHideModal } = globalContext;

    useEffect(() => {
        // Проверяем наличие токена в sessionStorage
        const token = sessionStorage.getItem("token");
        setIsAuthenticated(!!token); // Если токен есть, то установим состояние в true
    }, []);

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewDescription(event.target.value);
    };

    const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setNewPhoto(event.target.files[0]);
        }
    };

    const handleSave = async () => {
        try {
            const formData = new FormData();
            formData.append("description", newDescription);
            if (newPhoto) {
                formData.append("photo", newPhoto);
            }

            const response = await fetch("/api/groupinfo", {
                method: "POST",
                body: formData
            });

            if (response.ok) {
                OnHideModal();
            } else {
                console.error("Ошибка при обновлении информации о группе.");
            }
        } catch (error) {
            console.error("Ошибка при отправке данных:", error);
        }
    };

    const openEditModal = () => {
        OnShowModal(
            <div>
                <h3>Редагування інформації про групу</h3>
                <Form>
                    <Form.Group controlId="groupDescription">
                        <Form.Label>Опис групи</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={newDescription}
                            onChange={handleDescriptionChange}
                            placeholder="Введіть новий опис групи"
                        />
                    </Form.Group>
                    <Form.Group controlId="groupPhoto">
                        <Form.Label>Фото</Form.Label>
                        <Form.Control
                            type="file"
                            onChange={handlePhotoChange}
                        />
                    </Form.Group>
                </Form>
                <Button variant="primary" onClick={handleSave}>Зберегти</Button>
            </div>
        );
    };

    if (!isAuthenticated) {
        return null;
    }

    return (
        <Button variant="primary" onClick={openEditModal}>
            <FaEdit />
        </Button>
    );
};

export { GroupInfoEditButton };
