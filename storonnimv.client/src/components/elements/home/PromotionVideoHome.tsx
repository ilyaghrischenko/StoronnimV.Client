import {FC, useContext, useEffect} from "react";
import {Container} from "react-bootstrap";
import {HomeContext} from "../../contexts/HomeContext";
import {Loading} from "../shared/Loading";

interface PromotionVideoHomeProps {
    className?: string;
}

const PromotionVideoHome: FC<PromotionVideoHomeProps> = ({className}) => {
    const homeContext = useContext(HomeContext);

    if (!homeContext) {
        throw new Error("HomeContext must be used within a HomeContextProvider");
    }

    const {loading, homePromotionVideo, fetchHomePromotionVideo} = homeContext;

    useEffect(() => {
        fetchHomePromotionVideo();
    }, []);

    if (loading) {
        return (
            <Loading />
        );
    }

    return (
        <Container className={`promotion-video-home-container ${className}`}>
            <video className='promotion-video-home-container__video' controls preload='none'>
                <source src={homePromotionVideo.url} type='video/mp4' />
            </video>
        </Container>
    );
};

export {PromotionVideoHome};