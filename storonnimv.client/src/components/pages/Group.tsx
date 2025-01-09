import {FC, useContext} from "react";
import {GlobalContext} from "../contexts/shared/GlobalContext";
import {GroupContextProvider} from "../contexts/GroupContext";
import {Container} from "react-bootstrap";

const Group: FC = () => {
    const globalContext = useContext(GlobalContext);

    if (!globalContext) {
        throw new Error("GlobalContext must be used within a GlobalContextProvider");
    }

    const {setBgImage, setHeaderTitle} = globalContext;

    return (
        <GroupContextProvider>
            <Container>
                <p>Group</p>
            </Container>
        </GroupContextProvider>
    );
};

export {Group};