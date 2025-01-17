import {FC, useContext, useEffect} from "react";
import {Container} from "react-bootstrap";
import {HomeContext} from "../../contexts/HomeContext";
import {Loading} from "../shared/Loading";

import '../../../styles/elements/home/PromotionVideoHome.css';

const PromotionVideoHome: FC = () => {
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
        <Container className='promotion-video-home-container'>
            <p>{homePromotionVideo.id}</p>
            <p>{homePromotionVideo.title}</p>

            <video className='promotion-video-home' controls preload='none'>
                <source src={homePromotionVideo.url} type='video/mp4' />
            </video>
        </Container>
    );
};

export {PromotionVideoHome};