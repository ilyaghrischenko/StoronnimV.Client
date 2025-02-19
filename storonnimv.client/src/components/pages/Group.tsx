import {FC} from "react";
import {GroupContextProvider} from "../contexts/GroupContext";
import {Container} from "react-bootstrap";
import {GroupDescription} from "../elements/group/GroupDescription";
import { AddGroupButton } from "../AddsButtons/AddGroupButton";


const Group: FC = () => {
    return (
        <GroupContextProvider>
            <Container className='group-page page'>
                <GroupDescription/>
            </Container>
            <AddGroupButton buttonLabel="Додати нового учасника" />
            {/* TODO : перенести кнопку над блоком/списком участников */}
        </GroupContextProvider>
    );
};

export {Group};