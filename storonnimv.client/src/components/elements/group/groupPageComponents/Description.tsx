import {FC} from "react";
import {Image, Container} from "react-bootstrap";
import {IGroupInfo} from "../../../../models/group/IGroupInfo";
import "../../../../styles/elements/group/Description.css";

interface IDescriptionProps {
    groupInfo: IGroupInfo;
}

const Description: FC<IDescriptionProps> = ({groupInfo}) => {

    return (
        <Container className='description-container'>
            <Image className='description-container__photo' src = {groupInfo.photoUrl} fluid />
            <p className='description-container__description'>{groupInfo.description}</p>
        </Container>
    );
}

export {Description};