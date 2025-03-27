import React, { useState, useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { IMusicPlatformItem } from "../../../../models/music/IMusicPlatformItem.ts";
import { GlobalContext } from "../../../contexts/shared/GlobalContext.tsx";

interface MusicPlatformModalProps {
    apiUrl: string;
    modalTitle: string;
}

const MusicPlatformModal: React.FC<MusicPlatformModalProps> = ({ apiUrl, modalTitle }) => {
    const [platform, setPlatform] = useState<IMusicPlatformItem>({
        id: 0,
        bgImageUrl: "",
        platformUrl: "",
    });

    const [imageFile, setImageFile] = useState<File | null>(null);

    const globalContext = useContext(GlobalContext);

    if (!globalContext) {
        throw new Error("GlobalContext is not defined.");
    }

    const { sendRequest } = globalContext;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPlatform((prevPlatform) => ({
            ...prevPlatform,
            [name]: value,
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
        }
    };

    const handleSubmit = async () => {
        if (!imageFile) {
            alert("Будь ласка, завантажте зображення.");
            return;
        }

        const formData = new FormData();
        formData.append("platformUrl", platform.platformUrl);
        formData.append("bgImageUrl", imageFile);

        try {
            const response = await sendRequest(apiUrl, "POST", formData, {
                "Content-Type": "multipart/form-data",
            });

            if (response.status === 200) {
                alert("Музична платформа додана!");
                window.location.reload();
            } else {
                alert("Не вдалося додати платформу. Спробуйте ще раз.");
            }
        } catch (error) {
            console.error("Помилка при додаванні платформи:", error);
            alert("Щось пішло не так. Спробуйте ще раз.");
        }
    };

    return (
        <Modal.Dialog>
            <Modal.Header closeButton>
                <Modal.Title style={{ color: "white" }}>{modalTitle}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group controlId="platformUrl" className="mb-3">
                        <Form.Label style={{ color: "white" }} className="me-3">URL платформи: </Form.Label>
                        <Form.Control
                            type="text"
                            name="platformUrl"
                            value={platform.platformUrl}
                            onChange={handleInputChange}
                            placeholder="Введіть URL платформи"
                            style={{ color: "white", backgroundColor: "#333" }}
                        />
                    </Form.Group>

                    <Form.Group controlId="bgImageUrl" className="mb-3">
                        <Form.Label style={{ color: "white" }} className="me-3">Виберіть файл зображення: </Form.Label>
                        <div className="d-flex align-items-center">
                            <Button
                                variant="secondary"
                                onClick={() => document.getElementById("imageUpload")?.click()}
                                className="me-2"
                            >
                                Виберіть файл зображення
                            </Button>
                            <Form.Control
                                type="file"
                                accept="image/*"
                                id="imageUpload"
                                style={{ display: "none" }}
                                onChange={handleImageChange}
                            />
                        </div>
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="primary" onClick={handleSubmit} className="w-100">
                    Додати
                </Button>
            </Modal.Footer>
        </Modal.Dialog>
    );
};

export { MusicPlatformModal };
