import {IMember} from "../../../../models/group/IGroupInfo.ts";
import {FC} from "react";

interface IAdminMemberItemProps {
    item: IMember;
}

const AdminMemberListItem: FC<IAdminMemberItemProps> = ({item}) => {
    return (
        <tr>
            <td>{item.id}</td>
            <td>{item.photoUrl}</td>
            <td>{item.fullName}</td>
            <td>{item.role}</td>
        </tr>
    );
};

export {AdminMemberListItem};