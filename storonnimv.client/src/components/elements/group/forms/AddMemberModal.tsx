import React, { useState, useContext } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { GlobalContext } from "../../../contexts/shared/GlobalContext.tsx";

interface AddMemberModalProps {
    modalTitle: string;
}

const AddMemberModal: React.FC<AddMemberModalProps> = ({ modalTitle }) => {
    const { sendRequest, OnHideModal, loading } = useContext(GlobalContext)!;

    const [fullName, setFullName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [role, setRole] = useState<string>("");
    const [socialLinks, setSocialLinks] = useState<string[]>([]);
    const [newSocialLink, setNewSocialLink] = useState<string>("");
    const [photo, setPhoto] = useState<File | null>(null);
    const [photoName, setPhotoName] = useState<string>("Виберіть фото");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === "fullName") setFullName(value);
        else if (name === "description") setDescription(value);
        else if (name === "role") setRole(value);
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setPhoto(e.target.files[0]);
            setPhotoName(e.target.files[0].name);
        }
    };

    const handleAddSocialLink = () => {
        if (newSocialLink) {
            setSocialLinks([...socialLinks, newSocialLink]);
            setNewSocialLink("");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("fullName", fullName);
            formData.append("description", description);
            formData.append("role", role);
            socialLinks.forEach((link, index) => formData.append(`socialLinks[${index}]`, link));
            if (photo) formData.append("photo", photo);

            const response = await sendRequest("/api/members", "POST", formData, {
                "Content-Type": "multipart/form-data",
            });

            console.log(response);
            OnHideModal();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container>
            <Row>
                <Col xs={12}>
                    <h2>{modalTitle}</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formFullName" className="mb-3">
                            <Form.Label style={{ color: "white" }} className="me-3">ПІБ: </Form.Label>
                            <Form.Control
                                type="text"
                                name="fullName"
                                value={fullName}
                                onChange={handleChange}
                                placeholder="Введіть повне ім'я"
                                required
                                style={{ color: "white", backgroundColor: "#333" }}
                            />
                        </Form.Group>

                        <Form.Group controlId="formDescription" className="mb-3">
                            <Form.Label style={{ color: "white" }} className="me-3">Опис: </Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="description"
                                value={description}
                                onChange={handleChange}
                                placeholder="Введіть опис"
                                required
                                style={{ color: "white", backgroundColor: "#333" }}
                            />
                        </Form.Group>

                        <Form.Group controlId="formRole" className="mb-3">
                            <Form.Label style={{ color: "white" }} className="me-3">Роль: </Form.Label>
                            <Form.Control
                                type="text"
                                name="role"
                                value={role}
                                onChange={handleChange}
                                placeholder="Введіть роль"
                                required
                                style={{ color: "white", backgroundColor: "#333" }}
                            />
                        </Form.Group>

                        <Form.Group controlId="formPhoto" className="mb-3">
                            <Form.Label style={{ color: "white" }} className="me-3">Фото учасника: </Form.Label>
                            <div className="d-flex align-items-center">
                                <Button
                                    variant="secondary"
                                    onClick={() => document.getElementById("photoUpload")?.click()}
                                    className="me-2"
                                >
                                    Виберіть фото
                                </Button>
                                <span>{photoName}</span>
                                <Form.Control
                                    type="file"
                                    id="photoUpload"
                                    accept="image/*"
                                    onChange={handlePhotoChange}
                                    style={{ display: "none" }}
                                />
                            </div>
                        </Form.Group>

                        <Form.Group controlId="formSocialLinks" className="mb-3">
                            <Form.Label style={{ color: "white" }} className="me-3">Посилання на соціальні мережі: </Form.Label>
                            <div className="d-flex">
                                <Form.Control
                                    type="text"
                                    value={newSocialLink}
                                    onChange={(e) => setNewSocialLink(e.target.value)}
                                    placeholder="Введіть посилання на соціальну мережу"
                                    style={{ color: "white", backgroundColor: "#333" }}
                                />
                                <Button
                                    variant="secondary"
                                    onClick={handleAddSocialLink}
                                    className="ms-2"
                                >
                                    Додати посилання
                                </Button>
                            </div>
                            <ul>
                                {socialLinks.map((link, index) => (
                                    <li key={index} style={{ color: "white" }}>{link}</li>
                                ))}
                            </ul>
                        </Form.Group>

                        <Button variant="primary" type="submit" className="mt-3 w-100" disabled={loading}>
                            {loading ? "Завантаження..." : modalTitle}
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export { AddMemberModal };
