import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { IVideoModel } from "../../../models/video/IVideoModel";
import { GlobalContext } from "../../contexts/shared/GlobalContext";
import { VideoEditButton } from "../admin/EditsButtons/VideoEditButton";
import { VideoDeleteButton } from "../admin/DeleteButtons/VideoDeleteButton";
import { FaEdit } from "react-icons/fa";
import {AdminContext} from "../../contexts/AdminContext.tsx";

interface IVideoListItemProps {
    videoItem: IVideoModel;
}

const VideoListItem: React.FC<IVideoListItemProps> = ({ videoItem }) => {
    const { OnShowModal, OnHideModal } = useContext(GlobalContext)!;

    const adminContext = useContext(AdminContext);

    if (!adminContext) {
        throw new Error("AdminContext must be used within a AdminContextProvider");
    }

    const { isAdmin } = adminContext;

    const handleShowEditModal = () => {
        OnShowModal(
            <VideoEditButton
                video={videoItem}
                apiUrl="your-api-url"
                onClose={OnHideModal}
            />
        );
    };

    return (
        <div className="video-list-item">
            <h3 className="video-list-item__title">{videoItem.title}</h3>
            <video
                className="video-list-item__preview"
                controls
                preload="auto"
            >
                <source src={videoItem.url} type="video/mp4" />
                Ваш браузер не підтримує тег video.
            </video>
            {isAdmin && (
                <>
                    <Button
                        className="btn btn-warning position-absolute top-0 end-0 m-2"
                        onClick={handleShowEditModal}
                        title="Редагувати відео"
                    >
                       <FaEdit/> 
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
