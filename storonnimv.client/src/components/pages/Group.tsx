import {FC} from "react";
import {GroupContextProvider} from "../contexts/GroupContext";
import {Container} from "react-bootstrap";
import {GroupDescription} from "../elements/group/GroupDescription";


const Group: FC = () => {
    return (
        <GroupContextProvider>
            <Container className='group-page page'>
                <GroupDescription/>
            </Container>
        </GroupContextProvider>
    );
};

export {Group};