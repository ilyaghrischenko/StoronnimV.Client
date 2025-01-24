import { FC, useContext, useEffect } from "react";
import { ScheduleListItem } from "./ScheduleListItem";
import { ScheduleContext } from "../../contexts/ScheduleContext";
import { Loading } from "../shared/Loading";
import { List } from "../shared/GenericList/List";
import { IScheduleListItem } from "../../../models/schedule/IScheduleListItem";
import { ListItem } from "../shared/GenericList/ListItem";
import { GlobalContext } from "../../contexts/shared/GlobalContext";

const SchedulesList: FC = () => {
    const scheduleContext = useContext(ScheduleContext);
    const globalContext = useContext(GlobalContext);

    if (!globalContext) {
        throw new Error("GlobalContext must be used within a GlobalContextProvider");
    }
    if (!scheduleContext) {
        throw new Error("ScheduleContext must be used within a ScheduleContextProvider");
    }

    const { fetchSchedules, schedules, loading } = scheduleContext;
    const { OnShowModal } = globalContext;

    useEffect(() => {
        fetchSchedules();
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <List
            className='schedules-list'
            items={schedules}
            renderItem={(schedule: IScheduleListItem) => (
                <ListItem
                    className='schedules-list__item'
                    item={schedule}
                    renderItem={(schedule: IScheduleListItem) => (
                        <ScheduleListItem key={schedule.id} schedule={schedule} />
                    )}
                    onClick={() =>
                        OnShowModal(<ScheduleListItem key={schedule.id} schedule={schedule} />)
                    }
                />
            )}
        />
    );
};

export { SchedulesList };
