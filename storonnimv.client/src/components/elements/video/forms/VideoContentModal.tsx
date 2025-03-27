import { FC, useState, useContext } from "react";
import { GlobalContext } from "../../../contexts/shared/GlobalContext.tsx";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { ModalLoading } from "../../shared/ModalLoading.tsx";

interface VideoContentModalProps {
    apiUrl: string;
    modalTitle: string;
}

const VideoContentModal: FC<VideoContentModalProps> = ({ apiUrl, modalTitle }) => {
    const globalContext = useContext(GlobalContext);
    if (!globalContext) throw new Error("GlobalContext is not defined");

    const { sendRequest, OnHideModal } = globalContext;

    const [title, setTitle] = useState("");
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [videoType, setVideoType] = useState("Performance");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setVideoFile(file || null);
    };

    const isFormValid = title.trim() !== "" && videoFile !== null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid) return;

        setLoading(true);
        const formData = new FormData();
        formData.append("Url", videoFile!);
        formData.append("Title", title);
        formData.append("Type", videoType);

        try {
            const response = await sendRequest(apiUrl, "POST", formData);
            if (response.status === 200) {
                alert(`${modalTitle} успішно додано!`);
                OnHideModal();
            }
        } catch (error) {
            alert(`Помилка при додаванні ${modalTitle.toLowerCase()}`);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <ModalLoading />;

    return (
        <Container className="video-modal">
            <Row>
                <Col xs={12}>
                    <h2 className="video-modal__title">{modalTitle}</h2>
                    <Form onSubmit={handleSubmit} className="video-modal__form">
                        <Form.Group controlId="formTitle" className="video-modal__group">
                            <Form.Label className="video-modal__label">Заголовок:</Form.Label>
                            <Form.Control
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder={`Введіть заголовок ${modalTitle}`}
                                required
                                className="video-modal__input"
                            />
                        </Form.Group>

                        <Form.Group controlId="formType" className="video-modal__group">
                            <Form.Label className="video-modal__label">Тип відео:</Form.Label>
                            <Form.Select
                                value={videoType}
                                onChange={(e) => setVideoType(e.target.value)}
                                className="video-modal__select"
                            >
                                <option value="Performance">Performance</option>
                                <option value="Backstage">Backstage</option>
                                <option value="Repetition">Repetition</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group controlId="formVideo" className="video-modal__group">
                            <Form.Label className="video-modal__label">Завантажте відео:</Form.Label>
                            <Form.Control
                                type="file"
                                accept="video/*"
                                onChange={handleFileChange}
                                className="video-modal__input"
                            />
                        </Form.Group>

                        <Button
                            variant="primary"
                            type="submit"
                            className="video-modal__button"
                            disabled={!isFormValid || loading}
                        >
                            {loading ? "Завантаження..." : `Додати ${modalTitle}`}
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export { VideoContentModal };
