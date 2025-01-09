import {FC} from "react";
import {GroupContextProvider} from "../contexts/GroupContext";
import {Container} from "react-bootstrap";

const Group: FC = () => {
    return (
        <GroupContextProvider>
            <Container>
                <p>Group</p>
            </Container>
        </GroupContextProvider>
    );
};

export {Group};