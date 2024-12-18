import {useContext} from "react";
import {Container} from "react-bootstrap";

import {GlobalContext} from "../contexts/Shared/GlobalContext";
import {GroupContextProvider} from "../contexts/GroupContext";
import {MembersList} from "../elements/Group/MembersList";
import {About} from "../elements/Group/About";

const Group = () => {
    const {setBgImage} = useContext(GlobalContext);
    setBgImage('photo.jpg');
    
    return (
        <GroupContextProvider>
            <Container>
                <About />
                <MembersList />
            </Container>
        </GroupContextProvider>
    );
};

export { Group };