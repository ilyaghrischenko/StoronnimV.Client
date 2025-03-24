import {FC, ReactNode, useContext} from "react";
import { Container } from "react-bootstrap";
import { VideoContextProvider } from "../contexts/VideoContext";
import { AddVideoButton } from "../elements/admin/AddsButtons/AddVideoButton";
import {AdminContext} from "../contexts/AdminContext.tsx";

interface VideoProps {
    children: ReactNode;
}

const Video: FC<VideoProps> = ({ children }) => {
    const adminContext = useContext(AdminContext);

    if (!adminContext) {
        throw new Error("AdminContext must be used within a AdminContextProvider");
    }

    const { isAdmin } = adminContext;

    const isMainPage = window.location.pathname === "/video/sections";

    return (
        <VideoContextProvider>
            <Container className='video-page page'>
                {isAdmin && isMainPage && (
                    <AddVideoButton
                        apiUrl="/api/video"
                        modalTitle="Відео"
                        buttonLabel="Додати відео"
                    />
                )}
                {children}
            </Container>
        </VideoContextProvider>
    );
};

export { Video };
