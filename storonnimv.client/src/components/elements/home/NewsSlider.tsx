import {FC, useContext, useEffect, useState} from "react";
import { motion } from "framer-motion";
import { HomeContext } from "../../contexts/HomeContext.tsx";
import { NewsHomeListItem } from "./NewsHomeListItem.tsx";
import { Button } from "react-bootstrap";

interface INewsSliderProps {
    className?: string;
}

const NewsSlider: FC<INewsSliderProps> = ({ className }) => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const homeContext = useContext(HomeContext);

    if (!homeContext) {
        throw new Error("HomeContext must be used within a HomeContextProvider");
    }

    const { homeNewsList, fetchHomeNewsList } = homeContext;

    useEffect(() => {
        fetchHomeNewsList();
    }, []);

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex + 1 > homeNewsList.length - 3 ? 0 : prevIndex + 1
        );
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex - 1 < 0 ? homeNewsList.length - 3 : prevIndex - 1
        );
    };

    return (
        <div className={`slider-container ${className}`}>
            {/* Кнопка "Назад" */}
            <Button
                className="slider-button prev-button"
                onClick={handlePrev}
                aria-label="Previous"
            >
                &#8592;
            </Button>

            {/* Слайды */}
            <div className="slider-wrapper">
                <motion.div
                    className="slider"
                    style={{
                        width: `${homeNewsList.length * 100 / 3}%`,
                    }}
                    animate={{
                        x: `-${currentIndex * (100 / 3)}%`,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 65,
                        damping: 20,
                    }}
                >
                    {homeNewsList.map((item) => (
                        <div className="news-slider-item" key={item.id}>
                            <NewsHomeListItem item={item} />
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Кнопка "Вперёд" */}
            <Button
                className="slider-button next-button"
                onClick={handleNext}
                aria-label="Next"
            >
                &#8594;
            </Button>
        </div>
    );
};

export { NewsSlider };
