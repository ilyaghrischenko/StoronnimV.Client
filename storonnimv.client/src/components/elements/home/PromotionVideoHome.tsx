import {FC, useContext, useEffect} from "react";
import {Container} from "react-bootstrap";
import {HomeContext} from "../../contexts/HomeContext";

interface PromotionVideoHomeProps {
    className?: string;
}

const PromotionVideoHome: FC<PromotionVideoHomeProps> = ({className}) => {
    const homeContext = useContext(HomeContext)!;

    const {homePromotionVideo, fetchHomePromotionVideo} = homeContext;

    useEffect(() => {
        fetchHomePromotionVideo();
    }, []);

    return (
        <Container className={`promotion-video-home-container ${className}`}>
            //TODO: решить проблему с автозапуском
            <video
                className='promotion-video-home-container__video'
                controls
                preload="auto"
                autoPlay
                muted
            >
                <source src={homePromotionVideo.url} type='video/mp4' />
            </video>
        </Container>
    );
};

export {PromotionVideoHome};