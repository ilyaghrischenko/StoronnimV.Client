import { FC, useState, useContext } from "react";
import { GlobalContext } from "../../contexts/shared/GlobalContext.tsx";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { ModalLoading } from "../shared/ModalLoading.tsx";
import { IVideoModel } from "../../../models/video/IVideoModel";

interface VideoContentModalProps {
    apiUrl: string;
    modalTitle: string;
}

const VideoContentModal: FC<VideoContentModalProps> = ({ apiUrl, modalTitle }) => {
    const globalContext = useContext(GlobalContext);

    if (!globalContext) {
        throw new Error("GlobalContext is not defined");
    }

    const { sendRequest } = globalContext;

    const [title, setTitle] = useState<string>("");
    const [url, setUrl] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "title") setTitle(value);
        else if (name === "url") setUrl(value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const videoData: IVideoModel = {
            id: 0,
            title,
            url,
        };

        try {
            const response = await sendRequest(apiUrl, "POST", videoData);
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

                        <Form.Group controlId="formUrl" className="mt-3">
                            <Form.Label>URL відео {modalTitle}</Form.Label>
                            <Form.Control
                                type="text"
                                name="url"
                                value={url}
                                onChange={handleChange}
                                placeholder="Введіть URL відео"
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
