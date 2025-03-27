import React, { FC, useContext, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { ModalLoading } from "../../shared/ModalLoading.tsx";
import { GlobalContext } from "../../../contexts/shared/GlobalContext.tsx";

interface ScheduleContentModalProps {
    apiUrl: string;
    modalTitle: string;
}

export interface ISchedule {
    id: number;
    photo: string;
    title: string;
    performanceDateTime: string;
    description: string;
    location: string;
    status: string;
}

const ScheduleContentModal: FC<ScheduleContentModalProps> = ({ apiUrl, modalTitle }) => {
    const globalContext = useContext(GlobalContext);

    if (!globalContext) {
        throw new Error("GlobalContext is not defined");
    }

    const { sendRequest } = globalContext;

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [performanceDateTime, setPerformanceDateTime] = useState<string>("");
    const [photo, setPhoto] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === "title") setTitle(value);
        else if (name === "description") setDescription(value);
        else if (name === "location") setLocation(value);
        else if (name === "performanceDateTime") setPerformanceDateTime(value);
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
        setLoading(true);

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("location", location);
        formData.append("status", "Active");  // Статус автоматически установлен как "active"
        formData.append("performanceDateTime", performanceDateTime);
        if (photo) formData.append("photo", photo);

        try {
            const response = await sendRequest(apiUrl, "POST", formData);
            if (response.status === 200) {
                alert(`${modalTitle} успішно додано!`);
                globalContext.OnHideModal();
            }
        } catch (error) {
            alert(`Помилка при додаванні ${modalTitle.toLowerCase()}`);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <ModalLoading />;

    return (
        <Container className="content-modal">
            <Row>
                <Col xs={12}>
                    <h2 className="text-center">{modalTitle}</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formTitle">
                            <Form.Label className="me-3" style={{ color: "white" }}>Заголовок: </Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={title}
                                onChange={handleChange}
                                placeholder={`Введіть заголовок ${modalTitle}`}
                                required
                                style={{ color: "white", backgroundColor: "#333" }}
                            />
                        </Form.Group>

                        <Form.Group controlId="formDescription" className="mt-3">
                            <Form.Label className="me-3" style={{ color: "white" }}>Опис: </Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="description"
                                value={description}
                                onChange={handleChange}
                                placeholder={`Введіть опис ${modalTitle}`}
                                required
                                style={{ color: "white", backgroundColor: "#333" }}
                            />
                        </Form.Group>

                        <Form.Group controlId="formLocation" className="mt-3">
                            <Form.Label className="me-3" style={{ color: "white" }}>Місце проведення: </Form.Label>
                            <Form.Control
                                type="text"
                                name="location"
                                value={location}
                                onChange={handleChange}
                                placeholder={`Введіть місце проведення ${modalTitle}`}
                                required
                                style={{ color: "white", backgroundColor: "#333" }}
                            />
                        </Form.Group>

                        <Form.Group controlId="formPerformanceDateTime" className="mt-3">
                            <Form.Label className="me-3" style={{ color: "white" }}>Дата та час проведення: </Form.Label>
                            <Form.Control
                                type="datetime-local"
                                name="performanceDateTime"
                                value={performanceDateTime}
                                onChange={handleChange}
                                required
                                style={{ color: "white", backgroundColor: "#333" }}
                            />
                        </Form.Group>

                        <Form.Group controlId="formPhoto" className="mt-3">
                            <Form.Label className="me-3" style={{ color: "white" }}>Фото: </Form.Label>
                            <div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    id="imageUpload"
                                    style={{ display: "none" }}
                                    onChange={handleFileChange}
                                />
                                <Button
                                    variant="secondary"
                                    onClick={() => document.getElementById("imageUpload")?.click()}
                                    className="me-2"
                                >
                                    Завантажити фото
                                </Button>
                                {photo && <span className="ms-2">{photo.name}</span>}
                            </div>
                        </Form.Group>

                        <Button variant="primary" type="submit" className="mt-3 w-100">
                            {modalTitle}
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export { ScheduleContentModal };
