import React, { useRef, useContext } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { GlobalContext } from "../../../contexts/shared/GlobalContext.tsx";

interface AddMemberModalProps {
    modalTitle: string;
}

const AddMemberModal: React.FC<AddMemberModalProps> = ({ modalTitle }) => {
    const { sendRequest, OnHideModal, loading } = useContext(GlobalContext)!;

    // Создаём рефы для всех полей ввода
    const fullNameRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const roleRef = useRef<HTMLInputElement>(null);
    const photoRef = useRef<HTMLInputElement>(null);
    const newSocialLinkRef = useRef<HTMLInputElement>(null);

    const socialLinks = useRef<string[]>([]); // Для хранения ссылок на соцсети

    const handleAddSocialLink = () => {
        const newLink = newSocialLinkRef.current?.value;
        if (newLink) {
            socialLinks.current = [...socialLinks.current, newLink];
            if (newSocialLinkRef.current) newSocialLinkRef.current.value = ""; // Сброс поля ввода
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        //TODO: через юз реф
        try {
            const formData = new FormData();
            formData.append("fullName", fullNameRef.current?.value || "");
            formData.append("description", descriptionRef.current?.value || "");
            formData.append("role", roleRef.current?.value || "");
            socialLinks.current.forEach((link, index) =>
                formData.append(`socialLinks[${index}]`, link)
            );
            const photoFile = photoRef.current?.files ? photoRef.current.files[0] : null;
            if (photoFile) formData.append("photo", photoFile);

            const response = await sendRequest(
                "https://localhost:44315/api/admin/group/members",
                "POST",
                formData
            );

            if (response.status === 201) {
                alert("ДОДАНО");
            }

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
                                ref={fullNameRef}
                                type="text"
                                placeholder="Введіть повне ім'я"
                                required
                                style={{ color: "white", backgroundColor: "#333" }}
                            />
                        </Form.Group>

                        <Form.Group controlId="formDescription" className="mb-3">
                            <Form.Label style={{ color: "white" }} className="me-3">Опис: </Form.Label>
                            <Form.Control
                                ref={descriptionRef}
                                as="textarea"
                                rows={3}
                                placeholder="Введіть опис"
                                required
                                style={{ color: "white", backgroundColor: "#333" }}
                            />
                        </Form.Group>

                        <Form.Group controlId="formRole" className="mb-3">
                            <Form.Label style={{ color: "white" }} className="me-3">Роль: </Form.Label>
                            <Form.Control
                                ref={roleRef}
                                type="text"
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
                                    onClick={() => photoRef.current?.click()}
                                    className="me-2"
                                >
                                    Виберіть фото
                                </Button>
                                <span>{photoRef.current?.files?.[0]?.name || "Виберіть фото"}</span>
                                <Form.Control
                                    ref={photoRef}
                                    type="file"
                                    accept="image/*"
                                    style={{ display: "none" }}
                                />
                            </div>
                        </Form.Group>

                        <Form.Group controlId="formSocialLinks" className="mb-3">
                            <Form.Label style={{ color: "white" }} className="me-3">Посилання на соціальні мережі: </Form.Label>
                            <div className="d-flex">
                                <Form.Control
                                    ref={newSocialLinkRef}
                                    type="text"
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
                                {socialLinks.current.map((link, index) => (
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
