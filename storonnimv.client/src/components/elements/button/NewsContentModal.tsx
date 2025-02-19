import { FC, useContext, useState } from "react";
import { GlobalContext } from "../../contexts/shared/GlobalContext.tsx";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { ModalLoading } from "../shared/ModalLoading.tsx";

interface NewsContentModalProps {
    apiUrl: string;
    modalTitle: string;
}

export interface INewsShortItem {
    id: number;
    photo: string;
    title: string;
    priority: string;
    date: string;
}

const NewsContentModal: FC<NewsContentModalProps> = ({ apiUrl, modalTitle }) => {
    const globalContext = useContext(GlobalContext);

    if (!globalContext) {
        throw new Error("GlobalContext is not defined");
    }

    const { sendRequest } = globalContext;

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [priority, setPriority] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [photo, setPhoto] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === "title") setTitle(value);
        else if (name === "description") setDescription(value);
        else if (name === "priority") setPriority(value);
        else if (name === "date") setDate(value);
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
        formData.append("priority", priority);
        formData.append("date", date);
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
                            <Form.Label>Заголовок {modalTitle}</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={title}
                                onChange={handleChange}
                                placeholder={`Введіть заголовок ${modalTitle}`}
                            />
                        </Form.Group>

                        <Form.Group controlId="formDescription" className="mt-3">
                            <Form.Label>Опис {modalTitle}</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="description"
                                value={description}
                                onChange={handleChange}
                                placeholder={`Введіть опис ${modalTitle}`}
                            />
                        </Form.Group>

                        <Form.Group controlId="formPriority" className="mt-3">
                            <Form.Label>Пріоритет {modalTitle}</Form.Label>
                            <Form.Control
                                type="text"
                                name="priority"
                                value={priority}
                                onChange={handleChange}
                                placeholder={`Введіть пріоритет ${modalTitle}`}
                            />
                        </Form.Group>

                        <Form.Group controlId="formDate" className="mt-3">
                            <Form.Label>Дата {modalTitle}</Form.Label>
                            <Form.Control
                                type="date"
                                name="date"
                                value={date}
                                onChange={handleChange}
                                placeholder={`Виберіть дату ${modalTitle}`}
                            />
                        </Form.Group>

                        <Form.Group controlId="formPhoto" className="mt-3">
                            <Form.Label>Фото {modalTitle}</Form.Label>
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
                                >
                                    Виберіть файл зображення
                                </Button>
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
