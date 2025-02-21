import { FC, useState, useContext } from "react";
import { GlobalContext } from "../../contexts/shared/GlobalContext.tsx";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { ModalLoading } from "../shared/ModalLoading.tsx";

interface VideoContentModalProps {
    apiUrl: string;
    modalTitle: string;
    buttonLabel: string;
    section: string;
}

const VideoContentModal: FC<VideoContentModalProps> = ({ apiUrl, modalTitle, section }) => {
    const globalContext = useContext(GlobalContext);

    if (!globalContext) {
        throw new Error("GlobalContext is not defined");
    }

    const { sendRequest } = globalContext;

    const [title, setTitle] = useState<string>("");
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [videoType, setVideoType] = useState<string>("Performance");

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) setVideoFile(file);
    };

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setVideoType(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!videoFile) {
            alert("Будь ласка, завантажте відео");
            return;
        }
        setLoading(true);

        const formData = new FormData();
        formData.append("title", title);
        formData.append("video", videoFile);
        formData.append("section", section);
        formData.append("type", videoType);

        try {
            const response = await sendRequest(apiUrl, "POST", formData, {
                "Content-Type": "multipart/form-data",
            });
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
                                onChange={handleTitleChange}
                                placeholder={`Введіть заголовок ${modalTitle}`}
                            />
                        </Form.Group>

                        <Form.Group controlId="formType" className="mt-3">
                            <Form.Label>Тип відео</Form.Label>
                            <select 
                                value={videoType} 
                                onChange={handleTypeChange} 
                                className="form-control"
                            >
                                <option value="Performance">Performance</option>
                                <option value="Backstage">Backstage</option>
                                <option value="Repetition">Repetition</option>
                            </select>
                        </Form.Group>

                        <Form.Group controlId="formVideo" className="mt-3">
                            <Form.Label>Завантажте відео</Form.Label>
                            <Form.Control
                                type="file"
                                accept="video/*"
                                onChange={handleFileChange}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="mt-3 w-100">
                            Додати {modalTitle}
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export { VideoContentModal };
