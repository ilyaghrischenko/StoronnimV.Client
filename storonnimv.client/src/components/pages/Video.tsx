import {FC} from "react";
import {Container} from "react-bootstrap";
import {VideoContextProvider} from "../contexts/VideoContext";

interface VideoProps {
    children: React.ReactNode;
}

const Video: FC<VideoProps> = ({children}) => {
    return (
        <VideoContextProvider>
            <Container>
                {children}
            </Container>
        </VideoContextProvider>
    );
};

export {Video};