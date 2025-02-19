import { FC } from "react";
import { ScheduleContextProvider } from "../contexts/ScheduleContext";
import { Container } from "react-bootstrap";
import { SchedulesList } from "../elements/schedule/SchedulesList";
import {AddScheduleButton} from "../AddsButtons/AddSheduleButton"

const Schedule: FC = () => {
    const token = sessionStorage.getItem("token");

    return (
        <ScheduleContextProvider>
            <Container className="schedule-page page">
                {token && (
                    <AddScheduleButton
                        apiUrl="/api/schedules"
                        modalTitle="Додати розклад"
                        buttonLabel="Додати новий розклад"
                    />
                )}
                <SchedulesList />
            </Container>
        </ScheduleContextProvider>
    );
};

export { Schedule };
