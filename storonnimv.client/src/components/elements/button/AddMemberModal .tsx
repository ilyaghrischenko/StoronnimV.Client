import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface AddMemberModalProps {
    show: boolean;
    onHide: () => void;
    sendRequest: (url: string, method: string, body: FormData) => Promise<any>;
}

const AddMemberModal: React.FC<AddMemberModalProps> = ({ show, onHide, sendRequest }) => {
    const [fullName, setFullName] = useState<string>("");
    const [role, setRole] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [photo, setPhoto] = useState<File | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === "fullName") setFullName(value);
        else if (name === "role") setRole(value);
        else if (name === "description") setDescription(value);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith("image/")) {
            setPhoto(file);
        } else {
            alert("Будь ласка, завантажте тільки зображення.");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!fullName || !role || !description) {
            alert("Будь ласка, заповніть усі поля.");
            return;
        }

        const formData = new FormData();
        formData.append("fullName", fullName);
        formData.append("role", role);
        formData.append("description", description);
        if (photo) formData.append("photo", photo);

        try {
            const response = await sendRequest("/api/groups/members", "POST", formData);
            if (response.status === 200) {
                alert("Учасник успішно доданий!");
                onHide();
            }
        } catch (error) {
            alert("Помилка при додаванні учасника.");
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Додати учасника</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formFullName">
                        <Form.Label>Повне ім'я</Form.Label>
                        <Form.Control
                            type="text"
                            name="fullName"
                            value={fullName}
                            onChange={handleChange}
                            placeholder="Введіть повне ім'я"
                        />
                    </Form.Group>

                    <Form.Group controlId="formRole" className="mt-3">
                        <Form.Label>Роль</Form.Label>
                        <Form.Control
                            type="text"
                            name="role"
                            value={role}
                            onChange={handleChange}
                            placeholder="Введіть роль учасника"
                        />
                    </Form.Group>

                    <Form.Group controlId="formDescription" className="mt-3">
                        <Form.Label>Опис</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="description"
                            value={description}
                            onChange={handleChange}
                            placeholder="Введіть опис"
                        />
                    </Form.Group>

                    <Form.Group controlId="formPhoto" className="mt-3">
                        <Form.Label>Фото</Form.Label>
                        <Form.Control
                            type="file"
                            name="photo"
                            onChange={handleFileChange}
                            accept="image/*"
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="mt-3">
                        Додати учасника
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export { AddMemberModal };
