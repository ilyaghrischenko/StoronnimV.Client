import {FC} from "react";
import {Container} from "react-bootstrap";

const Error: FC = () => {
    return (
        <Container className='error-container'>
            <Container className='error-info-container'>
                <p className='error-info-container__status-code'>404:</p>
                <p className='error-info-container__message'>Not Found</p>
            </Container>
        </Container>
    );
};

export {Error};