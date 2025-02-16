import {IMemberShort} from "../../../../../models/group/IGroupInfo.ts";
import {FC, useContext} from "react";
import {Button, Image} from "react-bootstrap";
import {AdminContext} from "../../../../contexts/AdminContext.tsx";
import {FaEdit, FaTrashAlt} from "react-icons/fa";

interface IAdminMemberItemProps {
    item: IMemberShort;
}

const AdminMemberListItem: FC<IAdminMemberItemProps> = ({item}) => {
    const adminContext = useContext(AdminContext);

    if (!adminContext) {
        throw new Error("AdminContext must be used within a AdminContextProvider");
    }

    const {handleEdit, handleDelete} = adminContext;

    return (
        <tr>
            <td>{item.id}</td>
            <td>
                <Image className='admin-photo' src={item.photoUrl} />
            </td>
            <td>{item.fullName}</td>
            <td>{item.role}</td>
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

export {AdminMemberListItem};