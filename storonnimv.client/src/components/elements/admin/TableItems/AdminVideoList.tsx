import {IAdminVideoItem} from "../../../../models/admin/IAdminVideoItem.ts";
import {FC} from "react";
import {AdminVideoListItem} from "./AdminVideoListItem.tsx";

interface AdminVideoListPropI {
    items: IAdminVideoItem[];
}

const AdminVideoList: FC<AdminVideoListPropI> = ({items}) => {
    return (
        items.map((item) => (
            <AdminVideoListItem item={item} />
        ))
    );
};

export {AdminVideoList};