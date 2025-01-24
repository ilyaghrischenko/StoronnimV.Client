import {IMember} from "../../../../models/group/IGroupInfo.ts";
import {FC} from "react";
import {AdminMemberListItem} from "./AdminMemberListItem.tsx";

interface IAdminMembersListProps {
    items: IMember[];
}

const AdminMembersList: FC<IAdminMembersListProps> = ({items}) => {
    return (
        items.map((item) => (
            <AdminMemberListItem item={item} />
        ))
    );
};

export {AdminMembersList};