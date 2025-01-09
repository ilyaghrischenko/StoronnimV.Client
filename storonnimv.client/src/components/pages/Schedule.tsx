import {FC} from "react";
import {ScheduleContextProvider} from "../contexts/ScheduleContext";
import {Container} from "react-bootstrap";

const Schedule: FC = () => {
    return (
        <ScheduleContextProvider>
            <Container>
                <p>Schedule</p>
            </Container>
        </ScheduleContextProvider>
    );
};

export {Schedule};