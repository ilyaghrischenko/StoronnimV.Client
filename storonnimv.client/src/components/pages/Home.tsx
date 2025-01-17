import {FC} from "react";
import {HomeContextProvider} from "../contexts/HomeContext";
import {Container} from "react-bootstrap";
import {ScheduleHomeContainer} from "../elements/home/ScheduleHomeContainer";
import {NewsHomeList} from "../elements/home/NewsHomeList";

const Home: FC = () => {
    return (
        <HomeContextProvider>
            <Container>
                <ScheduleHomeContainer />
                <NewsHomeList />
            </Container>
        </HomeContextProvider>
    );
};

export {Home};