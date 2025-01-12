import {FC} from "react";
import {IScheduleListItem} from "../../../models/schedule/IScheduleListItem";
import {Image, ListGroupItem} from "react-bootstrap";

interface ScheduleListItemProps {
    schedule: IScheduleListItem;
}

export const ScheduleListItem: FC<ScheduleListItemProps> = ({schedule}) => {
    return (
        <ListGroupItem className='schedule-list-item'>
            <Image className='item-photo' src={schedule.photo} fluid />
            <p className='item-title'>{schedule.title}</p>
            <p className='item-date'>{schedule.performanceDateTime}</p>
            <p className='item-location'>{schedule.location}</p>
            <p className='item-status'>{schedule.status}</p>
        </ListGroupItem>
    );
};