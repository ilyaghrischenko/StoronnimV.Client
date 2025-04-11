import {Container} from "react-bootstrap";
import {IMemberShort} from "../../../../models/group/IGroupInfo";
import {FC} from "react";

interface IMemberItemProps {
    member: IMemberShort;
    onClick?: () => void;
}

const ShortMemberItem: FC<IMemberItemProps> = ({member, onClick}) => {
    return (
        <div className="short-member-item-container" onClick={onClick}>
            <Container
                className='photo-container'
                style={{
                    backgroundImage: `url(${member.photoUrl})`
                }}
            >
                <p className='photo-container__full-name main-text'>{member.fullName}</p>
                <p className='photo-container__role secondary-text'>{member.role}</p>
            </Container>
        </div>
    );
};

export {ShortMemberItem};