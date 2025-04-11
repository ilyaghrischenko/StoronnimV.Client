import {FC, ReactNode, useContext, useEffect} from "react";
import {Container} from "react-bootstrap";
import {VideoContextProvider} from "../contexts/VideoContext";
import {GlobalContext} from "../contexts/shared/GlobalContext.tsx";

interface VideoProps {
    children: ReactNode;
}

const Video: FC<VideoProps> = ({children}) => {
    const globalContext = useContext(GlobalContext);

    if (!globalContext) {
        throw new Error("GlobalContext must be used within a GlobalContextProvider");
    }

    const {fetchIsAdmin} = globalContext;

    useEffect(() => {
        fetchIsAdmin();
    }, []);


    return (
        <VideoContextProvider>
            <Container className='page'>
                {children}
            </Container>
        </VideoContextProvider>
    );
};

export {Video};
