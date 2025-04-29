import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { IVideoModel } from "../../../models/video/IVideoModel";
import { GlobalContext } from "../../contexts/shared/GlobalContext";
import { EditVideoModal } from "./forms/EditVideoModal.tsx";
import { DeleteVideoModal } from "./forms/DeleteVideoModal.tsx";
import {FaEdit, FaTrash} from "react-icons/fa";

interface IVideoListItemProps {
    videoItem: IVideoModel;
}

const VideoListItem: React.FC<IVideoListItemProps> = ({ videoItem }) => {
    const { OnShowModal, isAdmin } = useContext(GlobalContext)!;

    return (
        <div className="video-list-item">
            <h3 className="video-list-item__title main-text">{videoItem.title}</h3>
            <video
                className="video-list-item__video"
                controls
                preload="auto"
            >
                <source src={videoItem.url} type="video/mp4" />
                Ваш браузер не підтримує тег video.
            </video>
            {isAdmin && (
                <div className="video-list-item__admin-buttons">
                    <h3>Video id: {videoItem.id}</h3>
                    <Button
                        onClick={() => OnShowModal(<EditVideoModal video={videoItem}/>)}
                        title="Редагувати відео"
                    >
                        <FaEdit/>
                    </Button>
                    <Button
                        onClick={() => OnShowModal(<DeleteVideoModal video={videoItem} />)}
                        title="Видалити відео"
                    >
                        <FaTrash/>
                    </Button>
                </div>
            )}
        </div>
    );
};

export { VideoListItem };
