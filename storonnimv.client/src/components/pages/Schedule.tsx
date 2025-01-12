import {FC} from "react";
import {ScheduleContextProvider} from "../contexts/ScheduleContext";
import {Container} from "react-bootstrap";
import {SchedulesList} from "../elements/schedule/SchedulesList";

const Schedule: FC = () => {
    return (
        <ScheduleContextProvider>
            <Container>
                <SchedulesList/>
            </Container>
        </ScheduleContextProvider>
    );
};

export {Schedule};