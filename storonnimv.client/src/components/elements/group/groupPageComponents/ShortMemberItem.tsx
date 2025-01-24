import {Container, Image} from "react-bootstrap";
import {IMemberShort} from "../../../../models/group/IGroupInfo";
import {FC} from "react";

interface IMemberItemProps {
    member: IMemberShort;
}

const ShortMemberItem: FC<IMemberItemProps> = ({member}) => {
    return (
        <Container className='short-member-item-container'>
            <Image className="short-member-item-container__photo" src = {member.photoUrl} fluid />
            <p className='short-member-item-container__full-name'>{member.fullName}</p>
            <p className='short-member-item-container__role'>{member.role}</p>
        </Container>
    );
};

export {ShortMemberItem};