import {FC, useContext, useEffect} from "react";
import {GroupContextProvider} from "../contexts/GroupContext";
import {Container} from "react-bootstrap";
import {GroupDescription} from "../elements/group/GroupDescription";
import {GlobalContext} from "../contexts/shared/GlobalContext.tsx";


const Group: FC = () => {
    const globalContext = useContext(GlobalContext);

    if (!globalContext) {
        throw new Error("GlobalContext must be used within a GlobalContextProvider");
    }

    const {fetchIsAdmin} = globalContext;

    useEffect(() => {
        fetchIsAdmin();
    }, []);

    return (
        <GroupContextProvider>
            <div className='page-wrapper'>
                <Container className='group-page page'>
                    <GroupDescription/>
                </Container>
            </div>
        </GroupContextProvider>
    );
};

export {Group};