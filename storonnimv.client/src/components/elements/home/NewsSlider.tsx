import React, {FC, ReactNode} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper";

interface INewsSliderProps {
    components: ReactNode[];
}

const NewsSlider: FC<INewsSliderProps> = ({ components }) => {
    return (
        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={10} // Расстояние между слайдами
            slidesPerView={3} // Количество видимых слайдов
            navigation // Включение стрелок
            pagination={{ clickable: true }} // Включение пагинации
            autoplay={{ delay: 3000 }} // Автопрокрутка
            loop={true} // Бесконечная прокрутка
        >
            {components.map((component, index) => (
                <SwiperSlide key={index}>{component}</SwiperSlide>
            ))}
        </Swiper>
    );
};

export { NewsSlider };
