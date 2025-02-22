import React, { useContext, useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { IVideoModel } from "../../../models/video/IVideoModel";
import { GlobalContext } from "../../contexts/shared/GlobalContext";
import { VideoEditButton } from "../../EditsButtons/VideoEditButton";
import { VideoDeleteButton } from "../../DeleteButtons/VideoDeleteButton";

interface IVideoListItemProps {
    videoItem: IVideoModel;
}

const VideoListItem: React.FC<IVideoListItemProps> = ({ videoItem }) => {
    const { OnShowModal } = useContext(GlobalContext)!;
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        setIsAuthorized(!!token);
    }, []);

    const handleShowEditModal = () => {
        OnShowModal(
            <VideoEditButton video={videoItem} apiUrl="your-api-url" />
        );
    };

    return (
        <div className="video-list-item position-relative">
            <h3 className="video-list-item__title">{videoItem.title}</h3>
            <video
                className="video-list-item__preview"
                controls
                preload="auto"
            >
                <source src={videoItem.url} type="video/mp4" />
                Ваш браузер не підтримує тег video.
            </video>
            {isAuthorized && (
                <>
                    <Button
                        className="btn btn-warning position-absolute top-0 end-0 m-2"
                        onClick={handleShowEditModal}
                        title="Редагувати відео"
                    >
                        ✏
                    </Button>
                    <VideoDeleteButton
                        video={videoItem}
                        apiUrl="your-api-url"
                    />
                </>
            )}
        </div>
    );
};

export { VideoListItem };
