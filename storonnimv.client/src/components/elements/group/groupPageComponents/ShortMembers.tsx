import {ListGroup} from "react-bootstrap";
import {IMember} from "../../../../models/group/IGroupInfo";
import {FC} from "react";
import {ShortMemberItem} from "./ShortMemberItem";
import "../../../../styles/elements/group/GroupMembers.css";

interface IShortMembersProps {
    members: IMember[];
}

const ShortMembers:FC<IShortMembersProps> = ({members}) => {
    return (
        <ListGroup className='members-list'>
            {members.map((member) => (
                <ShortMemberItem member={member} key={member.id} />
            ))}
        </ListGroup>
    );
};

export {ShortMembers};