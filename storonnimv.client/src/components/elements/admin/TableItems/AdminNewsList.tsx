import {IAdminNewsItem} from "../../../../models/admin/IAdminNewsItem.ts";
import {FC} from "react";
import {AdminNewsListItem} from "./AdminNewsListItem.tsx";

interface IAdminNewsListProps {
    items: IAdminNewsItem[];
}

const AdminNewsList: FC<IAdminNewsListProps> = ({items}) => {
    return (
        items.map((item) =>
            <AdminNewsListItem item={item} />
        )
    );
};

export {AdminNewsList}