import React, {useContext, useState} from "react";
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
    const [photo, setPhoto] = useState<File>({} as File);

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPhoto(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("fullName", fullName);
            formData.append("description", description);
            formData.append("role", role);
            formData.append("photoUrl", photo);

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
                                type="text"
                                placeholder="Введіть повне ім'я"
                                required
                                onChange={e => setFullName(e.target.value)}
                                style={{ color: "white", backgroundColor: "#333" }}
                            />
                        </Form.Group>

                        <Form.Group controlId="formDescription" className="mb-3">
                            <Form.Label style={{ color: "white" }} className="me-3">Опис: </Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Введіть опис"
                                required
                                onChange={e => setDescription(e.target.value)}
                                style={{ color: "white", backgroundColor: "#333" }}
                            />
                        </Form.Group>

                        <Form.Group controlId="formRole" className="mb-3">
                            <Form.Label style={{ color: "white" }} className="me-3">Роль: </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Введіть роль"
                                required
                                onChange={e => setRole(e.target.value)}
                                style={{ color: "white", backgroundColor: "#333" }}
                            />
                        </Form.Group>

                        <Form.Group controlId="formPhoto" className="mb-3">
                            <Form.Label style={{ color: "white" }} className="me-3">Фото учасника: </Form.Label>
                            <div className="d-flex align-items-center">
                                {/*<Button*/}
                                {/*    variant="secondary"*/}
                                {/*    onClick={() => photoRef.current?.click()}*/}
                                {/*    className="me-2"*/}
                                {/*>*/}
                                {/*    Виберіть фото*/}
                                {/*</Button>*/}
                                {/*<span>{photoRef.current?.files?.[0]?.name || "Виберіть фото"}</span>*/}
                                <Form.Control
                                    type="file"
                                    accept="image/*"
                                    required
                                    onChange={handlePhotoUpload}
                                    style={{color: "white"}}
                                />
                            </div>
                        </Form.Group>

                        {/*<Form.Group controlId="formSocialLinks" className="mb-3">*/}
                        {/*    <Form.Label style={{ color: "white" }} className="me-3">Посилання на соціальні мережі: </Form.Label>*/}
                        {/*    <div className="d-flex">*/}
                        {/*        <Form.Control*/}
                        {/*            ref={newSocialLinkRef}*/}
                        {/*            type="text"*/}
                        {/*            placeholder="Введіть посилання на соціальну мережу"*/}
                        {/*            style={{ color: "white", backgroundColor: "#333" }}*/}
                        {/*        />*/}
                        {/*        <Button*/}
                        {/*            variant="secondary"*/}
                        {/*            onClick={handleAddSocialLink}*/}
                        {/*            className="ms-2"*/}
                        {/*        >*/}
                        {/*            Додати посилання*/}
                        {/*        </Button>*/}
                        {/*    </div>*/}
                        {/*    <ul>*/}
                        {/*        {socialLinks.current.map((link, index) => (*/}
                        {/*            <li key={index} style={{ color: "white" }}>{link}</li>*/}
                        {/*        ))}*/}
                        {/*    </ul>*/}
                        {/*</Form.Group>*/}

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
