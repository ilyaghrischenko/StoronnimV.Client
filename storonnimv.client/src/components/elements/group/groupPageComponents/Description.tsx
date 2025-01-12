import {FC} from "react";
import {Image, Container} from "react-bootstrap";
import {IGroupInfo} from "../../../../models/group/IGroupInfo";
import "../../../../styles/elements/group/Description.css";

interface IDescriptionProps {
    groupInfo: IGroupInfo;
}

const Description: FC<IDescriptionProps> = ({groupInfo}) => {

    return (
        <Container className='container-with-border'>
            <Image className='group-photo' src = {groupInfo.photoUrl} fluid />
            <p className='group-description'>{groupInfo.description}</p>
        </Container>
    );
}

export {Description};