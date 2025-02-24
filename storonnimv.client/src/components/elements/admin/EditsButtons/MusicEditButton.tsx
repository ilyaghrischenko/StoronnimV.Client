import React, { useState, useContext, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { GlobalContext } from "../../../contexts/shared/GlobalContext.tsx";
import { IMusicPlatformItem } from "../../../../models/music/IMusicPlatformItem.ts";
import { FaEdit } from "react-icons/fa";

interface MusicEditButtonProps {
    item: IMusicPlatformItem;
}

const MusicEditButton: React.FC<MusicEditButtonProps> = ({ item }) => {
    const { OnShowModal, OnHideModal } = useContext(GlobalContext)!;
    const [editedItem, setEditedItem] = useState<IMusicPlatformItem>(item);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [bgImage, setBgImage] = useState<File | null>(null);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (token) {
            setIsAuthorized(true);
        } else {
            setIsAuthorized(false);
        }
    }, []);

    const handleSave = async () => {
        try {
            const formData = new FormData();
            if (bgImage) {
                formData.append("bgImage", bgImage);
            }
            formData.append("platformUrl", editedItem.platformUrl);
            console.log("Отправка данных: ", formData);
            OnHideModal();
        } catch (error) {
            console.error("Помилка при збереженні платформи:", error);
        }
    };

    const handleShowModal = () => {
        OnShowModal(
            <div>
                <Form>
                    <div className="d-flex align-items-center mb-3">
                        <Form.Label className="me-3" style={{ color: "white" }}>Зображення фону:</Form.Label>
                        <Form.Control
                            type="file"
                            onChange={(e) => {
                                const file = (e.target as HTMLInputElement).files?.[0] || null;
                                setBgImage(file);
                            }}
                            accept="image/*"
                            className="form-control"
                            style={{ color: "white", backgroundColor: "#333" }}
                        />
                    </div>

                    <div className="d-flex align-items-center mb-3">
                        <Form.Label className="me-3" style={{ color: "white" }}>Посилання на платформу:</Form.Label>
                        <Form.Control
                            type="text"
                            name="platformUrl"
                            value={editedItem.platformUrl}
                            onChange={(e) => setEditedItem({ ...editedItem, platformUrl: e.target.value })}
                            className="form-control"
                            style={{ color: "white", backgroundColor: "#333" }}
                        />
                    </div>

                    <Button onClick={handleSave} className="mt-3">Зберегти</Button>
                </Form>
            </div>
        );
    };

    if (!isAuthorized) {
        return null;
    }

    return (
        <>
            <Button
                className="btn btn-warning position-absolute top-0 end-0 m-2"
                onClick={handleShowModal}
                title="Редагувати"
            >
                <FaEdit />
            </Button>
        </>
    );
};

export { MusicEditButton };
