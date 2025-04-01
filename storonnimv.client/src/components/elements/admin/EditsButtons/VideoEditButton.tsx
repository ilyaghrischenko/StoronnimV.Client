import React, {FC, useContext, useState, useEffect} from "react";
import {Button, Container, Form} from "react-bootstrap";
import {GlobalContext} from "../../../contexts/shared/GlobalContext.tsx";
import {IVideoModel} from "../../../../models/video/IVideoModel.tsx";

interface VideoEditButtonProps {
    video: IVideoModel;
    apiUrl: string;
    onClose: () => void;
}

const VideoEditButton: FC<VideoEditButtonProps> = ({video, apiUrl, onClose}) => {
    const globalContext = useContext(GlobalContext);
    const [editedVideo, setEditedVideo] = useState<IVideoModel>(video);
    const [videoType, setVideoType] = useState(video.type);


    if (!globalContext) return null;
    const {sendRequest} = globalContext;

    useEffect(() => {
        setEditedVideo(video);
    }, [video]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedVideo({
            ...editedVideo,
            [e.target.name]: e.target.value,
        });
    };


    const handleSave = async () => {
        try {
            const formData = new FormData();
            formData.append("id", editedVideo.id.toString());
            formData.append("title", editedVideo.title);
            formData.append("type", videoType);

            const response = await sendRequest(
                `${apiUrl}`,
                "PATCH",
                formData,
                {"Content-Type": "application/json"}
            );

            if (response.status === 204) {
                onClose();
                alert("Збережено!");
                window.location.reload();
            } else {
                throw new Error("Помилка при збереженні відео: " + response.status);
            }
        } catch (error) {
            console.error("Помилка при збереженні відео:", error);
        }
    };

    return (
        <Container className="form-modal">
            <h2 className="form-modal__title">Редагувати відео</h2>
            <Container className="form-modal__form">
                <Form.Group className="form-modal__group">
                    <Form.Label className="form-modal__label">Заголовок:</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        value={editedVideo.title || ""}
                        onChange={handleChange}
                        className="form-modal__input"
                        placeholder="Введіть назву відео"
                    />
                </Form.Group>
                <Form.Group className="form-modal__group">
                    <Form.Label className="form-modal__label">Змінити тип відео:</Form.Label>
                    <Form.Select
                        value={videoType}
                        onChange={(e) => setVideoType(e.target.value)}
                        className="form-modal__select"
                    >
                        <option value="Performance">Performance</option>
                        <option value="Backstage">Backstage</option>
                        <option value="Repetition">Repetition</option>
                    </Form.Select>
                </Form.Group>
                <Container className="d-flex justify-content-end">
                    <Button className="form-modal__button form-modal__button--cancel" onClick={onClose}>
                        Закрити
                    </Button>
                    <Button className="form-modal__button form-modal__button--confirm" onClick={handleSave}>
                        Зберегти
                    </Button>
                </Container>
            </Container>
        </Container>
    );
};

export {VideoEditButton};
