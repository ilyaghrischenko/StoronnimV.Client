import {FC} from "react";
import {IScheduleListItem} from "../../../models/schedule/IScheduleListItem";
import {Image} from "react-bootstrap";

interface ScheduleListItemProps {
    schedule: IScheduleListItem;
}

export const ScheduleListItem: FC<ScheduleListItemProps> = ({schedule}) => {
    return (
        <div className='schedule-list-item'>
            <Image className='schedule-list-item__photo' src={schedule.photo} fluid />
            <p className='schedule-list-item__title'>{schedule.title}</p>
            <p className='schedule-list-item__date'>{schedule.performanceDateTime}</p>
            <p className='schedule-list-item__location'>{schedule.location}</p>
            <p className='schedule-list-item__status'>{schedule.status}</p>
        </div>
    );
};