import { IAdminScheduleItem } from "../../../../models/admin/IAdminScheduleItem";
import {FC} from "react";
import {AdminScheduleListItem} from "./AdminScheduleListItem.tsx";

interface IAdminSchedulesListProps {
    items: IAdminScheduleItem[];
}

const AdminSchedulesList: FC<IAdminSchedulesListProps> = ({items}) => {
    return (
        items.map((item) => (
            <AdminScheduleListItem item={item} />
        ))
    );
};

export {AdminSchedulesList};