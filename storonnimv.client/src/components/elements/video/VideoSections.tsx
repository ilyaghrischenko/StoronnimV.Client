import {FC} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap";

interface VideoSectionsProps {
    topImage?: string; // Изображение для верхнего большого раздела
    bottomLeftImage?: string; // Изображение для нижнего левого раздела
    bottomRightImage?: string; // Изображение для нижнего правого раздела
}

const VideoSections: FC<VideoSectionsProps> = ({topImage, bottomLeftImage, bottomRightImage}) => {

    const videoCategories = [
        "Performance",
        "Backstage",
        "Repetition"
    ];
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/video/section?videoType=${videoCategories[0]}`, { replace: true });
    };

    return (
        <div className="video-sections-container page">
            <Button variant="primary"
                    type="submit"
                    className="form-modal__button" onClick={handleClick}>
                <div className="video-sections__top">
                    {topImage ? (
                        <img src={topImage} alt="Top Section" className="video-sections__image"/>
                    ) : (
                        <p>Top Section (Add an image)</p>
                    )}
                    <h1 className="video-sections__title">Performances</h1>
                </div>
            </Button>
            <div className="video-sections__bottom">
                <Link className="video-sections__bottom-left" to={`/video/section?videoType=${videoCategories[1]}`}>
                    <div>
                        {bottomLeftImage ? (
                            <img src={bottomLeftImage} alt="Bottom Left Section" className="video-sections__image"/>
                        ) : (
                            <p>Bottom Left Section (Add an image)</p>
                        )}
                        <h1 className="video-sections__title">Backstage</h1>
                    </div>
                </Link>
                <Link className="video-sections__bottom-right" to={`/video/section?videoType=${videoCategories[2]}`}>
                    <div>
                        {bottomRightImage ? (
                            <img src={bottomRightImage} alt="Bottom Right Section" className="video-sections__image"/>
                        ) : (
                            <p>Bottom Right Section (Add an image)</p>
                        )}
                        <h1 className="video-sections__title">Repetitions</h1>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export {VideoSections};
