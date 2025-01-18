import {FC} from "react";
import {HomeContextProvider} from "../contexts/HomeContext";
import {Container} from "react-bootstrap";
import {ScheduleHomeContainer} from "../elements/home/ScheduleHomeContainer";
import {NewsHomeList} from "../elements/home/NewsHomeList";
import {PromotionVideoHome} from "../elements/home/PromotionVideoHome";

import '../../styles/pages/Home.css';

const Home: FC = () => {
    return (
        <HomeContextProvider>
            <Container className='home-page page'>
                <ScheduleHomeContainer className='schedule-grid' />
                <NewsHomeList className='news-grid' />
                <PromotionVideoHome className='video-grid' />
            </Container>
        </HomeContextProvider>
    );
};

export {Home};