import {IAdminScheduleItem} from "../../../../models/admin/IAdminScheduleItem.ts";
import {FC} from "react";

interface IAdminScheduleListItemProps {
    item: IAdminScheduleItem;
}

const AdminScheduleListItem: FC<IAdminScheduleListItemProps> = ({item}) => {
    return (
        <tr>
            <td>{item.id}</td>
            <td>{item.photo}</td>
            <td>{item.title}</td>
            <td>{item.performanceDateTime}</td>
            <td>{item.location}</td>
            <td>{item.status}</td>
        </tr>
    );
};

export {AdminScheduleListItem};