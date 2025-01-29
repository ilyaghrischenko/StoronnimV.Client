import {IAdminVideoItem} from "../../../../../models/admin/IAdminVideoItem.ts";
import {FC} from "react";
import {AdminVideoListItem} from "../ListItems/AdminVideoListItem.tsx";

interface AdminVideoListPropI {
    items: IAdminVideoItem[];
}

const AdminVideoList: FC<AdminVideoListPropI> = ({items}) => {
    return (
        items.map((item) => (
            <AdminVideoListItem key={item.id} item={item} />
        ))
    );
};

export {AdminVideoList};