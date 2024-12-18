import {Container} from "react-bootstrap";

const Member = ({member}) => {
    return (
        <Container>
            <p>Full name: {member.fullName}</p>
            <p>Role: {member.role}</p>
            <br/>
        </Container>
    );
};

export {Member};