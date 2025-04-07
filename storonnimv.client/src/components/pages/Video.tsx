import {FC, ReactNode, useContext, useEffect} from "react";
import {Button, Container} from "react-bootstrap";
import {VideoContextProvider} from "../contexts/VideoContext";
import {GlobalContext} from "../contexts/shared/GlobalContext.tsx";
import {FaPlus} from "react-icons/fa";
import {AddVideoModalContent} from "../elements/video/forms/AddVideoModalContent.tsx";

interface VideoProps {
    children: ReactNode;
}

const Video: FC<VideoProps> = ({children}) => {
    const globalContext = useContext(GlobalContext);

    if (!globalContext) {
        throw new Error("GlobalContext must be used within a GlobalContextProvider");
    }

    const {fetchIsAdmin, isAdmin, OnShowModal} = globalContext;

    useEffect(() => {
        fetchIsAdmin();
    }, []);

    const isMainPage = window.location.pathname === "/video/sections";

    return (
        <VideoContextProvider>
            <div className='page-wrapper'>
                <Container className='video-page page'>
                    {isAdmin && isMainPage && (
                        <Button onClick={() => OnShowModal(<AddVideoModalContent/>)}>
                            <FaPlus/>
                        </Button>
                    )}
                    {children}
                </Container>
            </div>
        </VideoContextProvider>
    );
};

export {Video};
