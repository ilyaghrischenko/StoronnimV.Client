import {FC} from "react";
import {Container} from "react-bootstrap";
import {VideoContextProvider} from "../contexts/VideoContext";


const Video: FC = () => {
    return (
        <VideoContextProvider>
            <Container>
                Video
            </Container>
        </VideoContextProvider>
    );
};

export {Video};