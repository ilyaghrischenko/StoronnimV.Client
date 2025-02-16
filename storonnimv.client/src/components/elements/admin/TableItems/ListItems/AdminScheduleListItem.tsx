import {IAdminScheduleItem} from "../../../../../models/admin/IAdminScheduleItem.ts";
import {FC, useContext} from "react";
import {Button, Image} from "react-bootstrap";
import {AdminContext} from "../../../../contexts/AdminContext.tsx";
import {FaEdit, FaTrashAlt} from "react-icons/fa";

interface IAdminScheduleListItemProps {
    item: IAdminScheduleItem;
}

const AdminScheduleListItem: FC<IAdminScheduleListItemProps> = ({item}) => {
    const adminContext = useContext(AdminContext);

    if (!adminContext) {
        throw new Error('AdminContext must be used within a AdminContextProvider');
    }

    const {handleEdit, handleDelete} = adminContext;

    return (
        <tr>
            <td>{item.id}</td>
            <td>
                <Image className='admin-photo' src={item.photo} />
            </td>
            <td>{item.title}</td>
            <td>{item.performanceDateTime}</td>
            <td>{item.location}</td>
            <td>{item.status}</td>
            <td>
                //TODO:!!!!!
                <Button onClick={() => handleEdit('TODO')}><FaEdit/></Button>
            </td>
            <td>
                //TODO:!!!!!
                <Button onClick={() => handleDelete('TODO')}><FaTrashAlt/></Button>
            </td>
        </tr>
    );
};

export {AdminScheduleListItem};