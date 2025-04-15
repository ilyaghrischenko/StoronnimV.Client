import {FC, useContext, useEffect} from "react";
import {HomeContextProvider} from "../contexts/HomeContext";
import {Container} from "react-bootstrap";
import {ScheduleHomeContainer} from "../elements/home/ScheduleHomeContainer";
import {PromotionVideoHome} from "../elements/home/PromotionVideoHome";
import {NewsSlider} from "../elements/home/NewsSlider";
import {GlobalContext} from "../contexts/shared/GlobalContext.tsx";

const Home: FC = () => {
    const globalContext = useContext(GlobalContext);

    if (!globalContext) {
        throw new Error("GlobalContext must be used within a GlobalContextProvider");
    }

    const {fetchIsAdmin} = globalContext;

    useEffect(() => {
        fetchIsAdmin();
    }, []);

    return (
        <HomeContextProvider>
            <Container className='home-page page'>
                <ScheduleHomeContainer className='schedule-grid'/>
                <NewsSlider className='news-grid'/>
                <PromotionVideoHome className='video-grid'/>
            </Container>
        </HomeContextProvider>
    );
};

export {Home};