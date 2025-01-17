import {FC} from "react";
import {HomeContextProvider} from "../contexts/HomeContext";
import {Container} from "react-bootstrap";
import {ScheduleHomeContainer} from "../elements/home/ScheduleHomeContainer";
import {NewsHomeList} from "../elements/home/NewsHomeList";
import {PromotionVideoHome} from "../elements/home/PromotionVideoHome";

const Home: FC = () => {
    return (
        <HomeContextProvider>
            <Container>
                <ScheduleHomeContainer />
                <NewsHomeList />
                <PromotionVideoHome />
            </Container>
        </HomeContextProvider>
    );
};

export {Home};