import {FC, useContext} from "react";
import { ScheduleContextProvider } from "../contexts/ScheduleContext";
import { Container } from "react-bootstrap";
import { SchedulesList } from "../elements/schedule/SchedulesList";
import {AddScheduleButton} from "../elements/admin/AddsButtons/AddSheduleButton"
import {AdminContext} from "../contexts/AdminContext.tsx";

const Schedule: FC = () => {
    const adminContext = useContext(AdminContext);

    if (!adminContext) {
        throw new Error("AdminContext must be used within a AdminContextProvider");
    }

    const { isAdmin } = adminContext;

    return (
        <ScheduleContextProvider>
            <Container className="schedule-page page">
                {isAdmin && (
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
