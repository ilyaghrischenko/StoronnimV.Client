import {IMember} from "../../../../../models/group/IGroupInfo.ts";
import {FC} from "react";
import {AdminMemberListItem} from "../ListItems/AdminMemberListItem.tsx";

interface IAdminMembersListProps {
    items: IMember[];
}

const AdminMembersList: FC<IAdminMembersListProps> = ({items}) => {
    return (
        items.map((item) => (
            <AdminMemberListItem key={item.id} item={item} />
        ))
    );
};

export {AdminMembersList};