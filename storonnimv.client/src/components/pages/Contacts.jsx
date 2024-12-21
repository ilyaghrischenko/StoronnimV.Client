import {useContext} from "react";
import {Container} from "react-bootstrap";

import {GlobalContext} from "../contexts/Shared/GlobalContext";
import {ContactsContextProvider} from "../contexts/ContactsContext";

const Contacts = () => {
    const {setBgImage, setHeaderTitle} = useContext(GlobalContext);
    setBgImage('photo.jpg');
    setHeaderTitle('Контакти');
    
    return (
        <ContactsContextProvider>
            <Container>
                <h1>CONTACTS</h1>
            </Container>
        </ContactsContextProvider>
    );
};

export {Contacts};