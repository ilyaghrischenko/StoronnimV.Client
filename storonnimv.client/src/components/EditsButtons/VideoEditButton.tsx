import React, { useState, useContext, useEffect } from "react";
import { Button } from "react-bootstrap";
import { GlobalContext } from "../contexts/shared/GlobalContext"; 
import { IVideoModel } from "../../models/video/IVideoModel";

interface VideoEditButtonProps {
    video: IVideoModel;
    apiUrl: string;
}

const VideoEditButton: React.FC<VideoEditButtonProps> = ({ video, apiUrl }) => {
    const { OnShowModal, OnHideModal, sendRequest } = useContext(GlobalContext)!;
    const [editedVideo, setEditedVideo] = useState<IVideoModel>(video);
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (token) {
            setIsAuthorized(true);
        } else {
            setIsAuthorized(false);
        }
    }, []);

    const handleSave = async () => {
        try {
            const response = await sendRequest(`${apiUrl}/${editedVideo.id}`, 'PUT', editedVideo, {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
            });

            if (response.status === 200) {
                console.log("Збережено: ", editedVideo);
                OnHideModal();
            } else {
                throw new Error("Помилка при збереженні відео");
            }
        } catch (error) {
            console.error("Помилка при збереженні відео:", error);
        }
    };

    const handleShowModal = () => {
        OnShowModal(
            <div>
                <label>Назва відео:</label>
                <input
                    type="text"
                    name="title"
                    value={editedVideo.title}
                    onChange={(e) => setEditedVideo({ ...editedVideo, title: e.target.value })}
                    className="form-control"
                />
                <label>Опис:</label>
                <textarea
                    name="description"
                    value={editedVideo.description}
                    onChange={(e) => setEditedVideo({ ...editedVideo, description: e.target.value })}
                    className="form-control"
                />
                <label>Змінити файл відео:</label>
                <input
                    type="file"
                    onChange={(e) => {
                        const file = e.target.files ? e.target.files[0] : null;
                        if (file) {
                            setEditedVideo({
                                ...editedVideo,
                                url: URL.createObjectURL(file),
                            });
                        }
                    }}
                    className="form-control"
                />
                <Button onClick={handleSave} className="mt-2">Зберегти</Button>
            </div>
        );
    };

    if (!isAuthorized) {
        return null;
    }

    return (
        <Button
            className="btn btn-warning position-absolute top-0 end-0 m-2"
            onClick={handleShowModal}
            title="Редагувати відео"
        >
            ✏
        </Button>
    );
};

export { VideoEditButton };

// TODO : ДОПИСАТЬ ЭТУ КНОПКУ!!!!!