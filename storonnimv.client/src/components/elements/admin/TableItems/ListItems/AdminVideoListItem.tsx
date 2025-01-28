import {IAdminVideoItem} from "../../../../../models/admin/IAdminVideoItem.ts";
import {FC, useContext} from "react";
import {Button} from "react-bootstrap";
import {AdminContext} from "../../../../contexts/AdminContext.tsx";

interface IAdminVideoListItemProps {
    item: IAdminVideoItem;
}

const AdminVideoListItem: FC<IAdminVideoListItemProps> = ({item}) => {
    const adminContext = useContext(AdminContext);

    if (!adminContext) {
        throw new Error('AdminContext must be used within a AdminContextProvider');
    }

    const {handleDelete, handleEdit} = adminContext;

    return (
        <tr>
            <td>{item.id}</td>
            <td>{item.title}</td>
            <td>
                <video
                    className='admin-video'
                    controls
                    preload="auto"
                >
                    <source src={item.url} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </td>
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

export {AdminVideoListItem};