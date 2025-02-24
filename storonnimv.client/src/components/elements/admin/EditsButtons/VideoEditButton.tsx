import React, { FC, useContext, useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { GlobalContext } from "../../../contexts/shared/GlobalContext.tsx";
import { IVideoModel } from "../../../../models/video/IVideoModel.tsx";

interface VideoEditButtonProps {
    video: IVideoModel;
    apiUrl: string;
    onClose: () => void;
}

const VideoEditButton: FC<VideoEditButtonProps> = ({ video, apiUrl, onClose }) => {
    const globalContext = useContext(GlobalContext);
    const [editedVideo, setEditedVideo] = useState<IVideoModel>(video);
    const [newFile, setNewFile] = useState<File | null>(null);

    if (!globalContext) return null;
    const { sendRequest } = globalContext;

    useEffect(() => {
        setEditedVideo(video);
    }, [video]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedVideo({
            ...editedVideo,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setNewFile(file);
        }
    };

    const handleSave = async () => {
        try {
            const formData = new FormData();
            formData.append("title", editedVideo.title);
            if (newFile) formData.append("videoFile", newFile);

            const response = await sendRequest(
                `${apiUrl}/${editedVideo.id}`,
                "PUT",
                formData,
                { "Content-Type": "multipart/form-data" }
            );

            if (response.status === 200) {
                onClose();
                window.location.reload();
            } else {
                throw new Error("Помилка при збереженні відео");
            }
        } catch (error) {
            console.error("Помилка при збереженні відео:", error);
        }
    };

    return (
        <div style={{ color: "white" }}>
            <h5 className="mb-3" style={{ color: "white" }}>Редагувати відео</h5>
            <div className="mb-3">
                <label className="form-label" style={{ color: "white" }}>Заголовок:</label>
                <input
                    type="text"
                    name="title"
                    value={editedVideo.title || ""}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Введіть назву відео"
                    style={{ color: "white", backgroundColor: "#333" }}
                />
            </div>
            <div className="mb-3">
                <label className="form-label" style={{ color: "white" }}>Змінити файл відео:</label>
                <input
                    type="file"
                    accept="video/*"
                    onChange={handleFileChange}
                    className="form-control"
                    style={{ color: "white", backgroundColor: "#333" }}
                />
            </div>
            <div className="d-flex justify-content-end">
                <Button variant="secondary" className="me-2" onClick={onClose}>
                    Закрити
                </Button>
                <Button onClick={handleSave} variant="primary">
                    Зберегти
                </Button>
            </div>
        </div>
    );
};

export { VideoEditButton };
