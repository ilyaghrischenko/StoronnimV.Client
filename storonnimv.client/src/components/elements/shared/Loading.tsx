import {FC} from "react";
import {Container} from "react-bootstrap";

import '../../../styles/elements/shared/Loading.css';

const Loading: FC = () => {
    return (
        <Container className="loading-spinner"/>
    );
};

export { Loading };