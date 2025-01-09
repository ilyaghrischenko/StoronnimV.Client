import {FC, useContext} from "react";
import {GlobalContext} from "../contexts/shared/GlobalContext";
import {ScheduleContextProvider} from "../contexts/ScheduleContext";
import {Container} from "react-bootstrap";

const Schedule: FC = () => {
    const globalContext = useContext(GlobalContext);

    if (!globalContext) {
        throw new Error("GlobalContext must be used within a GlobalContextProvider");
    }

    const {setBgImage, setHeaderTitle} = globalContext;

    return (
        <ScheduleContextProvider>
            <Container>
                <p>Schedule</p>
            </Container>
        </ScheduleContextProvider>
    );
};

export {Schedule};