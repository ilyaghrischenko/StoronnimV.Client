import {FC, useContext, useEffect} from "react";
import {GroupContext} from "../../../contexts/GroupContext";
import {Image, Container} from "react-bootstrap";
import {IGroupInfo} from "../../../../models/group/IGroupInfo";

interface IDescriptionProps {
    groupInfo: IGroupInfo;
}

const Description: FC<IDescriptionProps> = ({groupInfo}) => {

    return (
        <Container>
            <Image src = {groupInfo.photoUrl} fluid />
            <p>{groupInfo.description}</p>
        </Container>
    );
}

export {Description};