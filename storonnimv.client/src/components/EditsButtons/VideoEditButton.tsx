import React, { FC, useContext, useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { GlobalContext } from "../contexts/shared/GlobalContext";
import { IVideoModel } from "../../models/video/IVideoModel";
import { FaEdit } from "react-icons/fa";

interface VideoEditButtonProps {
    video: IVideoModel;
    apiUrl: string;
}

const VideoEditButton: FC<VideoEditButtonProps> = ({ video, apiUrl }) => {
    const globalContext = useContext(GlobalContext);
    const [editedVideo, setEditedVideo] = useState<IVideoModel>(video);
    const [newFile, setNewFile] = useState<File | null>(null);

    if (!globalContext) return null;

    const { OnShowModal, sendRequest, OnHideModal } = globalContext;

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
        if (file) setNewFile(file);
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
                OnHideModal();
                window.location.reload();
            } else {
                throw new Error("Помилка при збереженні відео");
            }
        } catch (error) {
            console.error("Помилка при збереженні відео:", error);
        }
    };

    const openEditModal = () => {
        OnShowModal(
            <div>
                <h5 className="mb-3">Редагувати відео</h5>
                <label>Назва відео:</label>
                <input
                    type="text"
                    name="title"
                    value={editedVideo.title || ""}
                    onChange={handleChange}
                    className="form-control mb-2"
                    placeholder="Введіть назву відео"
                />
                <label>Змінити файл відео:</label>
                <input
                    type="file"
                    accept="video/*"
                    onChange={handleFileChange}
                    className="form-control mb-3"
                />
                <div className="d-flex justify-content-end">
                    <Button onClick={handleSave} variant="primary">
                        Зберегти
                    </Button>
                </div>
            </div>
        );
    };

    const isUserAuthenticated = sessionStorage.getItem("token") !== null;

    if (!isUserAuthenticated) return null;

    return (
        <Button
            className="btn btn-warning position-absolute top-0 end-0 m-2"
            onClick={openEditModal}
        >
            <FaEdit />
        </Button>
    );
};

export { VideoEditButton };


// TODO : решить проблему с окном видео при его изменении

