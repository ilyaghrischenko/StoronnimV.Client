import {FC, useContext, useEffect} from "react";
import {ScheduleContextProvider} from "../contexts/ScheduleContext";
import {Button, Container} from "react-bootstrap";
import {SchedulesList} from "../elements/schedule/SchedulesList";
import {GlobalContext} from "../contexts/shared/GlobalContext.tsx";
import {AddScheduleModalContent} from "../elements/schedule/forms/AddScheduleModalContent.tsx";
import {FaPlus} from "react-icons/fa";

const Schedule: FC = () => {
    const globalContext = useContext(GlobalContext);

    if (!globalContext) {
        throw new Error("GlobalContext must be used within a GlobalContextProvider");
    }

    const {fetchIsAdmin, isAdmin, OnShowModal} = globalContext;

    useEffect(() => {
        fetchIsAdmin();
    }, []);

    return (
        <ScheduleContextProvider>
            <div className='page-wrapper'>
                <Container className="schedule-page page">
                    {isAdmin && (
                        <Button onClick={() => OnShowModal(<AddScheduleModalContent/>)}>
                            <FaPlus/>
                        </Button>
                    )}
                    <SchedulesList/>
                </Container>
            </div>
        </ScheduleContextProvider>
    );
};

export {Schedule};
