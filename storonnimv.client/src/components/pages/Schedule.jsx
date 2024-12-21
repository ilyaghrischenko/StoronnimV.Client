import React, {useContext} from "react";
import {Container} from "react-bootstrap";

import {GlobalContext} from "../contexts/Shared/GlobalContext";
import {ScheduleContextProvider} from "../contexts/ScheduleContext";

const Schedule = () => {
    const {setBgImage, setHeaderTitle} = useContext(GlobalContext);
    setBgImage('photo.jpg');
    setHeaderTitle('Афіша');
    
    return (
        <ScheduleContextProvider>
            <Container>
                <h1>SCHEDULE</h1>
            </Container>
        </ScheduleContextProvider>
    );
}

export { Schedule };