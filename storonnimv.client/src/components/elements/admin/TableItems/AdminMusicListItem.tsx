import {IAdminMusicItem} from "../../../../models/admin/IAdminMusicItem.ts";
import {FC} from "react";

interface IAdminMusicListItemProps {
    item: IAdminMusicItem;
}

const AdminMusicListItem: FC<IAdminMusicListItemProps> = ({item}) => {
    return (
        <tr>
            <td>{item.id}</td>
            <td>{item.bgImageUrl}</td>
            <td>{item.platformUrl}</td>
        </tr>
    );
};

export {AdminMusicListItem};