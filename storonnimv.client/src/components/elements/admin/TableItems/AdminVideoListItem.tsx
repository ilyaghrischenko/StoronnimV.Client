import {IAdminVideoItem} from "../../../../models/admin/IAdminVideoItem.ts";
import {FC} from "react";

interface IAdminVideoListItemProps {
    item: IAdminVideoItem;
}

const AdminVideoListItem: FC<IAdminVideoListItemProps> = ({item}) => {
    return (
        <tr>
            <td>{item.id}</td>
            <td>{item.title}</td>
            <td>{item.url}</td>
        </tr>
    );
};

export {AdminVideoListItem};