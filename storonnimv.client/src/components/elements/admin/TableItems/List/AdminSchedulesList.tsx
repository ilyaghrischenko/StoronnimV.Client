import { IAdminScheduleItem } from "../../../../../models/admin/IAdminScheduleItem.ts";
import {FC} from "react";
import {AdminScheduleListItem} from "../ListItems/AdminScheduleListItem.tsx";

interface IAdminSchedulesListProps {
    items: IAdminScheduleItem[];
}

const AdminSchedulesList: FC<IAdminSchedulesListProps> = ({items}) => {
    return (
        items.map((item) => (
            <AdminScheduleListItem key={item.id} item={item} />
        ))
    );
};

export {AdminSchedulesList};