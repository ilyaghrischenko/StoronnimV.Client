import {FC} from "react";
import {Link} from "react-router-dom";

interface VideoSectionsProps {
    topImage?: string; // Изображение для верхнего большого раздела
    bottomLeftImage?: string; // Изображение для нижнего левого раздела
    bottomRightImage?: string; // Изображение для нижнего правого раздела
}

const VideoSections: FC<VideoSectionsProps> = ({topImage, bottomLeftImage, bottomRightImage}) => {

    const videoCategories = [
        {id: "Performance"},
        {id: "Backstage"},
        {id: "Repetition"},
    ];

    return (
        <div className="video-sections-container page">
            <Link className="video-sections__top" to={`/video/section/${videoCategories[0].id}`}>
                <div className="video-sections__top">
                    {topImage ? (
                        <img src={topImage} alt="Top Section" className="video-sections__image"/>
                    ) : (
                        <p>Top Section (Add an image)</p>
                    )}
                    <h1 className="video-sections__title">Performances</h1>
                </div>
            </Link>
            <div className="video-sections__bottom">
                <Link className="video-sections__bottom-left" to={`/video/section/${videoCategories[1].id}`}>
                    <div>
                        {bottomLeftImage ? (
                            <img src={bottomLeftImage} alt="Bottom Left Section" className="video-sections__image"/>
                        ) : (
                            <p>Bottom Left Section (Add an image)</p>
                        )}
                        <h1 className="video-sections__title">Backstage</h1>
                    </div>
                </Link>
                <Link className="video-sections__bottom-right" to={`/video/section/${videoCategories[2].id}`}>
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
