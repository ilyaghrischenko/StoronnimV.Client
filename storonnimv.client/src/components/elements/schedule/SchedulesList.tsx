import {FC, useContext, useEffect} from "react";
import {ScheduleListItem} from "./ScheduleListItem";
import {ScheduleContext} from "../../contexts/ScheduleContext";
import {ListGroup} from "react-bootstrap";
import {Loading} from "../shared/Loading";


const SchedulesList: FC = () => {
    const context = useContext(ScheduleContext);

    if (!context) {
        throw new Error("ScheduleContext must be used within a ScheduleContextProvider");
    }

    const { fetchSchedules, schedules, loading } = context;

    useEffect(() => {
        fetchSchedules();
    }, []);

    if (loading) {
        return (
            <Loading />
        );
    }

    return (
        <ListGroup>
            {schedules.map((schedule) => (
                <ScheduleListItem key={schedule.id} schedule={schedule}/>
            ))}
        </ListGroup>
    );
};

export {SchedulesList};