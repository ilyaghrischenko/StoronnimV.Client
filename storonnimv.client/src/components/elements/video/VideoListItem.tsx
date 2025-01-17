import { FC } from "react";
import { IVideoModel } from "../../../models/video/IVideoModel";
import "../../../styles/elements/video/VideoListItem.css";

interface IVideoListItemProps {
    videoItem: IVideoModel;
}

const VideoListItem: FC<IVideoListItemProps> = ({ videoItem }) => {



    return (
        <div className="video-list-item">
            <h3 className="video-title">{videoItem.title}</h3>
            <video
                className="video-preview-item"
                controls
                preload="auto" // Видео будет загружаться для захвата кадра
            >
                <source src={videoItem.url} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export { VideoListItem };
