import React, { useContext, useState } from "react";
import { GlobalContext } from "../../../contexts/shared/GlobalContext.tsx";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { ModalLoading } from "../../shared/ModalLoading.tsx";

interface NewsContentModalProps {
    apiUrl: string;
    modalTitle: string;
}

export interface INewsShortItem {
    id: number;
    photo?: string;
    video?: string;
    title: string;
    priority: string;
    date: string;
}

const NewsContentModal: React.FC<NewsContentModalProps> = ({ apiUrl, modalTitle }) => {
    const globalContext = useContext(GlobalContext);

    if (!globalContext) {
        throw new Error("GlobalContext is not defined");
    }

    const { sendRequest } = globalContext;

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [priority, setPriority] = useState<string>("Secondary");
    const [date, setDate] = useState<string>("");
    const [photo, setPhoto] = useState<File | null>(null);
    const [video, setVideo] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === "title") setTitle(value);
        else if (name === "description") setDescription(value);
        else if (name === "priority") setPriority(value);
        else if (name === "date") setDate(value);
    };

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        setFile: React.Dispatch<React.SetStateAction<File | null>>,
        fileType: string
    ) => {
        const file = e.target.files?.[0];
        if (file) {
            if (fileType === "image" && file.type.startsWith("image/")) setFile(file);
            else if (fileType === "video" && file.type.startsWith("video/")) setFile(file);
            else alert(`Будь ласка, завантажте файл типу ${fileType}.`);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("priority", priority);
        formData.append("date", date);
        if (photo) formData.append("photo", photo);
        if (video) formData.append("video", video);

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
                            <Form.Label className="me-3" style={{ color: "white" }}>Заголовок: {modalTitle}</Form.Label>
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
                            <Form.Label className="me-3" style={{ color: "white" }}>Опис: {modalTitle}</Form.Label>
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

                        <Form.Group controlId="formPriority" className="mt-3">
                            <Form.Label className="me-3" style={{ color: "white" }}>Пріоритет: {modalTitle}</Form.Label>
                            <Form.Select
                                name="priority"
                                value={priority}
                                onChange={handleChange}
                                style={{ color: "white", backgroundColor: "#333" }}
                            >
                                <option value="Secondary">Secondary</option>
                                <option value="Main">Main</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group controlId="formDate" className="mt-3">
                            <Form.Label className="me-3" style={{ color: "white" }}>Дата: {modalTitle}</Form.Label>
                            <Form.Control
                                type="date"
                                name="date"
                                value={date}
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
                                    onChange={(e) => handleFileChange(e, setPhoto, "image")}
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

                        <Form.Group controlId="formVideo" className="mt-3">
                            <Form.Label className="me-3" style={{ color: "white" }}>Відео (необов'язково): </Form.Label>
                            <div>
                                <input
                                    type="file"
                                    accept="video/*"
                                    id="videoUpload"
                                    style={{ display: "none" }}
                                    onChange={(e) => handleFileChange(e, setVideo, "video")}
                                />
                                <Button
                                    variant="secondary"
                                    onClick={() => document.getElementById("videoUpload")?.click()}
                                    className="me-2"
                                >
                                    Завантажити відео
                                </Button>
                                {video && <span className="ms-2">{video.name}</span>}
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

export { NewsContentModal };
