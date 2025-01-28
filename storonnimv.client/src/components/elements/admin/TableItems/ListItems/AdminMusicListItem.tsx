import {IAdminMusicItem} from "../../../../../models/admin/IAdminMusicItem.ts";
import {FC, useContext} from "react";
import {Button, Image} from "react-bootstrap";
import {AdminContext} from "../../../../contexts/AdminContext.tsx";

interface IAdminMusicListItemProps {
    item: IAdminMusicItem;
}

const AdminMusicListItem: FC<IAdminMusicListItemProps> = ({item}) => {
    const adminContext = useContext(AdminContext);

    if (!adminContext) {
        throw new Error("AdminContext must be used within a AdminContextProvider");
    }

    const {handleEdit, handleDelete} = adminContext;

    return (
        <tr>
            <td>{item.id}</td>
            <td>
                <Image className='admin-photo' src={item.bgImageUrl} />
            </td>
            <td>{item.platformUrl}</td>
            <td>
                //TODO:!!!!!
                <Button onClick={() => handleEdit('TODO')}>edit</Button>
            </td>
            <td>
                //TODO:!!!!!
                <Button onClick={() => handleDelete('TODO')}>del</Button>
            </td>
        </tr>
    );
};

export {AdminMusicListItem};