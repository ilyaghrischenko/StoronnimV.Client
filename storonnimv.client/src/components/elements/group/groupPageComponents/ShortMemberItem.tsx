import {Image, ListGroupItem} from "react-bootstrap";
import {IMember} from "../../../../models/group/IGroupInfo";
import {FC} from "react";

interface IMemberItemProps {
    member: IMember;
}

const ShortMemberItem: FC<IMemberItemProps> = ({member}) => {
    return (
        <ListGroupItem>
            <Image src = {member.photoUrl} fluid />
            <p>{member.fullName}</p>
            <p>{member.role}</p>
        </ListGroupItem>
    );
};

export {ShortMemberItem};