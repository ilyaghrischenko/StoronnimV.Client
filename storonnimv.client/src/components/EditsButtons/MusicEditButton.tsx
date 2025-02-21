import React, { useState, useContext, useEffect } from "react";
import { Button } from "react-bootstrap";
import { GlobalContext } from "../contexts/shared/GlobalContext"; 
import { IVideoModel } from "../../models/video/IVideoModel";

interface VideoEditButtonProps {
    video: IVideoModel;
    apiUrl: string;
}

const VideoEditButton: React.FC<VideoEditButtonProps> = ({ video, apiUrl }) => {
    const { OnShowModal, OnHideModal } = useContext(GlobalContext)!;
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
            console.log("Сохранено: ", editedVideo);

            const response = await fetch(`${apiUrl}/${editedVideo.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
                },
                body: JSON.stringify(editedVideo),
            });

            if (!response.ok) {
                throw new Error("Ошибка при сохранении видео");
            }

            OnHideModal();
        } catch (error) {
            console.error("Ошибка при сохранении видео:", error);
        }
    };

    const handleShowModal = () => {
        OnShowModal(
            <div>
                <label>Название видео:</label>
                <input
                    type="text"
                    name="title"
                    value={editedVideo.title}
                    onChange={(e) => setEditedVideo({ ...editedVideo, title: e.target.value })}
                    className="form-control"
                />
                <label>Описание:</label>
                <textarea
                    name="description"
                    value={editedVideo.description}
                    onChange={(e) => setEditedVideo({ ...editedVideo, description: e.target.value })}
                    className="form-control"
                />
                <Button onClick={handleSave} className="mt-2">Сохранить</Button>
            </div>,
            "Редактирование видео"
        );
    };

    if (!isAuthorized) {
        return null;
    }

    return (
        <>
            <Button
                className="btn btn-warning position-absolute top-0 end-0 m-2"
                onClick={handleShowModal}
                title="Редактировать видео"
            >
                ✏
            </Button>
        </>
    );
};

export { VideoEditButton };
