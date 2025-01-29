import {IAdminMusicItem} from "../../../../../models/admin/IAdminMusicItem.ts";
import {FC} from "react";
import {AdminMusicListItem} from "../ListItems/AdminMusicListItem.tsx";

interface IAdminMusicListProps {
    items: IAdminMusicItem[];
}

const AdminMusicList: FC<IAdminMusicListProps> = ({items}) => {
    return (
        items.map((item) => (
            <AdminMusicListItem key={item.id} item={item} />
        ))
    );
};

export {AdminMusicList};