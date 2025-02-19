import {FC, ReactNode} from "react";
import {Container} from "react-bootstrap";
import {VideoContextProvider} from "../contexts/VideoContext";
import {AddVideoButton} from "../buttons/AddVideoButton"

interface VideoProps {
    children: ReactNode;
}

const Video: FC<VideoProps> = ({children}) => {

    const token = sessionStorage.getItem("token");

    return (
        <VideoContextProvider>
            <Container className='video-page page'>
            {token && <AddVideoButton
                        apiUrl="/api/video"
                        modalTitle="Відео"
                        buttonLabel="Додати відео"
                    />}
                {children}
            </Container>
        </VideoContextProvider>
    );
};

export {Video};