import {FC, ReactNode, useContext, useEffect} from "react";
import {Container} from "react-bootstrap";
import {VideoContextProvider} from "../contexts/VideoContext";
import {AddVideoButton} from "../elements/admin/AddsButtons/AddVideoButton";
import {GlobalContext} from "../contexts/shared/GlobalContext.tsx";

interface VideoProps {
    children: ReactNode;
}

const Video: FC<VideoProps> = ({children}) => {
    const globalContext = useContext(GlobalContext);

    if (!globalContext) {
        throw new Error("GlobalContext must be used within a GlobalContextProvider");
    }

    const {fetchIsAdmin, isAdmin} = globalContext;

    useEffect(() => {
        fetchIsAdmin();
    }, []);

    const isMainPage = window.location.pathname === "/video/sections";

    return (
        <VideoContextProvider>
            <div className='page-wrapper'>
                <Container className='video-page page'>
                    {isAdmin && isMainPage && (
                        <AddVideoButton
                            apiUrl="https://localhost:44315/api/admin/videos"
                            modalTitle="Відео"
                            buttonLabel="Додати відео"
                        />
                    )}
                    {children}
                </Container>
            </div>
        </VideoContextProvider>
    );
};

export {Video};
