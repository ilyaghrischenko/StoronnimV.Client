import { FC, ReactNode } from "react";
import { Container } from "react-bootstrap";
import { VideoContextProvider } from "../contexts/VideoContext";
import { AddVideoButton } from "../AddsButtons/AddVideoButton";

interface VideoProps {
    children: ReactNode;
}

const Video: FC<VideoProps> = ({ children }) => {
    const token = sessionStorage.getItem("token");

    const isMainPage = window.location.pathname === "/video/sections";

    return (
        <VideoContextProvider>
            <Container className='video-page page'>
                {token && isMainPage && (
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
