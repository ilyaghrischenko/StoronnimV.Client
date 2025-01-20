import { FC, useContext, useEffect } from "react";
import { HomeContext } from "../../contexts/HomeContext.tsx";
// @ts-expect-error-ignore
import "swiper/css/bundle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { NewsHomeListItem } from "./NewsHomeListItem.tsx";

interface NewsComponentProps {
    className?: string;
}


const NewsSlider: FC<NewsComponentProps> = ({ className }) => {
    const homeContext = useContext(HomeContext);

    if (!homeContext) {
        throw new Error("HomeContext must be used within a HomeContextProvider");
    }

    const { homeNewsList, fetchHomeNewsList } = homeContext;

    useEffect(() => {
        fetchHomeNewsList();
    }, []);


    return (
        <Swiper className={className}
                key={homeNewsList.length}
                modules={[Navigation, Autoplay]}
                slidesPerView={3}
                spaceBetween={20}
                navigation
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop
                speed={1800}
        >
            {homeNewsList.map((news, index) => (
                <SwiperSlide key={index}>
                    <NewsHomeListItem item={news} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export { NewsSlider };
