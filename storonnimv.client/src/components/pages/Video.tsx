import {FC, ReactNode} from "react";
import {Container} from "react-bootstrap";
import {VideoContextProvider} from "../contexts/VideoContext";

interface VideoProps {
    children: ReactNode;
}

const Video: FC<VideoProps> = ({children}) => {
    return (
        <VideoContextProvider>
            <Container className='video-page page'>
                {children}
            </Container>
        </VideoContextProvider>
    );
};

export {Video};