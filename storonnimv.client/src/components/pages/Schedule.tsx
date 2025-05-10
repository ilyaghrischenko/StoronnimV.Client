import {FC, useContext, useEffect} from "react";
import {ScheduleContextProvider} from "../contexts/ScheduleContext";
import {Container} from "react-bootstrap";
import {SchedulesList} from "../elements/schedule/SchedulesList";
import {GlobalContext} from "../contexts/shared/GlobalContext.tsx";

const Schedule: FC = () => {
    const globalContext = useContext(GlobalContext);

    if (!globalContext) {
        throw new Error("GlobalContext must be used within a GlobalContextProvider");
    }

    const {fetchIsAdmin} = globalContext;

    useEffect(() => {
        fetchIsAdmin();
    }, []);

    return (
        <ScheduleContextProvider>
            <Container className="page">
                <SchedulesList/>
            </Container>
        </ScheduleContextProvider>
    );
};

export {Schedule};
