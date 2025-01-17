import {IMember} from "../../../../models/group/IGroupInfo";
import {FC, useContext} from "react";
import {ShortMemberItem} from "./ShortMemberItem";
import "../../../../styles/elements/group/GroupMembers.css";
import {List} from "../../shared/GenericList/List";
import {ListItem} from "../../shared/GenericList/ListItem";
import {GlobalContext} from "../../../contexts/shared/GlobalContext";

interface IShortMembersProps {
    members: IMember[];
}

const ShortMembers:FC<IShortMembersProps> = ({members}) => {
    const context = useContext(GlobalContext);

    if (!context) {
        throw new Error("GlobalContext must be used within a GlobalContextProvider");
    }

    const { OnShowModal } = context;

    return (
        <List className="members-list"
            items={members}
            renderItem={(member: IMember) => (
                <ListItem className="member-item"
                    onClick={() => OnShowModal(<ShortMemberItem key={member.id} member={member}/>, member.fullName)}
                    item={member}
                    renderItem={(member: IMember) => <ShortMemberItem key={member.id} member={member}/>}
                />
            )}
        />
    );
};

export {ShortMembers};