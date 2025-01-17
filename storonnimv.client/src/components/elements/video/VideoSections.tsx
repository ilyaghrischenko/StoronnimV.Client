import {FC} from "react";
import {Link} from "react-router-dom";
import "../../../styles/elements/video/VideoSections.css";

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
        <div className="sections-container">
            <Link className="top-section" to={`/video/section/${videoCategories[0].id}`}>
                <div className="top-section">
                    {topImage ? (
                        <img src={topImage} alt="Top Section" className="section-image"/>
                    ) : (
                        <p>Top Section (Add an image)</p>
                    )}
                    <h1>Performances</h1>
                </div>
            </Link>
            <div className="bottom-section">
                <Link className="bottom-left" to={`/video/section/${videoCategories[1].id}`}>
                    <div >
                        {bottomLeftImage ? (
                            <img src={bottomLeftImage} alt="Bottom Left Section" className="section-image"/>
                        ) : (
                            <p>Bottom Left Section (Add an image)</p>
                        )}
                        <h1>Backstage</h1>
                    </div>
                </Link>
                <Link className="bottom-right" to={`/video/section/${videoCategories[2].id}`}>
                    <div >
                        {bottomRightImage ? (
                            <img src={bottomRightImage} alt="Bottom Right Section" className="section-image"/>
                        ) : (
                            <p>Bottom Right Section (Add an image)</p>
                        )}
                        <h1>Repetitions</h1>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export {VideoSections};