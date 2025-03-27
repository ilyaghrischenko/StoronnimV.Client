import { FC, useState, useContext } from "react";
import { GlobalContext } from "../../contexts/shared/GlobalContext.tsx";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { ModalLoading } from "../shared/ModalLoading.tsx";

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
        if (file) setVideoFile(file);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!videoFile) return alert("Будь ласка, завантажте відео");

        setLoading(true);
        const formData = new FormData();
        formData.append("Url", videoFile);
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
        <Container style={{ backgroundColor: "#222", padding: "20px", borderRadius: "8px" }}>
            <Row>
                <Col xs={12}>
                    <h2 style={{ textAlign: "center", color: "white", marginBottom: "15px" }}>{modalTitle}</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formTitle" className="mb-3">
                            <Form.Label style={{ color: "white" }}>Заголовок:</Form.Label>
                            <Form.Control
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder={`Введіть заголовок ${modalTitle}`}
                                required
                                style={{ backgroundColor: "#333", color: "white" }}
                            />
                        </Form.Group>

                        <Form.Group controlId="formType" className="mb-3">
                            <Form.Label style={{ color: "white" }}>Тип відео:</Form.Label>
                            <Form.Select
                                value={videoType}
                                onChange={(e) => setVideoType(e.target.value)}
                                style={{ backgroundColor: "#333", color: "white" }}
                            >
                                <option value="Performance">Performance</option>
                                <option value="Backstage">Backstage</option>
                                <option value="Repetition">Repetition</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group controlId="formVideo" className="mb-3">
                            <Form.Label style={{ color: "white" }}>Завантажте відео:</Form.Label>
                            <Form.Control
                                type="file"
                                accept="video/*"
                                onChange={handleFileChange}
                                style={{ backgroundColor: "#333", color: "white" }}
                            />
                        </Form.Group>

                        <Button
                            variant="primary"
                            type="submit"
                            className="w-100 mt-3"
                            disabled={loading}
                            style={{ marginTop: "10px" }}
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
