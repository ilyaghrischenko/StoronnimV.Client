import React, { useState, useContext } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { GlobalContext } from "../../contexts/shared/GlobalContext.tsx";

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === "fullName") setFullName(value);
        else if (name === "description") setDescription(value);
        else if (name === "role") setRole(value);
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
            const response = await sendRequest("/api/members", "POST", { fullName, description, role, socialLinks });
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
                        <Form.Group controlId="formFullName">
                            <Form.Label>ПІБ</Form.Label>
                            <Form.Control
                                type="text"
                                name="fullName"
                                value={fullName}
                                onChange={handleChange}
                                placeholder="Введіть повне ім'я"
                                required
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
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formRole" className="mt-3">
                            <Form.Label>Роль</Form.Label>
                            <Form.Control
                                type="text"
                                name="role"
                                value={role}
                                onChange={handleChange}
                                placeholder="Введіть роль"
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formSocialLinks" className="mt-3">
                            <Form.Label>Посилання на соціальні мережі</Form.Label>
                            <div>
                                <input
                                    type="text"
                                    value={newSocialLink}
                                    onChange={(e) => setNewSocialLink(e.target.value)}
                                    placeholder="Введіть посилання на соціальну мережу"
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
                                    <li key={index}>{link}</li>
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
