import {IAdminMusicItem} from "../../../../models/admin/IAdminMusicItem.ts";
import {FC} from "react";
import {AdminMusicListItem} from "./AdminMusicListItem.tsx";

interface IAdminMusicListProps {
    items: IAdminMusicItem[];
}

const AdminMusicList: FC<IAdminMusicListProps> = ({items}) => {
    return (
        items.map((item) => (
            <AdminMusicListItem item={item} />
        ))
    );
};

export {AdminMusicList};