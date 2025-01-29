import {IAdminNewsItem} from "../../../../../models/admin/IAdminNewsItem.ts";
import {FC} from "react";
import {AdminNewsListItem} from "../ListItems/AdminNewsListItem.tsx";

interface IAdminNewsListProps {
    items: IAdminNewsItem[];
}

const AdminNewsList: FC<IAdminNewsListProps> = ({items}) => {
    return (
        items.map((item) =>
            <AdminNewsListItem key={item.id} item={item} />
        )
    );
};

export {AdminNewsList}