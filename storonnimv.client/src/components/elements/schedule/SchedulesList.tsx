import {FC, useContext, useEffect} from "react";
import {ScheduleListItem} from "./ScheduleListItem";
import {ScheduleContext} from "../../contexts/ScheduleContext";
import {ListGroup} from "react-bootstrap";


const SchedulesList: FC = () => {
    const context = useContext(ScheduleContext);

    if (!context) {
        throw new Error("ScheduleContext must be used within a ScheduleContextProvider");
    }

    const { fetchSchedules, schedules } = context;

    useEffect(() => {
        fetchSchedules();
    }, []);


    return (
        <ListGroup>
            {schedules.map((schedule) => (
                <ScheduleListItem key={schedule.id} schedule={schedule}/>
            ))}
        </ListGroup>
    );
};

export {SchedulesList};