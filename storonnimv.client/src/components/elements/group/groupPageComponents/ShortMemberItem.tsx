import {Image, ListGroupItem} from "react-bootstrap";
import {IMember} from "../../../../models/group/IGroupInfo";
import {FC} from "react";
import "../../../../styles/elements/group/GroupMembers.css";

interface IMemberItemProps {
    member: IMember;
}

const ShortMemberItem: FC<IMemberItemProps> = ({member}) => {
    return (
        <ListGroupItem className="member-item">
            <Image className="member-short-photo" src = {member.photoUrl} fluid />
            <p>{member.fullName}</p>
            <p>{member.role}</p>
        </ListGroupItem>
    );
};

export {ShortMemberItem};