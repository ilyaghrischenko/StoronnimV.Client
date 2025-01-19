import {FC} from "react";
import {Container} from "react-bootstrap";

const Loading: FC = () => {
    return (
        <Container className='loading-container'>
            <Container className="loading-container__spinner"/>
        </Container>
    );
};

export { Loading };